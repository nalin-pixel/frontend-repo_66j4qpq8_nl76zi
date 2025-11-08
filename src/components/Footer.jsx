import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-3">
        <p>
          © {new Date().getFullYear()} PastelPay Commerce. All rights reserved.
        </p>
        <nav className="flex items-center gap-4">
          <a href="#products" className="hover:text-gray-900">Products</a>
          <a href="#bestsellers" className="hover:text-gray-900">Best Sellers</a>
          <a href="#" className="hover:text-gray-900">Privacy</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
