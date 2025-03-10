"use client";

import React, { useState, useEffect } from "react";
import "./Header.css";
import Image from "next/image";
import Link from "next/link";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const leftNavItems = ["FEATURES", "SHOWCASE"];
  const rightNavItems = ["COMMUNITY", "CONNECT"];

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <nav>
          <ul className="nav-list left">
            {leftNavItems.map((item) => (
              <li key={item} className="nav-item">
                <a
                  href={item == "FEATURES" ? "#features" : "#showcase"}
                  className="nav-link"
                >
                  {item}
                  <span className="underline"></span>
                </a>
              </li>
            ))}
          </ul>

          <Link href="/" className="logo">
            <Image
              src="/LS_LOGO.png"
              alt="Your Life RP Logo"
              width={150}
              height={150}
            />
          </Link>

          <ul className="nav-list right">
            {rightNavItems.map((item) => (
              <li key={item} className="nav-item">
                <a
                  href={
                    item == "COMMUNITY"
                      ? "#community"
                      : "https://discord.com/invite/yourliferp"
                  }
                  className="nav-link"
                >
                  {item}
                  <span className="underline"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
