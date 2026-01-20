'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NewsletterForm from './NewsletterForm';

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent background scrolling when menu is open
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  return (
    <>
      <header className="mobile-header md:hidden fixed top-0 left-0 right-0 h-16 bg-[var(--bg-primary)] border-b border-[var(--border)] z-50 flex items-center justify-between px-4">
        <Link href="/" onClick={() => isOpen && toggleMenu()}>
          <div className="font-playfair font-bold text-lg tracking-wide uppercase">
            Johan Moreno
          </div>
        </Link>
        <button
          onClick={toggleMenu}
          className="p-2 -mr-2 text-[var(--text-primary)]"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </header>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 top-16 bg-[var(--bg-secondary)] z-40 overflow-y-auto pb-10 md:hidden animate-fade-in">
          <div className="p-6 space-y-8">
             {/* Logo Section in Drawer */}
             <div className="flex flex-col items-center">
                <Link href="/" onClick={toggleMenu}>
                  <Image
                    src="/avatar.jpg"
                    alt="Johan Moreno"
                    width={80}
                    height={80}
                    className="avatar-image mb-4"
                    priority
                    unoptimized
                  />
                </Link>
             </div>

            {/* Newsletter */}
            <div>
               <div className="sidebar-title mb-4">Join My Mailing List</div>
               <NewsletterForm />
            </div>

            {/* Search */}
            <div>
               <div className="sidebar-title mb-4">Search</div>
               <div className="search-box">
                <input 
                  type="text" 
                  className="search-input min-w-0" 
                  placeholder="Search posts..."
                  aria-label="Search posts"
                />
                <button className="search-button" aria-label="Search">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-4">
              <div className="sidebar-title mb-2">Explore</div>
              <Link href="/" onClick={toggleMenu} className="sidebar-link text-lg">All Posts</Link>
              <Link href="/about" onClick={toggleMenu} className="sidebar-link text-lg">About</Link>
              <Link href="/portfolio" onClick={toggleMenu} className="sidebar-link text-lg">Portfolio</Link>
              <Link href="/work" onClick={toggleMenu} className="sidebar-link text-lg">Work</Link>
            </nav>

            {/* Socials */}
            <nav className="flex flex-col space-y-4">
              <div className="sidebar-title mb-2">Connect</div>
              <Link href="https://x.com/dudejohan" target="_blank" className="sidebar-link">X (Twitter) ↗</Link>
              <Link href="https://www.linkedin.com/in/johanmoreno/" target="_blank" className="sidebar-link">LinkedIn ↗</Link>
              <Link href="https://www.instagram.com/morejohan" target="_blank" className="sidebar-link">Instagram ↗</Link>
              <Link href="https://www.youtube.com/@johanmore" target="_blank" className="sidebar-link">YouTube ↗</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
