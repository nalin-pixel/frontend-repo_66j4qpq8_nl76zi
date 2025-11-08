import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-12">
        <div className="bg-white/70 backdrop-blur rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 w-full md:max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">Modern, Minimalist Commerce</h1>
          <p className="mt-3 text-gray-600">Seamless shopping experience with bank transfer checkout. Built for simplicity and speed.</p>
          <div className="mt-6 flex items-center gap-3">
            <a href="#products" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">Shop Top Picks</a>
            <a href="#bestsellers" className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800">Best Sellers</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
