import { useEffect, useRef, useState } from 'react';
import logo from '../../favicon.png';
import './Navbar.css';

const navLinks = [
  { href: '#home', label: 'Home' }, { href: '#about', label: 'About' }, { href: '#history', label: 'History' },
  { href: '#committee', label: 'Committee' }, { href: '#activities', label: 'Activities' },
  { href: '#events', label: 'Events' },
  { href: '#gallery', label: 'Gallery' }, { href: '#announcements', label: 'Announcements' },
  { href: '#donation', label: 'Donation' }, { href: '#contact', label: 'Contact' },
];

function Navbar() {
  const headerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [navMode, setNavMode] = useState('desktop');

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty('--header-height', `${headerRef.current?.offsetHeight ?? 0}px`);
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

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

  useEffect(() => {
    const updateNavMode = () => {
      if (window.innerWidth <= 700) {
        setNavMode('mobile');
      } else if (window.innerWidth <= 1100) {
        setNavMode('tablet');
      } else {
        setNavMode('desktop');
      }
    };

    updateNavMode();
    window.addEventListener('resize', updateNavMode);

    return () => window.removeEventListener('resize', updateNavMode);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleOutsideClick = (event) => {
      const nav = document.getElementById('site-nav');
      const toggle = document.querySelector('.menu-toggle');

      if (!nav || !toggle) return;
      if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleOutsideClick);
    document.body.classList.add('menu-open');

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  const handleAnchorClick = (event, href) => {
    event.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.innerWidth <= 1100) closeMenu();
  };

  const navigation = (
    <nav className={`site-nav ${menuOpen ? 'open' : ''} ${navMode === 'mobile' ? 'mobile-menu' : navMode === 'tablet' ? 'tablet-menu' : ''}`} id="site-nav" aria-label="Primary navigation">
      <ul>{navLinks.map((link) => <li key={link.href}><a href={link.href} className={activeSection === link.href.slice(1) ? 'active' : ''} onClick={(event) => handleAnchorClick(event, link.href)}>{link.label}</a></li>)}</ul>
    </nav>
  );

  return (
    <>
      <header ref={headerRef} className={`site-header ${scrolled ? 'scrolled' : ''}`} id="top">
        <div className="nav-container">
          <a className="brand" href="#home" aria-label="Shri Shirva Bhanushali Mahajan home" onClick={(event) => handleAnchorClick(event, '#home')}>
            <img className="brand-mark" src={logo} alt="SBM logo" />
            <span>Shri Shirva Bhanushali Mahajan Trust</span>
          </a>
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-nav" aria-label="Open navigation menu" onClick={() => setMenuOpen((value) => !value)}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
          {navMode !== 'mobile' && navigation}
        </div>
      </header>
      {navMode === 'mobile' && navigation}
    </>
  );
}

export default Navbar;
