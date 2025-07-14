import os
import json
import requests
import pandas as pd
import pdfplumber
from bs4 import BeautifulSoup
import psycopg2
from psycopg2.extras import execute_values

DATA_DIR = "data_files"
os.makedirs(DATA_DIR, exist_ok=True)

SOURCES_FILE = os.path.join(os.path.dirname(__file__), "mmf_sources.json")

# Database config from environment variables
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "kenya_mmf")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASS = os.getenv("DB_PASS", "postgres")

def get_db_conn():
    return psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASS
    )

def upsert_funds_and_rates(funds, rates):
    import requests as pyrequests
    conn = get_db_conn()
    cur = conn.cursor()
    # Ensure fund table exists
    cur.execute("""
        CREATE TABLE IF NOT EXISTS fund (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            manager TEXT NOT NULL,
            UNIQUE(name, manager)
        );
    """)
    # Ensure fund_performance table exists
    cur.execute("""
        CREATE TABLE IF NOT EXISTS fund_performance (
            id SERIAL PRIMARY KEY,
            date DATE NOT NULL,
            nav NUMERIC,
            yield NUMERIC,
            fundId INTEGER REFERENCES fund(id),
            UNIQUE(fundId, date)
        );
    """)
    # Upsert funds
    fund_tuples = [(f['name'], f.get('manager', '')) for f in funds]
    cur.executemany(
        """
        INSERT INTO fund (name, manager)
        VALUES (%s, %s)
        ON CONFLICT (name, manager) DO NOTHING
        """, fund_tuples)
    # Get fund IDs
    cur.execute("SELECT id, name, manager FROM fund;")
    fund_id_map = {(row[1], row[2]): row[0] for row in cur.fetchall()}
    # Upsert performances
    perf_tuples = []
    for r in rates:
        fund_key = (r['fund'], r.get('manager', ''))
        fund_id = fund_id_map.get(fund_key)
        if fund_id:
            perf_tuples.append((r['date'], r.get('nav'), r.get('yield'), fund_id))
    if perf_tuples:
        cur.executemany(
            """
            INSERT INTO fund_performance (date, nav, yield, fundId)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (fundId, date) DO UPDATE SET nav = EXCLUDED.nav, yield = EXCLUDED.yield
            """, perf_tuples)
    conn.commit()
    cur.close()
    conn.close()
    print(f"Upserted {len(funds)} funds and {len(perf_tuples)} performances.")
    # API fallback/sync
    API_BASE = os.getenv("API_BASE", "http://localhost:4000/api")
    headers = {"Content-Type": "application/json"}
    for f in funds:
        try:
            resp = pyrequests.post(f"{API_BASE}/funds", json={"name": f['name'], "manager": f.get('manager', '')}, headers=headers, timeout=5)
            if resp.status_code not in (200, 201, 409):
                print(f"API fund insert failed: {resp.text}")
        except Exception as e:
            print(f"API fund insert error: {e}")
    # Refresh fund_id_map from API
    try:
        resp = pyrequests.get(f"{API_BASE}/funds", timeout=5)
        if resp.status_code == 200:
            api_funds = resp.json()
            api_fund_id_map = {(f['name'], f['manager']): f['id'] for f in api_funds}
        else:
            api_fund_id_map = fund_id_map
    except Exception:
        api_fund_id_map = fund_id_map
    for r in rates:
        fund_key = (r['fund'], r.get('manager', ''))
        fund_id = api_fund_id_map.get(fund_key)
        if fund_id:
            try:
                resp = pyrequests.post(f"{API_BASE}/fund-performances", json={
                    "date": r['date'],
                    "nav": r.get('nav'),
                    "yield": r.get('yield'),
                    "fundId": fund_id
                }, headers=headers, timeout=5)
                if resp.status_code not in (200, 201, 409):
                    print(f"API performance insert failed: {resp.text}")
            except Exception as e:
                print(f"API performance insert error: {e}")

def download_file(url, dest):
    try:
        r = requests.get(url, timeout=15)
        r.raise_for_status()
    except requests.exceptions.Timeout:
        print(f"Timeout occurred for {url}. Skipping download.")
        return False
    except requests.exceptions.RequestException as e:
        print(f"Error downloading {url}: {e}. Skipping download.")
        return False
    with open(dest, 'wb') as f:
        f.write(r.content)
    print(f"Downloaded: {dest}")
    return True

def parse_excel(file_path):
    df = pd.read_excel(file_path)
    print(f"Parsed Excel: {file_path}")
    # TODO: Implement actual parsing logic for MMF data
    return df.to_dict(orient='records')

def parse_pdf(file_path):
    data = []
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            tables = page.extract_tables()
            for table in tables:
                data.extend(table)
    print(f"Parsed PDF: {file_path}")
    # TODO: Implement actual parsing logic for MMF data
    return data

def parse_cma_excel(file_path, source_url):
    df = pd.read_excel(file_path, engine='openpyxl')
    # Try to find relevant columns (case-insensitive, flexible)
    col_map = {c.lower(): c for c in df.columns}
    name_col = col_map.get('fund name') or col_map.get('fund')
    manager_col = col_map.get('manager')
    nav_col = col_map.get('nav') or col_map.get('net asset value')
    yield_col = col_map.get('yield') or col_map.get('rate')
    date_col = col_map.get('date') or col_map.get('as at')
    funds = []
    rates = []
    for _, row in df.iterrows():
        fund_name = str(row.get(name_col, '')).strip()
        manager = str(row.get(manager_col, '')).strip() if manager_col else ''
        nav = row.get(nav_col)
        yld = row.get(yield_col)
        date = row.get(date_col)
        if fund_name:
            funds.append({"name": fund_name, "manager": manager, "source": source_url})
            if date:
                rates.append({
                    "fund": fund_name,
                    "manager": manager,
                    "date": str(date)[:10],
                    "nav": nav,
                    "yield": yld,
                    "source": source_url
                })
    return funds, rates

def parse_cbk_excel(file_path, source_url):
    df = pd.read_excel(file_path, engine='openpyxl')
    # Try to find relevant columns (case-insensitive, flexible)
    col_map = {c.lower(): c for c in df.columns}
    name_col = col_map.get('fund name') or col_map.get('fund')
    manager_col = col_map.get('manager')
    nav_col = col_map.get('nav') or col_map.get('net asset value')
    yield_col = col_map.get('yield') or col_map.get('rate')
    date_col = col_map.get('date') or col_map.get('as at')
    funds = []
    rates = []
    for _, row in df.iterrows():
        fund_name = str(row.get(name_col, '')).strip()
        manager = str(row.get(manager_col, '')).strip() if manager_col else ''
        nav = row.get(nav_col)
        yld = row.get(yield_col)
        date = row.get(date_col)
        if fund_name:
            funds.append({"name": fund_name, "manager": manager, "source": source_url})
            if date:
                rates.append({
                    "fund": fund_name,
                    "manager": manager,
                    "date": str(date)[:10],
                    "nav": nav,
                    "yield": yld,
                    "source": source_url
                })
    return funds, rates

def scrape_fund_manager(url):
    try:
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
    except requests.exceptions.Timeout:
        print(f"Timeout occurred for {url}. Skipping.")
        return [], []
    except requests.exceptions.RequestException as e:
        print(f"Error fetching {url}: {e}. Skipping.")
        return [], []
    soup = BeautifulSoup(resp.text, 'lxml')
    funds = []
    rates = []
    import datetime
    today = datetime.date.today().isoformat()
    
    # Sanlam
    if "sanlam.co.ke" in url:
        fund_name = "Sanlam Money Market Fund"
        manager = "Sanlam Investments East Africa Ltd"
        yield_val = None
        
        # Look for yield in various formats
        for tag in soup.find_all(string=True):
            text = str(tag).strip()
            # Look for patterns like "10.23%" or "10.23% p.a" or "Effective Annual Yield"
            if "%" in text and any(char.isdigit() for char in text):
                # Extract percentage values
                import re
                percentages = re.findall(r'(\d+\.?\d*)%', text)
                if percentages:
                    # Take the first percentage found (usually the most relevant)
                    yield_val = float(percentages[0])
                    break
        
        # If not found, look for specific yield mentions
        if not yield_val:
            for tag in soup.find_all(string=True):
                text = str(tag).strip()
                if "effective annual yield" in text.lower() or "daily yield" in text.lower():
                    import re
                    percentages = re.findall(r'(\d+\.?\d*)%', text)
                    if percentages:
                        yield_val = float(percentages[0])
                        break
        
        funds.append({"name": fund_name, "manager": manager, "source": url})
        rates.append({
            "fund": fund_name,
            "manager": manager,
            "date": today,
            "nav": None,
            "yield": yield_val,
            "source": url
        })
        print(f"  Extracted yield for {fund_name}: {yield_val}%")
    
    # ICEA Lion
    elif "icealion.com" in url:
        fund_name = "ICEA Lion Money Market Fund"
        manager = "ICEA Lion Asset Management Ltd"
        yield_val = None
        
        # Look for yield in various formats
        for tag in soup.find_all(string=True):
            text = str(tag).strip()
            if "%" in text and any(char.isdigit() for char in text):
                import re
                percentages = re.findall(r'(\d+\.?\d*)%', text)
                if percentages:
                    yield_val = float(percentages[0])
                    break
        
        # Look for specific yield mentions
        if not yield_val:
            for tag in soup.find_all(string=True):
                text = str(tag).strip()
                if "yield" in text.lower() or "return" in text.lower():
                    import re
                    percentages = re.findall(r'(\d+\.?\d*)%', text)
                    if percentages:
                        yield_val = float(percentages[0])
                        break
        
        funds.append({"name": fund_name, "manager": manager, "source": url})
        rates.append({
            "fund": fund_name,
            "manager": manager,
            "date": today,
            "nav": None,
            "yield": yield_val,
            "source": url
        })
        print(f"  Extracted yield for {fund_name}: {yield_val}%")
    
    # Madison
    elif "madison.co.ke" in url:
        fund_name = "Madison Money Market Fund"
        manager = "Madison Asset Management Services Ltd"
        yield_val = None
        
        # Look for yield in various formats
        for tag in soup.find_all(string=True):
            text = str(tag).strip()
            if "%" in text and any(char.isdigit() for char in text):
                import re
                percentages = re.findall(r'(\d+\.?\d*)%', text)
                if percentages:
                    yield_val = float(percentages[0])
                    break
        
        # Look for specific yield mentions
        if not yield_val:
            for tag in soup.find_all(string=True):
                text = str(tag).strip()
                if "yield" in text.lower() or "return" in text.lower():
                    import re
                    percentages = re.findall(r'(\d+\.?\d*)%', text)
                    if percentages:
                        yield_val = float(percentages[0])
                        break
        
        funds.append({"name": fund_name, "manager": manager, "source": url})
        rates.append({
            "fund": fund_name,
            "manager": manager,
            "date": today,
            "nav": None,
            "yield": yield_val,
            "source": url
        })
        print(f"  Extracted yield for {fund_name}: {yield_val}%")
    
    # African Alliance
    elif "africanalliance.com" in url:
        print("Stub: implement scraping for African Alliance Kenya Unit Trust Scheme")
    # Britam
    elif "britam.com" in url:
        fund_name = "British-American Unit Trust Scheme"
        manager = "Britam Asset Managers (Kenya) Limited"
        yield_val = None
        for tag in soup.find_all(string=True):
            text = str(tag).strip()
            if "%" in text and any(char.isdigit() for char in text):
                import re
                percentages = re.findall(r'(\d+\.?\d*)%', text)
                if percentages:
                    yield_val = float(percentages[0])
                    break
        funds.append({"name": fund_name, "manager": manager, "source": url})
        rates.append({
            "fund": fund_name,
            "manager": manager,
            "date": today,
            "nav": None,
            "yield": yield_val,
            "source": url
        })
        print(f"  Extracted yield for {fund_name}: {yield_val}%")
    # Dyer and Blair
    elif "dyerandblair.com" in url:
        fund_name = "Dyer and Blair Unit Trust Scheme"
        manager = "Dyer and Blair Investment Bank Limited"
        yield_val = None
        for tag in soup.find_all(string=True):
            text = str(tag).strip()
            if "%" in text and any(char.isdigit() for char in text):
                import re
                percentages = re.findall(r'(\d+\.?\d*)%', text)
                if percentages:
                    yield_val = float(percentages[0])
                    break
        funds.append({"name": fund_name, "manager": manager, "source": url})
        rates.append({
            "fund": fund_name,
            "manager": manager,
            "date": today,
            "nav": None,
            "yield": yield_val,
            "source": url
        })
        print(f"  Extracted yield for {fund_name}: {yield_val}%")
    # ICEA Lion PDF
    elif "icealion.co.ke/wp-content/uploads/2021/04/ICEA-LION-UNIT-TRUST-FUND.pdf" in url:
        import pdfplumber
        fund_name = "ICEA LION Collective Investment Scheme"
        manager = "ICEA Lion Asset Management Ltd"
        yield_val = None
        try:
            pdf_path = os.path.join(DATA_DIR, "icea_lion_unit_trust_fund.pdf")
            if not os.path.exists(pdf_path):
                download_file(url, pdf_path)
            with pdfplumber.open(pdf_path) as pdf:
                for page in pdf.pages:
                    text = page.extract_text()
                    if text:
                        import re
                        percentages = re.findall(r'(\d+\.?\d*)%', text)
                        if percentages:
                            yield_val = float(percentages[0])
                            break
        except Exception as e:
            print(f"Error parsing ICEA Lion PDF: {e}")
        funds.append({"name": fund_name, "manager": manager, "source": url})
        rates.append({
            "fund": fund_name,
            "manager": manager,
            "date": today,
            "nav": None,
            "yield": yield_val,
            "source": url
        })
        print(f"  Extracted yield for {fund_name}: {yield_val}%")
    # NCBA
    elif "ncbagroup.com" in url:
        print("Stub: implement scraping for NCBA Unit Trust Funds")
    # Zimele
    elif "zimele.co.ke" in url:
        print("Stub: implement scraping for Zimele Unit Trust Scheme")
    # CIC
    elif "cicinsurancegroup.com" in url or "cic.co.ke" in url:
        print("Stub: implement scraping for CIC Unit Trust Scheme")
    # Amana
    elif "amanacapital.co.ke" in url:
        print("Stub: implement scraping for Amana Unit Trust Funds Scheme")
    # Diaspora
    elif "diasporainvestmentclub.com" in url:
        print("Stub: implement scraping for Diaspora Unit Trust Scheme")
    # First Ethical
    elif "africancapitalmarketsnews.com" in url:
        print("Stub: implement scraping for First Ethical Opportunities Fund")
    # Genghis
    elif "genghis-capital.com" in url:
        print("Stub: implement scraping for Genghis Unit Trust Funds/Specialized Funds")
    # Mali Money Market
    elif "safaricom.co.ke" in url and "mali" in url:
        print("Stub: implement scraping for Mali Money Market Fund")
    # Nabo
    elif "nabocapital.com" in url:
        print("Stub: implement scraping for Nabo Africa Funds")
    # Old Mutual
    elif "oldmutual.co.ke" in url:
        print("Stub: implement scraping for Old Mutual Unit Trust Scheme")
    # Equity
    elif "equitygroupholdings.com" in url:
        print("Stub: implement scraping for Equity Investment Bank Collective Investment Scheme")
    # Dry Associates
    elif "dryassociates.com" in url:
        print("Stub: implement scraping for Dry Associates Unit Trust Scheme")
    # Co-op Trust
    elif "co-opbank.co.ke" in url:
        print("Stub: implement scraping for Co-op Trust Fund")
    # Apollo
    elif "apainsurance.org" in url:
        print("Stub: implement scraping for Apollo Unit Trust Scheme")
    # Cytonn
    elif "cytonn.com" in url:
        print("Stub: implement scraping for Cytonn Unit Trust Scheme")
    # Orient Umbrella
    elif "orientlife.co.ke" in url:
        print("Stub: implement scraping for Orient Umbrella Collective Investment Scheme")
    # Wanafunzi
    elif "hapakenya.com" in url:
        print("Stub: implement scraping for Wanafunzi Investment Unit Trust Fund")
    # Absa
    elif "absainvestmentmanagement.co.za" in url:
        print("Stub: implement scraping for Absa Unit Trust Funds")
    # Jaza/ADAM/Masaru
    elif "adamcapital.co.ke" in url:
        print("Stub: implement scraping for Jaza/ADAM Unit Trust Fund/Scheme")
    # Masaru
    elif "synesis.co.ke" in url:
        print("Stub: implement scraping for Masaru Unit Trust Scheme")
    # GenAfrica
    elif "genafrica.com" in url:
        print("Stub: implement scraping for GenAfrica Unit Trust Scheme")
    # Amaka
    elif "amakafund.com" in url:
        print("Stub: implement scraping for Amaka Unit Trust (Umbrella) Scheme")
    # Jubilee
    elif "jubileeinsurance.com" in url:
        print("Stub: implement scraping for Jubilee Unit Trust Collective Investment Scheme")
    # Enwealth
    elif "enwealth.co.ke" in url:
        print("Stub: implement scraping for Enwealth Capital Unit Trust Scheme")
    # Kuza
    elif "kuza.africa" in url:
        print("Stub: implement scraping for Kuza Asset Management Unit Trust Scheme")
    # Etica
    elif "eticacap.com" in url:
        print("Stub: implement scraping for Etica Unit Trust Funds")
    # Lofty Corban
    elif "vasiliafrica.com/partners/lofty-corban-investments-limited-l-cil" in url:
        print("Stub: implement scraping for Lofty Corban Unit Trust Scheme")
    # Standard Investment
    elif "vasiliafrica.com/partners/standard-investment-bank" in url:
        print("Stub: implement scraping for Standard Investment Trust Funds")
    # Faida
    elif "oak.africa" in url:
        print("Stub: implement scraping for Faida Unit Trust Funds")
    # Taifa
    elif "taifapensionfund.com" in url:
        print("Stub: implement scraping for Taifa Unit Trust Funds")
    # Stanbic
    elif "stanbicbank.co.ke" in url:
        print("Stub: implement scraping for Stanbic Unit Trust Funds")
    # Spearhead Africa
    elif "spearheadafrica.co.ke" in url:
        print("Stub: implement scraping for Spearhead Africa Infrastructure (Special) Fund")
    # Rencap
    elif "rencap.com" in url:
        print("Stub: implement scraping for Rencap Unit Trust Scheme")
    # Mayfair
    elif "mayfairasset.com" in url:
        print("Stub: implement scraping for Mayfair umbrella Collective investment scheme")
    # Investcent
    elif "linkedin.com/company/investcentco" in url:
        print("Stub: implement scraping for Investcent Partners/Alternative Investment Fund")
    # ICEA LION Collective
    elif "icealion.co.ke/wp-content/uploads/2021/04/ICEA-LION-UNIT-TRUST-FUND.pdf" in url:
        print("Stub: implement scraping for ICEA LION Collective Investment Scheme")
    # GCIB
    elif "gcib.africa" in url:
        print("Stub: implement scraping for GCIB Unit Trust Scheme/Funds")
    # CPF
    elif "cpf.or.ke" in url:
        print("Stub: implement scraping for CPF Unit Trust Funds")
    # Arvocap
    elif "africabusinesscommunities.com/news/kenya-cma-approves-registration-of-arvocap-asset-managers-unit-trust-scheme" in url:
        print("Stub: implement scraping for Arvocap Unit Trust Scheme")
    # MyXENO
    elif "myxeno.com" in url:
        print("Stub: implement scraping for MyXENO Unit Trust Scheme")
    # VCG Offshore
    elif "vcgassetmanagement.com" in url:
        print("Stub: implement scraping for VCG Offshore Opportunities Special Fund")
    # Octagon
    elif "octagonafrica.com" in url:
        print("Stub: implement scraping for Octagon Unit Trust Scheme")
    # Ziidi
    elif "safaricom.co.ke/media-center-landing/press-releases/safaricom-partners-with-investment-firms-to-unveil-ziidi-money-market-fund-powered-by-m-pesa" in url:
        print("Stub: implement scraping for Ziidi Collective Investment Scheme/Shariah Money Market Fund")
    else:
        print(f"No custom parser for {url}, skipping.")
    print(f"Scraped fund manager page: {url}")
    return funds, rates

def main():
    with open(SOURCES_FILE, "r", encoding="utf-8") as f:
        sources = json.load(f)
    all_funds = []
    all_rates = []
    for src in sources:
        print(f"Processing: {src['name']} ({src['type']}) -> {src['url']}")
        if src['type'] == 'cma':
            cma_excel_path = os.path.join(DATA_DIR, 'cma_sample.xlsx')
            if os.path.exists(cma_excel_path):
                funds, rates = parse_cma_excel(cma_excel_path, src['url'])
                all_funds.extend(funds)
                all_rates.extend(rates)
                print(f"  Parsed {len(funds)} funds and {len(rates)} rates from CMA Excel.")
            else:
                print(f"  [Missing file: {cma_excel_path}]")
        elif src['type'] == 'cbk':
            cbk_excel_path = os.path.join(DATA_DIR, 'cbk_sample.xlsx')
            if os.path.exists(cbk_excel_path):
                funds, rates = parse_cbk_excel(cbk_excel_path, src['url'])
                all_funds.extend(funds)
                all_rates.extend(rates)
                print(f"  Parsed {len(funds)} funds and {len(rates)} rates from CBK Excel.")
            else:
                print(f"  [Missing file: {cbk_excel_path}]")
        elif src['type'] == 'fund_manager':
            funds, rates = scrape_fund_manager(src['url'])
            all_funds.extend(funds)
            all_rates.extend(rates)
        else:
            print("  [Unknown type, skipping]")
    if all_funds or all_rates:
        upsert_funds_and_rates(all_funds, all_rates)
    else:
        print("No data to upsert.")

if __name__ == "__main__":
    main() 