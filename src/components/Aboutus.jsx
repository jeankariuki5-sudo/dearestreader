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

                        <p>There is a specific kind of magic that happens when you open a book. It's the quiet click of the world fading away and the sudden, vivid rush of stepping into someone else's skin, someone else's era, or someone else's heart.When we built this corner of the internet, we didn't want to create just another "book site." We wanted to build a sanctuary for the curious.In a world that moves too fast and speaks too loudly, we believe in the power of the written word to slow things down. You are not just a "user" visiting a URL; you are a fellow reader. Whether you are here seeking an escape, a hard-to-find truth, or simply your next favorite story, you are the heartbeat of this library.Every recommendation we make and every shelf we curate is a conversation started with you in mind. Thank you for letting us be a part of your reading journey.</p>

                        <p><i>With literary love,</i></p>

                        <h5>The Dearest Reader Team.</h5>


                    </div>

                    <br /> <hr /> <br />

                    <section className='row'>
                        <div className="col-md-1"></div>
                        <div className="col-md-5 card shadow p-2 brown text-start vintage-card">
                        </div>
                        <div className="col-md-1"></div>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Aboutus;