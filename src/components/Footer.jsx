function Footer() {
  const scrollToSection = (event, href) => {
    event.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer>
      <div className="container footer-grid">
        <div><h3>Shri Shirva Bhanushali Mahajan</h3><p>Community-led service, heritage and shared progress for every generation.</p></div>
        <div><h3>Quick Links</h3><ul className="footer-links"><li><a href="#about" onClick={(event) => scrollToSection(event, '#about')}>About</a></li><li><a href="#history" onClick={(event) => scrollToSection(event, '#history')}>History</a></li><li><a href="#committee" onClick={(event) => scrollToSection(event, '#committee')}>Committee</a></li><li><a href="#donation" onClick={(event) => scrollToSection(event, '#donation')}>Donation</a></li></ul></div>
        <div><h3>Contact</h3><ul className="footer-links"><li><a href="mailto:contact@shirvabhanushalmahajan.org">Email</a></li><li><a href="tel:+919876543210">Phone</a></li><li><a href="#">Facebook</a></li><li><a href="#">Instagram</a></li></ul></div>
      </div>
    </footer>
  );
}

export default Footer;
