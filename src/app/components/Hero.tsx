"use client";

import React, { useEffect, useRef } from "react";
import "./Hero.css";

const Hero: React.FC = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current && foregroundRef.current) {
        const scrollY = window.scrollY;
        // Background moves slower
        backgroundRef.current.style.transform = `translateY(${
          scrollY * 0.5
        }px)`;
        // Foreground moves faster for more depth
        foregroundRef.current.style.transform = `translateY(${
          scrollY * 0.3
        }px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="hero-section">
      <div ref={backgroundRef} className="parallax-background"></div>
      <div ref={foregroundRef} className="parallax-foreground">
        <img
          src="/parallax2.png"
          alt="Hills Foreground"
          width={1920} // Set to your image's actual width
          height={1080} // Set to your image's actual height
        />
      </div>
      <div className="hero-content">
        <h1 className="hero-title">Welcome.</h1>
        <p className="hero-subtitle">
          Experience the most intense GTA FiveM roleplay server
        </p>
        <a href="https://discord.gg/kMxqxmfFT6" className="cta-button">
          Start your new life
        </a>
      </div>
    </section>
  );
};

export default Hero;
