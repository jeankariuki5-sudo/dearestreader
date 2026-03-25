import React from 'react';
import '../css/Aboutus.css';
import Footer from './Footer';

const Aboutus = () => {
    return (
        <div>
            {/* The SVG Filter definition - it won't be visible on screen */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <filter id="rough-paper">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
                </filter>
            </svg>

            <div className="all">
                <div className='row justify-content-center'>
                    <h1 className="text-light bg-success vintage-title">ABOUT US</h1>

                    {/* Added 'vintage-card' class here */}
                    <div className="col-md-8 card shadow p-4 brown text-start vintage-card">
                        <h2 className='text-center'>About Dearest Reader</h2>
                        <h5>To our fellow traveler,</h5>

                        <p>There is a specific kind of magic that happens when you open a book. It's the quiet click of the world fading away and the sudden, vivid rush of stepping into someone else's skin, someone else's era, or someone else's heart.When we built this corner of the internet, we didn't want to create just another "book site." We wanted to build a sanctuary for the curious.In a world that moves too fast and speaks too loudly, we believe in the power of the written word to slow things down. You are not just a "user" visiting a URL; you are a fellow reader. Whether you are here seeking an escape, a hard-to-find truth or simply your next favorite story, you are the heartbeat of this library.Every recommendation we make and every shelf we curate is a conversation started with you in mind. Thank you for letting us be a part of your reading journey.</p>

                        <p><i>With literary love,</i></p>

                        <h5>The Dearest Reader Team.</h5>


                    </div>

                    <br /> <hr /> <br />

                    <h2 className="bg-success text-center text-light">Our North Star</h2>
                    <h3 className="bg-success text-center text-light"><i>The principles that guide every chapter of our story</i></h3>

                    <section className='row'>
                        <div className="col-md-1"></div>
                        <div className="col-md-4 card shadow p-2 brown">
                            <h4>Our Mission</h4>
                            <h6>To bridge the gap between lonely hearts and great stories by curating a collection that inspires, challenges and comforts.</h6>
                        </div>

                        <div className="col-md-2"></div>

                        <div className="col-md-4 card shadow p-2 brown">
                            <h4>Our Vision</h4>
                            <h6>To foster a global community where every reader feels seen, every story finds its home, and the love of literature is passed down like a well-worn heirloom.</h6>
                        </div>
                        <div className="col-md-1"></div>
                    </section>
                    <br /> <br /> <hr />

                     <div className="col-md-8 card shadow p-4 brown text-start vintage-card">
                        <h2>A note From Our Founder</h2>
                        <h4>"A book is a gift you can open again and again." — Garrison Keillor</h4>
                        <p>I started <b>Dearest Reader</b> because I missed the feeling of a real bookstore—the kind where the shelves feel alive and the recommendations come from a place of genuine passion, not a computer algorithm.My journey with literature started with Nora Roberts' <i>Bed of Roses</i> and it hasn't stopped since. I wanted to create a digital home for those of us who still get goosebumps from a perfect opening sentence and who believe that the right story at the right time can change a life.</p>
                        <p>When you're here, you're not just a visitor, you're a guest in my personal library. I'm so glad you've decided to stay a while.</p>
                        <h5>Jean Kariuki</h5>
                        <h6><i>Founder & Fellow Bibliophile</i></h6>
                     </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Aboutus;