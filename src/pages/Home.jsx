import { useEffect, useRef, useState } from 'react';
import logo from '../../favicon.png';
import './Hero.css';
import './Home.css';
import Lightbox from '../components/Lightbox';
import { activities, announcements, committeeMembers, downloads, featureCards, galleryItems, stats, timelineItems } from '../data/homeData';

function Home() {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleTimeline, setVisibleTimeline] = useState(new Set());
  const [counterValues, setCounterValues] = useState({});
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const sectionRefs = useRef([]);
  const revealRefs = useRef([]);
  const counterRefs = useRef([]);
  const timelineRefs = useRef([]);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { setVisibleSections((previous) => new Set(previous).add(entry.target.dataset.revealId || 'reveal')); revealObserver.unobserve(entry.target); } }), { threshold: 0.16 });
    const counterObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (!entry.isIntersecting) return; const target = Number(entry.target.dataset.target || 0); const startTime = performance.now(); const step = (now) => { const progress = Math.min((now - startTime) / 1200, 1); setCounterValues((previous) => ({ ...previous, [entry.target.dataset.counterId]: Math.round(target * (1 - Math.pow(1 - progress, 3))).toLocaleString() })); if (progress < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); counterObserver.unobserve(entry.target); }), { threshold: 0.6 });
    const timelineObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { setVisibleTimeline((previous) => new Set(previous).add(entry.target.dataset.timelineId)); timelineObserver.unobserve(entry.target); } }), { threshold: 0.16 });
    revealRefs.current.forEach((element) => element && revealObserver.observe(element));
    counterRefs.current.forEach((element) => element && counterObserver.observe(element));
    timelineRefs.current.forEach((element) => element && timelineObserver.observe(element));
    return () => { revealObserver.disconnect(); counterObserver.disconnect(); timelineObserver.disconnect(); };
  }, []);

  const onAnchorClick = (event, href) => { event.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const openLightbox = (index) => { setGalleryIndex(index); setIsLightboxOpen(true); };
  const handlePastEventScroll = (direction) => document.getElementById('past-events')?.scrollBy({ left: direction * 260, behavior: 'smooth' });
  return (
    <main>
      <section className="hero" id="home" aria-labelledby="hero-title" ref={(element) => sectionRefs.current[0] = element}>
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title">Shri Shirva Bhanushali Mahajan Trust</h1>
            <p>A trusted community institution rooted in heritage, compassion and collective progress. We nurture education, welfare, culture and unity while creating lasting opportunities for every family and generation. Committed to service, upliftment and the preservation of shared values.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#about" onClick={(event) => onAnchorClick(event, '#about')}>Learn More</a>
              <a className="btn btn-secondary" href="#contact" onClick={(event) => onAnchorClick(event, '#contact')}>Contact Us</a>
            </div>
          </div>
          <div className="hero-card" aria-label="Organization emblem and overview">
            <img className="logo-mark" src={logo} alt="SBM logo" />
            <h3 className="hero-card-text">"Serving the Shirva community with dignity and purpose"</h3>
          </div>
        </div>
      </section>

      <section className="section" id="about" aria-labelledby="about-title" ref={(element) => sectionRefs.current[1] = element}>
        <div className="container">
          <div className={`section-heading reveal ${visibleSections.size ? 'visible' : ''}`} ref={(element) => revealRefs.current[0] = element}>
            <div>
              <span className="eyebrow">About the Mahajan</span>
              <h2 id="about-title">A community built on service, unity and tradition</h2>
            </div>
            <p>We stand as a modern, values-led body that protects cultural roots while empowering members through education, welfare and purposeful celebration.</p>
          </div>
          <div className="info-grid">
            {featureCards.map((card, index) => (
              <article className={`icon-card reveal ${visibleSections.size ? 'visible' : ''}`} key={card.title} data-reveal-id={`about-${index}`} ref={(element) => revealRefs.current[index + 1] = element}>
                <div>{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="history" aria-labelledby="history-title" ref={(element) => sectionRefs.current[2] = element}>
        <div className="container">
          <div className={`section-heading reveal ${visibleSections.size ? 'visible' : ''}`} ref={(element) => revealRefs.current[7] = element}>
            <div>
              <span className="eyebrow">History</span>
              <h2 id="history-title">Our journey of service and stewardship</h2>
            </div>
            <p>From a small collective of families to a respected institution, our path has been shaped by compassion, discipline and continuity.</p>
          </div>
          <div className="timeline" aria-label="History timeline">
            {timelineItems.map((item, index) => (
              <article className={`timeline-item reveal ${visibleTimeline.size ? 'visible' : ''}`} key={item.title} data-timeline-id={`timeline-${index}`} ref={(element) => timelineRefs.current[index] = element}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="mission-title" ref={(element) => sectionRefs.current[3] = element}>
        <div className="container">
          <div className={`section-heading reveal ${visibleSections.size ? 'visible' : ''}`} ref={(element) => revealRefs.current[12] = element}>
            <div>
              <span className="eyebrow">Mission & Vision</span>
              <h2 id="mission-title">Guided by purpose, anchored in values</h2>
            </div>
          </div>
          <div className="mission-vision-grid">
            <article className={`vision-card reveal ${visibleSections.size ? 'visible' : ''}`} ref={(element) => revealRefs.current[13] = element}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 3 4 7v5c0 5 3.2 7.7 8 9 4.8-1.3 8-4 8-9V7l-8-4Z"/><path d="M9 12h6"/><path d="M10.5 9.5 9 12l1.5 2.5"/><path d="M13.5 9.5 15 12l-1.5 2.5"/></svg>
              <h3>Mission</h3>
              <p>To uplift the Shirva Bhanushali community through education, welfare, cultural preservation and compassionate service.</p>
            </article>
            <article className={`vision-card reveal ${visibleSections.size ? 'visible' : ''}`} ref={(element) => revealRefs.current[14] = element}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 20h16"/><path d="M7 20V8"/><path d="M12 20V4"/><path d="M17 20v-6"/></svg>
              <h3>Vision</h3>
              <p>To build a strong, transparent and future-ready community that honours heritage while creating lasting opportunity.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="committee" aria-labelledby="committee-title" ref={(element) => sectionRefs.current[4] = element}>
        <div className="container">
          <div className={`section-heading reveal ${visibleSections.size ? 'visible' : ''}`} ref={(element) => revealRefs.current[15] = element}>
            <div>
              <span className="eyebrow">Committee</span>
              <h2 id="committee-title">Dedicated leaders shaping the community</h2>
            </div>
            <p>Our committee brings together experienced voices, young leaders and devoted volunteers with a shared commitment to integrity and progress.</p>
          </div>
          <div className="committee-grid">
            {committeeMembers.map((member, index) => (
              <article className={`profile-card reveal ${visibleSections.size ? 'visible' : ''}`} key={member.name} ref={(element) => revealRefs.current[16 + index] = element}>
                <div className="avatar">{member.initials}</div>
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p>{member.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="activities" aria-labelledby="activities-title" ref={(element) => sectionRefs.current[5] = element}>
        <div className="container">
          <div className={`section-heading reveal ${visibleSections.size ? 'visible' : ''}`} ref={(element) => revealRefs.current[22] = element}>
            <div>
              <span className="eyebrow">Activities</span>
              <h2 id="activities-title">Programs that uplift lives</h2>
            </div>
            <p>Our work spans welfare, learning, celebration and support, ensuring every initiative is practical and meaningful.</p>
          </div>
          <div className="activities-grid">
            {activities.map((activity, index) => (
              <article className={`activity-card reveal ${visibleSections.size ? 'visible' : ''}`} key={activity.title} ref={(element) => revealRefs.current[23 + index] = element}>
                <div className="icon">{activity.icon}</div>
                <h3>{activity.title}</h3>
                <p>{activity.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>


      <section className="section" id="events" aria-labelledby="events-title" ref={(element) => sectionRefs.current[7] = element}>
        <div className="container">
          <div className={`section-heading reveal ${visibleSections.size ? 'visible' : ''}`} ref={(element) => revealRefs.current[38] = element}>
            <div>
              <span className="eyebrow">Events</span>
              <h2 id="events-title">Upcoming gatherings and cherished memories</h2>
            </div>
            <p>We host meaningful events that invite participation, fellowship and civic pride.</p>
          </div>
          <div className="event-layout">
            <article className={`event-card reveal ${visibleSections.size ? 'visible' : ''}`} ref={(element) => revealRefs.current[39] = element}>
              <div className="event-meta">
                <span className="event-pill">14 July 2026</span>
                <span className="event-pill">Shirva Community Hall</span>
              </div>
              <h3>Annual Community Meet</h3>
              <p>Join us for a day of dialogue, cultural programs and shared planning for the year ahead.</p>
              <div className="hero-actions">
                <button className="btn btn-primary" type="button" disabled>Register</button>
              </div>
            </article>
            <div className={`event-card reveal ${visibleSections.size ? 'visible' : ''}`} ref={(element) => revealRefs.current[40] = element}>
              <h3>Past events</h3>
              <div className="past-events" id="past-events" aria-label="Past events carousel">
                <article className="event-card past-event-card">
                  <div className="event-meta"><span className="event-pill">March 2026</span></div>
                  <h4>Scholarship Distribution</h4>
                  <p>Recognizing students and supporting their next academic step.</p>
                </article>
                <article className="event-card past-event-card">
                  <div className="event-meta"><span className="event-pill">January 2026</span></div>
                  <h4>Medical Camp</h4>
                  <p>Free screenings and awareness sessions for the community.</p>
                </article>
                <article className="event-card past-event-card">
                  <div className="event-meta"><span className="event-pill">November 2025</span></div>
                  <h4>Heritage Festival</h4>
                  <p>A vibrant celebration of performance, food and cultural pride.</p>
                </article>
              </div>
              <div className="carousel-controls">
                <button type="button" aria-label="Show previous events" onClick={() => handlePastEventScroll(-1)}>â†</button>
                <button type="button" aria-label="Show next events" onClick={() => handlePastEventScroll(1)}>â†’</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="gallery" aria-labelledby="gallery-title" ref={(element) => sectionRefs.current[8] = element}>
        <div className="container">
          <div className={`section-heading reveal ${visibleSections.size ? 'visible' : ''}`} ref={(element) => revealRefs.current[41] = element}>
            <div>
              <span className="eyebrow">Gallery</span>
              <h2 id="gallery-title">Moments of togetherness</h2>
            </div>
            <p>Images from gatherings, service work and cultural celebrations that reflect our spirit.</p>
          </div>
          <div className="gallery-grid" aria-label="Community gallery">
            {galleryItems.map((item, index) => (
              <button className={`gallery-item reveal ${visibleSections.size ? 'visible' : ''}`} type="button" aria-label={`Open image ${index + 1}`} key={item.caption} onClick={() => openLightbox(index)} ref={(element) => revealRefs.current[42 + index] = element}>
                <img src={item.thumb} alt={item.alt} loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="announcements" aria-labelledby="announcements-title" ref={(element) => sectionRefs.current[9] = element}>
        <div className="container">
          <div className={`section-heading reveal ${visibleSections.size ? 'visible' : ''}`} ref={(element) => revealRefs.current[48] = element}>
            <div>
              <span className="eyebrow">Announcements</span>
              <h2 id="announcements-title">Latest updates and notices</h2>
            </div>
          </div>
          <div className="news-grid">
            {announcements.map((item, index) => (
              <article className={`news-card reveal ${visibleSections.size ? 'visible' : ''}`} key={item.title} ref={(element) => revealRefs.current[49 + index] = element}>
                <div className="event-pill">{item.date}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a className="btn btn-muted" href={item.link} onClick={(event) => onAnchorClick(event, item.link)}>Read More</a>
              </article>
            ))}
          </div>
        </div>
      </section>


      <section className="section" id="donation" aria-labelledby="donation-title" ref={(element) => sectionRefs.current[11] = element}>
        <div className="container">
          <div className={`section-heading reveal ${visibleSections.size ? 'visible' : ''}`} ref={(element) => revealRefs.current[58] = element}>
            <div>
              <span className="eyebrow">Donation</span>
              <h2 id="donation-title">Support the next chapter of service</h2>
            </div>
            <p>Your contribution helps sustain scholarships, welfare outreach, community events and compassionate support programs.</p>
          </div>
          <div className="donation-shell">
            <article className={`qr-card reveal ${visibleSections.size ? 'visible' : ''}`} aria-label="Donation options" ref={(element) => revealRefs.current[59] = element}>
              <div className="qr-placeholder">UPI QR</div>
              <h3>Scan and contribute</h3>
              <p>UPI ID: <strong>sbmahajan@upi</strong></p>
            </article>
            <article className={`donation-card reveal ${visibleSections.size ? 'visible' : ''}`} ref={(element) => revealRefs.current[60] = element}>
              <h3>Bank details</h3>
              <p><strong>Bank:</strong> Community Trust Bank</p>
              <p><strong>Account Name:</strong> Shri Shirva Bhanushali Mahajan</p>
              <p><strong>Account Number:</strong> 123456789012</p>
              <p><strong>IFSC:</strong> CTBL0001234</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#contact" onClick={(event) => onAnchorClick(event, '#contact')}>Donate Now</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="contact" aria-labelledby="contact-title" ref={(element) => sectionRefs.current[12] = element}>
        <div className="container">
          <div className={`section-heading reveal ${visibleSections.size ? 'visible' : ''}`} ref={(element) => revealRefs.current[61] = element}>
            <div>
              <span className="eyebrow">Contact</span>
              <h2 id="contact-title">Reach the Mahajan office</h2>
            </div>
            <p>We welcome inquiries, collaborations and support from members and well-wishers.</p>
          </div>
          <div className="contact-shell">
            <article className={`contact-card reveal ${visibleSections.size ? 'visible' : ''}`} ref={(element) => revealRefs.current[62] = element}>
              <h3>Office details</h3>
              <p><strong>Address:</strong> Office No. 1, Amrut Tower, Sarojini Naidu Road, Tambe Nagar, Mulund West, Mumbai, Maharashtra 400080</p>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Email:</strong> contact@shirvamahajan.org</p>
              <p><strong>Office Hours:</strong> Monday to Saturday, 9:30 AM to 6:30 PM</p>
            </article>
            <div className={`contact-card reveal ${visibleSections.size ? 'visible' : ''}`} ref={(element) => revealRefs.current[63] = element}>
              <iframe className="map-frame" title="Location map for Shri Shirva Bhanushali Mahajan" loading="lazy" src="https://www.google.com/maps?q=19.1772052,72.9551395&z=17&output=embed"></iframe>
            </div>
          </div>
        </div>
      </section>

      {isLightboxOpen && <Lightbox galleryItems={galleryItems} galleryIndex={galleryIndex} onClose={() => setIsLightboxOpen(false)} onPrevious={() => setGalleryIndex((value) => (value - 1 + galleryItems.length) % galleryItems.length)} onNext={() => setGalleryIndex((value) => (value + 1) % galleryItems.length)} />}
    </main>
  );
}

export default Home;

