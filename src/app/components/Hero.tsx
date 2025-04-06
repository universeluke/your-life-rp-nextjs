"use client";

import React, { useEffect, useRef } from "react";
import "./Hero.css";
import Image from "next/image";

const Hero: React.FC = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current && foregroundRef.current) {
        const scrollY = window.scrollY;
        // background moves slower
        backgroundRef.current.style.transform = `translateY(${
          scrollY * 0.5
        }px)`;
        // foreground moves faster for more depth
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
        <Image
          src="/parallax2.png"
          alt="Hills Foreground"
          width={1920}
          height={1080}
        />
      </div>
      <div className="hero-content">
        <h1 className="hero-title">Welcome.</h1>
        <p className="hero-subtitle">
          Experience the most intense GTA FiveM roleplay server
        </p>
        <a href="https://discord.com/invite/yourliferp" className="cta-button">
          Start your new life
        </a>
      </div>
    </section>
  );
};

export default Hero;
