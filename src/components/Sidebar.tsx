import Link from 'next/link';
import Image from 'next/image';
import NewsletterForm from './NewsletterForm';

export default function Sidebar() {
  return (
    <aside className="sidebar w-72 h-screen fixed left-0 top-0 overflow-y-auto">
      {/* Logo Section */}
      <div className="logo-section">
        <div className="avatar-container">
          <Link href="/">
            <Image
              src="/avatar.jpg"
              alt="Johan Moreno"
              width={56}
              height={56}
              className="avatar-image"
              priority
              unoptimized
            />
          </Link>
        </div>
        <div className="blog-name">Johan Moreno</div>
      </div>

      {/* Search */}
      <div className="sidebar-section">
        <div className="sidebar-title">Search</div>
        <div className="search-box">
          <input 
            type="text" 
            className="search-input" 
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

      {/* Subscribe */}
      <div className="sidebar-section">
        <div className="sidebar-title">Join My Mailing List</div>
        <NewsletterForm />
      </div>

      {/* Connect */}
      <div className="sidebar-section">
        <div className="sidebar-title">Connect</div>
        <Link href="https://x.com/dudejohan" target="_blank" className="sidebar-link">
          X (Twitter) ↗
        </Link>
        <Link href="https://www.linkedin.com/in/johanmoreno/" target="_blank" className="sidebar-link">
          LinkedIn ↗
        </Link>
        <Link href="https://www.instagram.com/morejohan" target="_blank" className="sidebar-link">
          Instagram ↗
        </Link>
        <Link href="https://www.youtube.com/@johanmore" target="_blank" className="sidebar-link">
          YouTube ↗
        </Link>
      </div>

      {/* Explore */}
      <div className="sidebar-section">
        <div className="sidebar-title">Explore</div>
        <Link href="/" className="sidebar-link">All Posts</Link>
        <Link href="/about" className="sidebar-link">About</Link>
        <Link href="/portfolio" className="sidebar-link">Portfolio</Link>
        <Link href="/work" className="sidebar-link">Work</Link>
      </div>

      {/* Footer */}
      <div className="sidebar-section" style={{ borderBottom: 'none' }}>
        <p className="text-xs" style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
          © 2026 Johan Moreno<br />
          Made with care.
        </p>
      </div>
    </aside>
  );
}
