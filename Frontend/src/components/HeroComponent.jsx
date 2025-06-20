

import React from 'react';

function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function HeroComponent() {
    return (
        <header className="hero">
            <div className="hero-content">
                <h1>ARE YOU<br />RUN-READY?</h1>
                <p className="hero-subtitle">
                    Join the ultimate running tournaments and compete with athletes from around the world.
                    Push your limits, break your records, and become a champion.
                </p>
                <button className="cta-button" onClick={() => scrollToSection('tournaments')}>REGISTER NOW</button>
            </div>
        </header>
    );
}

export default HeroComponent;
