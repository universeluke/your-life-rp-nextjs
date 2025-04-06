"use client";

import React, { useEffect, useRef, useState } from "react";
import "./ScrollingTextBelt.css";

interface ImageItem {
  id: number;
  alt: string;
}

const ScrollingTextBelt: React.FC = () => {
  const beltRef = useRef<HTMLDivElement>(null);
  const [beltWidth, setBeltWidth] = useState(0);

  const images: ImageItem[] = [
    {
      id: 1,
      alt: "🚔 LSPD 🚔",
    },
    {
      id: 2,
      alt: "🚑 EMS 🚑",
    },
    {
      id: 3,
      alt: "🔨 DOJ 🔨",
    },
    {
      id: 4,
      alt: "💀 GANGS 💀",
    },
    {
      id: 5,
      alt: "🚗 CARS 🚗",
    },
    {
      id: 6,
      alt: "📃 SCRIPTS 📃",
    },
    {
      id: 7,
      alt: "📗 ROLEPLAY 📘",
    },
    {
      id: 8,
      alt: "🚨 SCENES 🚨",
    },
    {
      id: 9,
      alt: "👷‍♂️ ACTIVE DEV 👷‍♂️",
    },
    {
      id: 10,
      alt: "👨‍👩‍👧‍👦 COMMUNITY 👨‍👩‍👦‍👦",
    },
    {
      id: 11,
      alt: "🐱 PETS 🐶",
    },
    {
      id: 12,
      alt: "👨‍🦯 ACCESSIBILE 🧏",
    },
  ];

  const extendedImages = [...images, ...images, ...images];

  useEffect(() => {
    const belt = beltRef.current;
    if (!belt || belt.children.length === 0) return;

    let totalWidth = 0;
    const items = Array.from(belt.children) as HTMLElement[];

    const calculateWidths = () => {
      totalWidth = 0;
      items.forEach((item) => {
        totalWidth += item.offsetWidth + 16;
      });

      setBeltWidth(totalWidth / 3);
    };

    calculateWidths();

    window.addEventListener("resize", calculateWidths);

    setTimeout(calculateWidths, 500);

    return () => {
      window.removeEventListener("resize", calculateWidths);
    };
  }, []);

  useEffect(() => {
    const belt = beltRef.current;
    if (!belt || beltWidth === 0) return;

    let animationId: number;
    let position = 0;
    const speed = 0.5;

    const scroll = () => {
      position -= speed;

      // reset to beginning
      // creates the infinite loop effect without any jumps
      if (position <= -beltWidth) {
        position += beltWidth;
      }

      belt.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [beltWidth]);

  return (
    <div className="text-belt-container">
      <div className="text-belt-wrapper">
        <div ref={beltRef} className="text-belt">
          {extendedImages.map((image, index) => (
            <div key={`${image.id}-${index}`} className="text-item">
              <p className="belt-text">{image.alt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingTextBelt;
