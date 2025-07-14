import React from "react";

const fundManagers = [
  { name: "African Alliance Kenya Unit Trust Scheme", url: "https://www.africanalliance.com/copy-of-about-asset-management", logo: "/src/assets/fund-managers/placeholder.png", description: "Offers a range of unit trust funds including money market, equity, and balanced funds for both retail and institutional investors." },
  { name: "British-American Unit Trust Scheme", url: "https://ke.britam.com/save-and-invest/personal/invest/unit-trust-funds", logo: "/src/assets/fund-managers/placeholder.png", description: "Provides money market, equity, balanced, and fixed income funds. Known for Britam Money Market Fund and Britam Balanced Fund." },
  { name: "NCBA Unit Trust Funds", url: "https://investment-bank.ncbagroup.com/wealth-management/collective-investment-schemes/unit-trust-funds/", logo: "/src/assets/fund-managers/placeholder.png", description: "Offers money market, fixed income, equity, and balanced funds. NCBA Money Market Fund is popular for short-term savings." },
  { name: "Zimele Unit Trust Scheme", url: "https://www.zimele.co.ke/about-zimele/", logo: "/src/assets/fund-managers/placeholder.png", description: "Provides Zimele Savings Plan and Zimele Money Market Fund, focusing on flexible savings and low minimum investments." },
  { name: "ICEA Unit Trust Scheme", url: "https://icealion.co.ke/", logo: "/src/assets/fund-managers/placeholder.png", description: "ICEA LION offers money market, equity, and balanced funds, with a focus on capital preservation and steady returns." },
  { name: "CIC Unit Trust Scheme", url: "https://ke.cicinsurancegroup.com/how-to-open-and-deposit-or-top-up-your-cic-unit-trust-account-using-mpesa-paybill-600118/", logo: "/src/assets/fund-managers/placeholder.png", description: "CIC Asset Management provides money market, fixed income, and equity funds. CIC Money Market Fund is known for liquidity and safety." },
  { name: "Madison Unit Trust Fund", url: "https://www.madison.co.ke/investmentmanagers/", logo: "/src/assets/fund-managers/placeholder.png", description: "Offers Madison Money Market Fund and other collective investment schemes for both individuals and institutions." },
  { name: "Dyer and Blair Unit Trust Scheme", url: "https://www.dyerandblair.com/", logo: "/src/assets/fund-managers/placeholder.png", description: "Provides Dyer & Blair Money Market Fund and other investment products, focusing on capital preservation and liquidity." },
  { name: "Amana Unit Trust Funds Scheme", url: "https://amanacapital.co.ke/about", logo: "/src/assets/fund-managers/placeholder.png", description: "Offers Amana Money Market Fund and Shariah-compliant investment options for retail and institutional clients." },
  { name: "Diaspora Unit Trust Scheme", url: "https://diasporainvestmentclub.com/", logo: "/src/assets/fund-managers/placeholder.png", description: "Targets Kenyans in the diaspora with money market and investment products for wealth growth and remittance management." },
  { name: "KCB Unit Trust Scheme (formerly Natbank Unit Trust Scheme)", url: "https://ke.kcbgroup.com/for-you/investments", logo: "/src/assets/fund-managers/placeholder.png", description: "KCB Money Market Fund offers low-risk, highly liquid investment options in KES and USD, managed by KCB Asset Management." },
  { name: "Kuza Asset Management Unit Trust Scheme", url: "https://kuza.africa/", logo: "/src/assets/fund-managers/placeholder.png", description: "Offers Kuza Money Market Fund (KES & USD), Fixed Income Fund, and Shariah-compliant funds. Focus on capital preservation and liquidity." },
  { name: "Etica Unit Trust Funds", url: "https://eticacap.com/", logo: "/src/assets/fund-managers/placeholder.png", description: "Provides Etica Money Market Fund (KES & USD), Fixed Income, and Shariah funds. Focus on high yield, no lock-in, and daily compounding." },
  { name: "Lofty Corban Unit Trust Scheme", url: "https://vasiliafrica.com/partners/lofty-corban-investments-limited-l-cil/", logo: "/src/assets/fund-managers/placeholder.png", description: "Description coming soon. Visit the official website for more details." },
  { name: "Standard Investment Trust Funds", url: "https://vasiliafrica.com/partners/standard-investment-bank/", logo: "/src/assets/fund-managers/placeholder.png", description: "Description coming soon. Visit the official website for more details." },
  { name: "Faida Unit Trust Funds", url: "https://oak.africa/", logo: "/src/assets/fund-managers/placeholder.png", description: "Description coming soon. Visit the official website for more details." },
  { name: "Taifa Unit Trust Funds", url: "https://www.taifapensionfund.com/", logo: "/src/assets/fund-managers/placeholder.png", description: "Description coming soon. Visit the official website for more details." },
  { name: "Stanbic Unit Trust Funds", url: "https://www.stanbicbank.co.ke/static_file/Kenya/Downloadable files/Unit Trust Funds/Financials/2025/STANBIC UNIT TRUST KEY INVESTOR INFORMATION DOCUMENT.pdf", logo: "/src/assets/fund-managers/placeholder.png", description: "Description coming soon. Visit the official website for more details." },
  { name: "Spearhead Africa Infrastructure (Special) Fund", url: "https://spearheadafrica.co.ke/experience/", logo: "/src/assets/fund-managers/placeholder.png", description: "Description coming soon. Visit the official website for more details." },
  { name: "Rencap Unit Trust Scheme", url: "https://www.rencap.com/", logo: "/src/assets/fund-managers/placeholder.png", description: "Description coming soon. Visit the official website for more details." },
  { name: "Mayfair umbrella Collective investment scheme", url: "https://mayfairasset.com/wp-content/uploads/2024/10/Information-Memorandum-Mayfair-Fixed-Income-Fund.pdf", logo: "/src/assets/fund-managers/placeholder.png", description: "Description coming soon. Visit the official website for more details." },
  { name: "Investcent Partners Trust Fund", url: "https://ke.linkedin.com/company/investcentco", logo: "/src/assets/fund-managers/placeholder.png", description: "Description coming soon. Visit the official website for more details." },
  { name: "Investcent Alternative Investment Fund", url: "https://ke.linkedin.com/company/investcentco", logo: "/src/assets/fund-managers/placeholder.png", description: "Description coming soon. Visit the official website for more details." },
  { name: "ICEA LION Collective Investment Scheme", url: "https://icealion.co.ke/wp-content/uploads/2021/04/ICEA-LION-UNIT-TRUST-FUND.pdf", logo: "/src/assets/fund-managers/placeholder.png", description: "Description coming soon. Visit the official website for more details." },
  { name: "GCIB Unit Trust Scheme", url: "https://gcib.africa/asset-and-wealth-management/", logo: "/src/assets/fund-managers/placeholder.png", description: "Description coming soon. Visit the official website for more details." },
  { name: "CPF Unit Trust Funds", url: "https://cpf.or.ke/home/", logo: "/src/assets/fund-managers/placeholder.png", description: "Description coming soon. Visit the official website for more details." },
  { name: "Arvocap Unit Trust Scheme", url: "https://africabusinesscommunities.com/news/kenya-cma-approves-registration-of-arvocap-asset-managers-unit-trust-scheme/", logo: "/src/assets/fund-managers/placeholder.png", description: "Description coming soon. Visit the official website for more details." },
  { name: "MyXENO Unit Trust Scheme", url: "https://myxeno.com", logo: "/src/assets/fund-managers/placeholder.png", description: "Description coming soon. Visit the official website for more details." },
  { name: "GCIB Unit Trust Funds", url: "https://gcib.africa/asset-and-wealth-management/", logo: "/src/assets/fund-managers/placeholder.png", description: "Description coming soon. Visit the official website for more details." },
  { name: "VCG Offshore Opportunities Special Fund", url: "https://www.vcgassetmanagement.com/", logo: "/src/assets/fund-managers/placeholder.png", description: "Description coming soon. Visit the official website for more details." },
  { name: "Octagon Unit Trust Scheme", url: "https://www.octagonafrica.com/trust-services/", logo: "/src/assets/fund-managers/placeholder.png", description: "Description coming soon. Visit the official website for more details." },
  { name: "Ziidi Collective Investment Scheme", url: "https://www.safaricom.co.ke/media-center-landing/press-releases/safaricom-partners-with-investment-firms-to-unveil-ziidi-money-market-fund-powered-by-m-pesa", logo: "/src/assets/fund-managers/placeholder.png", description: "Description coming soon. Visit the official website for more details." },
  { name: "Ziidi Shariah Money Market Fund", url: "https://www.safaricom.co.ke/media-center-landing/press-releases/safaricom-partners-with-investment-firms-to-unveil-ziidi-money-market-fund-powered-by-m-pesa", logo: "/src/assets/fund-managers/placeholder.png", description: "Description coming soon. Visit the official website for more details." }
];

const FundManagers = () => {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Registered Fund Managers</h1>
      <div className="grid grid-cols-5 gap-6">
        {fundManagers.map((manager, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex flex-col items-center text-center">
              <img
                src={manager.logo}
                alt={`${manager.name} logo`}
                className="h-16 w-auto mb-4 object-contain bg-gray-50 border rounded p-2"
                onError={e => { 
                  e.target.onerror = null; 
                  e.target.src = "/src/assets/react.svg"; 
                }}
              />
              {manager.url ? (
                <a
                  href={manager.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline text-center"
                >
                  {manager.name}
                </a>
              ) : (
                <span className="text-sm font-semibold text-gray-600 text-center">
                  {manager.name}
                </span>
              )}
              <div className="text-xs text-gray-600 mt-2">{manager.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundManagers; 