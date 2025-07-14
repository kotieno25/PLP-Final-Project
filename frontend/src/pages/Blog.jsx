import React from "react";

const articles = [
  {
    title: "How to Choose the Best Money Market Fund in Kenya",
    date: "2024-07-13",
    summary: "Learn the key factors to consider when selecting a money market fund, including yield, risk, fund manager reputation, and fees.",
    link: "/blog/how-to-choose-best-money-market-fund"
  },
  {
    title: "Understanding NAV and Yield: What Every Investor Should Know",
    date: "2024-07-10",
    summary: "A simple guide to Net Asset Value (NAV) and yield, and how they impact your investment returns in money market funds.",
    link: "/blog/understanding-nav-yield"
  },
  {
    title: "Top 5 Money Market Funds in Kenya: 2024 Review",
    date: "2024-07-01",
    summary: "A data-driven review of the top-performing money market funds in Kenya for 2024, with tips for maximizing your returns.",
    link: "/blog/top-5-money-market-funds-kenya-2024"
  }
];

const Blog = () => (
  <main className="p-8 max-w-3xl mx-auto">
    <head>
      <title>Blog | Kenya Money Market Funds Dashboard</title>
      <meta name="description" content="Read the latest articles, news, and investment insights on Kenya money market funds, fund performance, and financial strategies." />
      <meta name="keywords" content="blog, Kenya money market funds, investment news, fund performance, financial strategies, NAV, yield" />
      <link rel="canonical" href="/blog" />
    </head>
    <article>
      <h1 className="text-3xl font-bold mb-4">Blog & Insights</h1>
      <p className="mb-6">Stay up to date with the latest news, analysis, and tips on money market funds and investing in Kenya. <a href="/resources" className="text-blue-600 hover:underline">See more resources</a>.</p>
      <section>
        {articles.map(article => (
          <div key={article.link} className="mb-6 border-b pb-4">
            <h2 className="text-2xl font-semibold mb-1"><a href={article.link} className="text-blue-600 hover:underline">{article.title}</a></h2>
            <div className="text-gray-500 text-sm mb-2">{new Date(article.date).toLocaleDateString()}</div>
            <p className="mb-2">{article.summary}</p>
            <a href={article.link} className="text-blue-600 hover:underline text-sm">Read more</a>
          </div>
        ))}
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

export default Blog; 