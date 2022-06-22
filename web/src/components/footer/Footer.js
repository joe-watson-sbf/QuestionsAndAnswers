import React from 'react';


const Footer = () => {

    const URL = "https://joedev.vakaks.com/";

    return (
        <div className="footer-content">
            <div>
                <h2>
                    Questions & Answers
                </h2>
            </div>

            <div>
                <code>
                    &copy; Copyright {new Date().getFullYear()} {' '}
                    <a target="_blank" rel="noopener noreferrer" href={URL}>
                        {' Joe Watson SBF'}
                    </a>
                </code>
            </div>
        </div>
    )
}

export default Footer
