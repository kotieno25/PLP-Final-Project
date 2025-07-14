import React from "react";

const Home = () => (
  <main id="main-content" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-emerald-50 p-0">
    <section className="w-full flex flex-col items-center justify-center py-24 px-4 bg-gradient-to-br from-blue-600 via-blue-400 to-emerald-300 shadow-lg">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg">Kenya Money Market Funds</h1>
      <p className="text-xl md:text-2xl text-blue-50 mb-8 max-w-2xl font-medium drop-shadow">Track, compare, and analyze Kenya's top money market funds. Get up-to-date performance, advanced analytics, and expert insights for smarter investing.</p>
      <a href="/dashboard" className="btn bg-white text-blue-700 font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:bg-blue-100 transition mb-8">Go to Dashboard</a>
    </section>
    <section className="w-full flex flex-col items-center justify-center mt-[-3rem]">
      <div className="card max-w-2xl w-full mx-auto text-center bg-white/90 shadow-xl border border-blue-100">
        <h2 className="text-2xl font-bold mb-2 text-primary">Quick Links</h2>
        <div className="flex flex-wrap gap-4 justify-center text-base font-medium">
          <a href="/about" className="text-blue-600 hover:underline">About</a>
          <a href="/blog" className="text-blue-600 hover:underline">Blog</a>
          <a href="/faq" className="text-blue-600 hover:underline">FAQ</a>
          <a href="/resources" className="text-blue-600 hover:underline">Resources</a>
          <a href="/contact" className="text-blue-600 hover:underline">Contact</a>
        </div>
      </div>
    </section>
  </main>
);

export default Home; 