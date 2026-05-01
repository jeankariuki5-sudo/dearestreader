import React, { useEffect } from 'react';
import '../css/Aboutus.css';
import Footer from './Footer';

const Aboutus = () => {

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add('revealed');
            }),
            { threshold: 0.12 }
        );
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="about-page">

            {/* Vintage paper SVG filter */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <filter id="rough-paper">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
                </filter>
            </svg>

            {/* ── HERO ─────────────────────────────────────────── */}
            <section className="about-hero">
                <div className="hero-ink-blot" aria-hidden="true" />
                <div className="hero-ruled-lines" aria-hidden="true">
                    {[...Array(8)].map((_, i) => <span key={i} />)}
                </div>

                <div className="hero-content">
                    <p className="hero-eyebrow">Est. with love &amp; ink</p>
                    <h1 className="hero-title">
                        <span>Dearest</span>
                        <em>Reader</em>
                    </h1>
                    <p className="hero-sub">
                        A sanctuary for the curious. A home for the story-hungry.
                    </p>
                    <div className="hero-divider">
                        <span />&nbsp;
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                        </svg>
                        &nbsp;<span />
                    </div>
                </div>

                <div className="hero-scroll-hint" aria-hidden="true">
                    <span>Scroll</span>
                    <div className="scroll-line" />
                </div>
            </section>

            {/* ── LETTER ───────────────────────────────────────── */}
            <section className="about-letter reveal">
                <div className="letter-paper">
                    <div className="letter-corner tl" /><div className="letter-corner tr" />
                    <div className="letter-corner bl" /><div className="letter-corner br" />

                    <p className="letter-dateline">To our fellow traveler,</p>
                    <p>
                        There is a specific kind of magic that happens when you open a book. It's the quiet click
                        of the world fading away and the sudden, vivid rush of stepping into someone else's skin,
                        someone else's era, or someone else's heart.
                    </p>
                    <p>
                        When we built this corner of the internet, we didn't want to create just another "book
                        site." <strong>We wanted to build a sanctuary for the curious.</strong> In a world that
                        moves too fast and speaks too loudly, we believe in the power of the written word to slow
                        things down.
                    </p>
                    <p>
                        You are not just a "user" visiting a URL — you are a fellow reader. Whether you are here
                        seeking an escape, a hard-to-find truth, or simply your next favourite story, you are
                        the heartbeat of this library. Every recommendation we make and every shelf we curate
                        is a conversation started with you in mind.
                    </p>
                    <p>Thank you for letting us be a part of your reading journey.</p>

                    <div className="letter-sign">
                        <em>With literary love…</em>
                        <strong>The Dearest Reader Team</strong>
                    </div>
                </div>
            </section>

            {/* ── PULL QUOTE ───────────────────────────────────── */}
            <section className="about-pull-quote reveal">
                <div className="pq-mark">"</div>
                <blockquote>
                    A reader lives a thousand lives before he dies.<br />
                    The man who never reads lives only one.
                </blockquote>
                <cite>— George R.R. Martin</cite>
            </section>

            {/* ── NORTH STAR ───────────────────────────────────── */}
            <section className="about-north-star">
                <div className="ns-header reveal">
                    <p className="section-eyebrow">Our North Star</p>
                    <h2>The principles that guide<br /><em>every chapter of our story</em></h2>
                </div>

                <div className="ns-grid">
                    <div className="ns-card reveal">
                        <div className="ns-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/>
                            </svg>
                        </div>
                        <h3>Our Mission</h3>
                        <p>
                            To bridge the gap between lonely hearts and great stories by curating a collection
                            that inspires, challenges, and comforts — one page at a time.
                        </p>
                        <div className="ns-card-bar" />
                    </div>

                    <div className="ns-ornament reveal" aria-hidden="true">✦</div>

                    <div className="ns-card reveal">
                        <div className="ns-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                            </svg>
                        </div>
                        <h3>Our Vision</h3>
                        <p>
                            To foster a global community where every reader feels seen, every story finds its
                            home, and the love of literature is passed down like a well-worn heirloom.
                        </p>
                        <div className="ns-card-bar" />
                    </div>
                </div>
            </section>

            {/* ── STATS ────────────────────────────────────────── */}
            <section className="about-stats reveal">
                {[
                    { value: "500+", label: "Books Curated" },
                    { value: "5",    label: "Free Daily Downloads" },
                    { value: "∞",    label: "Stories to Discover" },
                    { value: "1",    label: "Passionate Team" },
                ].map((s, i) => (
                    <div className="stat-item" key={i}>
                        <span className="stat-value">{s.value}</span>
                        <span className="stat-label">{s.label}</span>
                    </div>
                ))}
            </section>

            {/* ── FOUNDER ──────────────────────────────────────── */}
            <section className="about-founder reveal">
                <div className="founder-deco" aria-hidden="true" />
                <div className="founder-card">
                    <div className="founder-qmark">"</div>
                    <p className="founder-epigraph">A book is a gift you can open again and again.</p>
                    <p className="founder-epigraph-attr">— Garrison Keillor</p>
                    <hr className="founder-rule" />
                    <h3>A Note From Our Founder</h3>
                    <p>
                        I started <strong>Dearest Reader</strong> because I missed the feeling of a real
                        bookstore — the kind where the shelves feel alive and the recommendations come from
                        a place of genuine passion, not a computer algorithm.
                    </p>
                    <p>
                        My journey with literature started with Nora Roberts' <em>Bed of Roses</em> and it
                        hasn't stopped since. I wanted to create a digital home for those of us who still get
                        goosebumps from a perfect opening sentence and who believe that the right story at
                        the right time can change a life.
                    </p>
                    <p>
                        When you're here, you're not just a visitor — you're a guest in my personal library.
                        I'm so glad you've decided to stay a while.
                    </p>
                    <div className="founder-sig">
                        <div className="founder-avatar">JK</div>
                        <div className="founder-sig-text">
                            <strong>Jean Kariuki</strong>
                            <em>Founder &amp; Fellow Bibliophile</em>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────── */}
            <section className="about-cta reveal">
                <p className="section-eyebrow">The shelves are waiting</p>
                <h2>Find your next favourite story</h2>
                <a href="/" className="cta-btn">Browse the Library</a>
            </section>

            <Footer />
        </div>
    );
};

export default Aboutus;
