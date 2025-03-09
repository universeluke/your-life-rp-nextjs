import React from "react";
import "./Footer.css"; // Import the CSS file for styling
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="background-overlay"></div>
      <div className="footer-container">
        <div className="footer-content">
          <div>
            <Link href="/">
              <Image
                width={500}
                height={500}
                alt={"footerlogo"}
                className="footer-logo"
                src="/LS_LOGO.png"
              ></Image>
            </Link>
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
