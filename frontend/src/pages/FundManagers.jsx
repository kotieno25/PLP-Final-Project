import React from "react";

const fundManagers = [
  { name: "African Alliance Kenya Unit Trust Scheme", url: "https://www.africanalliance.com/copy-of-about-asset-management", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "British-American Unit Trust Scheme", url: "https://ke.britam.com/save-and-invest/personal/invest/unit-trust-funds", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "NCBA Unit Trust Funds", url: "https://investment-bank.ncbagroup.com/wealth-management/collective-investment-schemes/unit-trust-funds/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Zimele Unit Trust Scheme", url: "https://www.zimele.co.ke/about-zimele/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "ICEA Unit Trust Scheme", url: "https://icealion.co.ke/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "CIC Unit Trust Scheme", url: "https://ke.cicinsurancegroup.com/how-to-open-and-deposit-or-top-up-your-cic-unit-trust-account-using-mpesa-paybill-600118/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Madison Unit Trust Fund", url: "https://www.madison.co.ke/investmentmanagers/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Dyer and Blair Unit Trust Scheme", url: "https://www.dyerandblair.com/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Amana Unit Trust Funds Scheme", url: "https://amanacapital.co.ke/about", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Diaspora Unit Trust Scheme", url: "https://diasporainvestmentclub.com/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "First Ethical Opportunities Fund", url: "https://africancapitalmarketsnews.com/kenya-licences-first-ethical-islamic-finance-fund/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Genghis Unit Trust Funds", url: "https://genghis-capital.com/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Mali Money Market Fund", url: "https://www.safaricom.co.ke/media-center-landing/terms-and-conditions/terms-and-conditions-for-mali-investment-product", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Genghis Specialized Funds", url: "https://genghis-capital.com/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Sanlam Unit Trust Scheme", url: "http://www.sanlam.co.za/investmentseastafrica/unittrusts/Pages/default.aspx", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Nabo Africa Funds", url: "https://www.nabocapital.com/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Old Mutual Unit Trust Scheme", url: "https://www.oldmutual.co.ke/personal/save-and-invest/unit-trusts", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Equity Investment Bank Collective Investment Scheme", url: "https://equitygroupholdings.com/ke/investor-relations/eib", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Dry Associates Unit Trust Scheme", url: "https://www.dryassociates.com/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Co-op Trust Fund", url: "https://www.co-opbank.co.ke/investing/co-op-trust-wealth-management-services/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Apollo Unit Trust Scheme", url: "https://www.apainsurance.org/product_investment.php", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Cytonn Unit Trust Scheme", url: "https://cytonn.com/topicals/unit-trust-funds-5", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Orient Umbrella Collective Investment Scheme (formerly Alphafrica Umbrella Fund)", url: "https://www.orientlife.co.ke/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Wanafunzi Investment Unit Trust Fund", url: "https://hapakenya.com/tag/wanafunzi-investment/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Absa Unit Trust Funds", url: "https://www.absainvestmentmanagement.co.za/wealth-and-investment-management/personal/investment-products/absa-unit-trusts/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Jaza Unit Trust Fund", url: "https://adamcapital.co.ke/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Masaru Unit Trust Scheme", url: "https://www.synesis.co.ke/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "ADAM Unit Trust Scheme", url: "https://adamcapital.co.ke/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "KCB Unit Trust Scheme (formerly Natbank Unit Trust Scheme)", url: "https://ke.kcbgroup.com/for-you/investments", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "GenAfrica Unit Trust Scheme", url: "https://genafrica.com/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Amaka Unit Trust (Umbrella) Scheme", url: "https://ke.amakafund.com/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Jubilee Unit Trust Collective Investment Scheme", url: "https://jubileeinsurance.com/ke/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Enwealth Capital Unit Trust Scheme", url: "https://enwealth.co.ke/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Kuza Asset Management Unit Trust Scheme", url: "https://kuza.africa/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Etica Unit Trust Funds", url: "https://eticacap.com/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Lofty Corban Unit Trust Scheme", url: "https://vasiliafrica.com/partners/lofty-corban-investments-limited-l-cil/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Standard Investment Trust Funds", url: "https://vasiliafrica.com/partners/standard-investment-bank/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Faida Unit Trust Funds", url: "https://oak.africa/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Taifa Unit Trust Funds", url: "https://www.taifapensionfund.com/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Stanbic Unit Trust Funds", url: "https://www.stanbicbank.co.ke/static_file/Kenya/Downloadable files/Unit Trust Funds/Financials/2025/STANBIC UNIT TRUST KEY INVESTOR INFORMATION DOCUMENT.pdf", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Spearhead Africa Infrastructure (Special) Fund", url: "https://spearheadafrica.co.ke/experience/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Rencap Unit Trust Scheme", url: "https://www.rencap.com/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Mayfair umbrella Collective investment scheme", url: "https://mayfairasset.com/wp-content/uploads/2024/10/Information-Memorandum-Mayfair-Fixed-Income-Fund.pdf", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Investcent Partners Trust Fund", url: "https://ke.linkedin.com/company/investcentco", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Investcent Alternative Investment Fund", url: "https://ke.linkedin.com/company/investcentco", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "ICEA LION Collective Investment Scheme", url: "https://icealion.co.ke/wp-content/uploads/2021/04/ICEA-LION-UNIT-TRUST-FUND.pdf", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "GCIB Unit Trust Scheme", url: "https://gcib.africa/asset-and-wealth-management/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "CPF Unit Trust Funds", url: "https://cpf.or.ke/home/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Arvocap Unit Trust Scheme", url: "https://africabusinesscommunities.com/news/kenya-cma-approves-registration-of-arvocap-asset-managers-unit-trust-scheme/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "MyXENO Unit Trust Scheme", url: "https://myxeno.com", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "GCIB Unit Trust Funds", url: "https://gcib.africa/asset-and-wealth-management/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "VCG Offshore Opportunities Special Fund", url: "https://www.vcgassetmanagement.com/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Octagon Unit Trust Scheme", url: "https://www.octagonafrica.com/trust-services/", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Ziidi Collective Investment Scheme", url: "https://www.safaricom.co.ke/media-center-landing/press-releases/safaricom-partners-with-investment-firms-to-unveil-ziidi-money-market-fund-powered-by-m-pesa", logo: "/src/assets/fund-managers/placeholder.png" },
  { name: "Ziidi Shariah Money Market Fund", url: "https://www.safaricom.co.ke/media-center-landing/press-releases/safaricom-partners-with-investment-firms-to-unveil-ziidi-money-market-fund-powered-by-m-pesa", logo: "/src/assets/fund-managers/placeholder.png" }
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundManagers; 