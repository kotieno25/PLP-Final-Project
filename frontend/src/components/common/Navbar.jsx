import React from "react";

const Navbar = () => (
  <>
    <nav className="bg-white shadow sticky top-0 z-40" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-10 flex-1"> {/* Increased gap for more space between titles */}
          <a href="/about" className="text-gray-700 hover:text-blue-700" role="menuitem" tabIndex={0}>About</a>
          <a href="/dashboard" className="text-xl font-bold text-blue-700" role="menuitem" tabIndex={0}>MMF Dashboard</a>
          <a href="/fund-managers" className="text-gray-700 hover:text-blue-700" role="menuitem" tabIndex={0}>Fund Managers</a>
          <a href="/resources" className="text-gray-700 hover:text-blue-700" role="menuitem" tabIndex={0}>Resources</a>
          <a href="/blog" className="text-gray-700 hover:text-blue-700" role="menuitem" tabIndex={0}>Blog</a>
          <a href="/faq" className="text-gray-700 hover:text-blue-700" role="menuitem" tabIndex={0}>FAQ</a>
          <a href="/contact" className="text-gray-700 hover:text-blue-700" role="menuitem" tabIndex={0}>Contact</a>
        </div>
      </div>
    </nav>
  </>
);

export default Navbar; 