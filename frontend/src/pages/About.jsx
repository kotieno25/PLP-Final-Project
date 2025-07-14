import React from "react";

const About = () => (
  <main className="p-8 max-w-3xl mx-auto">
    <head>
      <title>About | Kenya Money Market Funds Dashboard</title>
      <meta name="description" content="Learn about the Kenya Money Market Funds Dashboard, your trusted source for fund performance analytics, investment insights, and financial education." />
      <meta name="keywords" content="about Kenya money market funds, fund analytics, investment platform, financial education, fund dashboard" />
      <link rel="canonical" href="/about" />
    </head>
    <article>
      <h1 className="text-3xl font-bold mb-4">About Kenya Money Market Funds Dashboard</h1>
      <p className="mb-4">
        <strong>Kenya Money Market Funds Dashboard</strong> is your trusted platform for tracking, analyzing, and comparing Kenya's top money market funds. Our mission is to empower investors with up-to-date fund performance data, advanced analytics, and expert insights to make smarter investment decisions.
      </p>
      <p className="mb-4">
        We aggregate and visualize fund Net Asset Value (NAV), yield, and performance trends, making it easy for you to compare funds, spot opportunities, and manage your portfolio efficiently. Our dashboard is designed for both new and experienced investors seeking transparency and actionable information in the Kenyan financial market.
      </p>
      <nav className="mb-6">
        <ul className="list-disc list-inside space-y-2">
          <li><a href="/" className="text-blue-600 hover:underline">Dashboard</a> – Explore fund analytics and performance.</li>
          <li><a href="/faq" className="text-blue-600 hover:underline">FAQ</a> – Frequently asked questions about money market funds.</li>
          <li><a href="/blog" className="text-blue-600 hover:underline">Blog</a> – Read the latest investment insights and news.</li>
          <li><a href="/contact" className="text-blue-600 hover:underline">Contact</a> – Get in touch with our team.</li>
        </ul>
      </nav>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Why Choose Us?</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Comprehensive, up-to-date fund data and analytics</li>
          <li>Easy fund comparison and performance tracking</li>
          <li>Expert insights and educational resources</li>
          <li>Secure, user-friendly, and mobile-optimized platform</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
        <p>
          To be the leading source of financial data and investment education for Kenya’s money market fund investors.
        </p>
      <nav className="mt-8">
        <a href="/about" className="text-blue-600 hover:underline mr-4">About</a>
        <a href="/" className="text-blue-600 hover:underline mr-4">Dashboard</a>
        <a href="/faq" className="text-blue-600 hover:underline mr-4">FAQ</a>
        <a href="/contact" className="text-blue-600 hover:underline">Contact</a>
      </nav>
      </section>
    </article>
  </main>
);

export default About; 