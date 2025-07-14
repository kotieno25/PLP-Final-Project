import React from "react";

const FAQ = () => (
  <main className="p-8 max-w-3xl mx-auto">
    <head>
      <title>FAQ | Kenya Money Market Funds Dashboard</title>
      <meta name="description" content="Frequently asked questions about Kenya money market funds, fund performance, analytics, and using the dashboard." />
      <meta name="keywords" content="FAQ, Kenya money market funds, fund analytics, investment questions, dashboard help, fund performance" />
      <link rel="canonical" href="/faq" />
    </head>
    <article>
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">What is a money market fund?</h2>
        <p>
          A money market fund is a type of mutual fund that invests in short-term, low-risk financial instruments such as treasury bills, commercial paper, and certificates of deposit. They are designed to offer investors safety, liquidity, and a modest yield.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">How do I use the Kenya Money Market Funds Dashboard?</h2>
        <p>
          The dashboard allows you to <a href="/" className="text-blue-600 hover:underline">compare fund performance</a>, analyze trends, and view detailed analytics for each fund.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">How often is fund data updated?</h2>
        <p>
          Fund data is updated regularly to ensure you have access to the latest performance, NAV, and yield information. Check the dashboard for the most recent updates.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Can I trust the analytics and insights?</h2>
        <p>
          Yes. Our analytics are based on data from reputable sources and are calculated using industry-standard methods. For more details, visit our <a href="/about" className="text-blue-600 hover:underline">About</a> page.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">How do I contact support?</h2>
        <p>
          You can reach our team via the <a href="/contact" className="text-blue-600 hover:underline">Contact</a> page. We’re here to help with any questions or feedback.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Where can I learn more about investing?</h2>
        <p>
          Visit our <a href="/blog" className="text-blue-600 hover:underline">Blog</a> and <a href="/resources" className="text-blue-600 hover:underline">Resources</a> pages for educational articles, guides, and the latest news on money market funds and investing in Kenya.
        </p>
      </section>
    </article>
  </main>
);

export default FAQ; 