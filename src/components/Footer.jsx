import React from 'react'
import '../css/Footer.css'

const Footer = () => {
    return (
        <div>
            <footer className="footer">
                <div className="footer-container">

                    {/* Logo / About */}
                    <div className="footer-section">
                        <h2 className="footer-logo">BookStore</h2>
                        <p>Your go-to place for amazing books and great reads.</p>
                    </div>

                    {/* Links */}
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="/">Available Books</a></li>
                            <li><a href="/addbook">Add Book</a></li>
                            <li><a href="/signin">Sign in</a></li>
                            <li><a href="/signup">Sign up</a></li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div className="footer-section">
                        <h3>Follow Us</h3>
                        <div className="social-icons">
                            <a href="#">Facebook</a>
                            <a href="#">Twitter</a>
                            <a href="#">Instagram</a>
                        </div>
                    </div>

                </div>

                {/* Bottom */}
                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} BookStore. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer
