import { useEffect, useState } from 'react';

const navLinks = [
  { href: '#home', label: 'Home' }, { href: '#about', label: 'About' }, { href: '#history', label: 'History' },
  { href: '#committee', label: 'Committee' }, { href: '#activities', label: 'Activities' }, { href: '#events', label: 'Events' },
  { href: '#gallery', label: 'Gallery' }, { href: '#announcements', label: 'Announcements' }, { href: '#downloads', label: 'Downloads' },
  { href: '#donation', label: 'Donation' }, { href: '#contact', label: 'Contact' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id));
    }, { threshold: 0.35 });

    navLinks.forEach(({ href }) => {
      const section = document.querySelector(href);
      if (section) observer.observe(section);
    });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleAnchorClick = (event, href) => {
    event.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.innerWidth <= 1100) setMenuOpen(false);
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`} id="top">
      <div className="nav-container">
        <a className="brand" href="#home" aria-label="Shri Shirva Bhanushali Mahajan home" onClick={(event) => handleAnchorClick(event, '#home')}>
          <img className="brand-mark" src="/../../favicon.png" alt="SBM logo" />
          <span>Shri Shirva Bhanushali Mahajan</span>
        </a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-nav" aria-label="Open navigation menu" onClick={() => setMenuOpen((value) => !value)}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
        <nav className={`site-nav ${menuOpen ? 'open' : ''}`} id="site-nav" aria-label="Primary navigation">
          <ul>{navLinks.map((link) => <li key={link.href}><a href={link.href} className={activeSection === link.href.slice(1) ? 'active' : ''} onClick={(event) => handleAnchorClick(event, link.href)}>{link.label}</a></li>)}</ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
