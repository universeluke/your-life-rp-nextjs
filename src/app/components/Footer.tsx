import React from "react";
import "./Footer.css"; // Import the CSS file for styling

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="background-overlay"></div>
      <div className="footer-container">
        <div className="footer-content">
          <div>
            <a href="/">
              <img className="footer-logo" src="/LS_LOGO.png"></img>
            </a>
          </div>
        </div>
        <div className="footer-footer">
          <p className="footer-powered">
            Powered by FiveM and React | Not affiliated with Rockstar Games
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
