
import React from "react";

function NavbarComponent() {
    return (
        <header>
            <nav>
                <a href="#" className="logo">RunTrack</a>
                <ul className="nav-links">
                    <li><a href="#home">HOME</a></li>
                    <li><a href="#tournaments">TOURNAMENTS</a></li>
                    <li><a href="#results">RESULTS</a></li>
                    <li><a href="#contact">CONTACT US</a></li>
                </ul>
                <a href="#signup" className="signup-btn">SIGNUP</a>
            </nav>
        </header>
    );
}
export default NavbarComponent;


