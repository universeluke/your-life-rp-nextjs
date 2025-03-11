"use client";

import React, { useState, useEffect } from "react";
import "./Header.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const leftNavItems = ["FEATURES", "SHOWCASE"];
  const rightNavItems = ["DEV LOG", "CONNECT"];

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <nav>
          <ul className="nav-list left">
            {leftNavItems.map((item) => (
              <li key={item} className="nav-item">
                <Link
                  href={
                    isHomePage
                      ? item === "FEATURES"
                        ? "#features"
                        : "#showcase"
                      : `/${item === "FEATURES" ? "#features" : "#showcase"}`
                  }
                  className="nav-link"
                >
                  {item}
                  <span className="underline"></span>
                </Link>
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
                <Link
                  href={
                    item === "DEV LOG"
                      ? "/devlog"
                      : "https://discord.com/invite/yourliferp"
                  }
                  className="nav-link"
                  target={item === "CONNECT" ? "_blank" : undefined}
                  rel={item === "CONNECT" ? "noopener noreferrer" : undefined}
                >
                  {item}
                  <span className="underline"></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
