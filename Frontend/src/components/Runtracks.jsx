import React from "react";

function Runtracks(){
    return (
        <section className="features">
            <div className="features-container">
                <h2>Why Choose RunTrack?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🏃‍♂️</div>
                        <h3>Professional Tournaments</h3>
                        <p>Compete in professionally organized running events with certified timing systems and official
                            rankings.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🏆</div>
                        <h3>Championship Prizes</h3>
                        <p>Win exciting prizes, trophies, and recognition for your achievements in various running
                            categories.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Performance Tracking</h3>
                        <p>Track your progress, analyze your performance, and get detailed insights to improve your
                            running.</p>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default Runtracks;
