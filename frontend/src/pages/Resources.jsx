import React from "react";

const resources = [
  {
    title: "CMA Kenya: List of Licensed Money Market Funds",
    url: "https://licensees.cma.or.ke/licenses/15/",
    description: "Official list of licensed collective investment schemes and money market funds in Kenya."
  },
  {
    title: "Investopedia: Money Market Fund Basics",
    url: "https://www.investopedia.com/terms/m/money-marketfund.asp",
    description: "Comprehensive guide to understanding money market funds, their benefits, and risks."
  },
  {
    title: "Kenya Bankers Association: Market Reports",
    url: "https://www.kba.co.ke/",
    description: "Latest financial and market reports relevant to Kenyan investors."
  },
  {
    title: "Financial Times: Global Money Market News",
    url: "https://www.ft.com/markets",
    description: "Stay updated with global trends and news in the money market sector."
  },
  {
    title: "Central Bank of Kenya: Official Website",
    url: "https://www.centralbank.go.ke/",
    description: "Access official monetary policy, financial market data, treasury bills/bonds auction results, and regulatory updates from the Central Bank of Kenya. Essential for understanding the macroeconomic environment affecting money market funds and investments."
  }
];

const Resources = () => (
  <main className="p-8 max-w-3xl mx-auto">
    <head>
      <title>Resources | Kenya Money Market Funds Dashboard</title>
      <meta name="description" content="Curated resources, guides, and links for Kenya money market fund investors. Learn, compare, and stay informed." />
      <meta name="keywords" content="resources, Kenya money market funds, investment guides, financial links, fund comparison, investor education" />
      <link rel="canonical" href="/resources" />
    </head>
    <article>
      <h1 className="text-3xl font-bold mb-4">Investor Resources</h1>
      <p className="mb-6">Explore curated resources, guides, and links to help you make informed decisions about money market funds and investing in Kenya.</p>
      <section>
        <ul className="list-disc list-inside space-y-4">
          {resources.map(r => (
            <li key={r.url}>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">{r.title}</a>
              <div className="text-gray-600 text-sm">{r.description}</div>
            </li>
          ))}
        </ul>
      </section>
      <nav className="mt-8">
        <a href="/about" className="text-blue-600 hover:underline mr-4">About</a>
        <a href="/" className="text-blue-600 hover:underline mr-4">Dashboard</a>
        <a href="/faq" className="text-blue-600 hover:underline mr-4">FAQ</a>
        <a href="/contact" className="text-blue-600 hover:underline">Contact</a>
      </nav>
    </article>
  </main>
);

export default Resources; 