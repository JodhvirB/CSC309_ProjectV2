import React from 'react';
import Navbar from '@/components/Layout/Navbar';

const HomePage = () => {
  return (
    <div className="bg-dark-blue text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow px-4">
        <h1 className="text-5xl font-bold text-dark-red mb-4">Welcome to Scriptorium</h1>
        <p className="text-lg text-center max-w-2xl mb-6">
          Your hub for sharing knowledge, exploring ideas, and connecting with others. Start by creating or exploring blog posts, templates, and more!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/blogs"
            className="bg-dark-red text-white py-2 px-6 rounded hover:bg-opacity-90 transition"
          >
            Explore Blogposts
          </a>
          <a
            href="/templates"
            className="bg-dark-blue border border-dark-red text-white py-2 px-6 rounded hover:bg-dark-red transition"
          >
            Explore Templates
          </a>
        </div>
      </main>
      <footer className="bg-dark-blue text-center py-4 text-sm border-t border-dark-red">
        © 2024 Scriptorium. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;

