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

  // Your custom images array - replace with your actual image paths
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

  // Duplicate the images to ensure we have enough for continuous scrolling
  const extendedImages = [...images, ...images, ...images];

  useEffect(() => {
    const belt = beltRef.current;
    if (!belt || belt.children.length === 0) return;

    // Calculate the total width of items in the belt
    let totalWidth = 0;
    const items = Array.from(belt.children) as HTMLElement[];

    // Wait for images to load to get accurate width measurements
    const calculateWidths = () => {
      totalWidth = 0;
      items.forEach((item) => {
        totalWidth += item.offsetWidth + 16; // 16px is the gap (1rem)
      });

      setBeltWidth(totalWidth / 3); // Divide by 3 because we've tripled the images
    };

    // Initial calculation
    calculateWidths();

    // Recalculate when window resizes
    window.addEventListener("resize", calculateWidths);

    // Allow a moment for images to load
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
    const speed = 0.5; // Pixels per frame (adjust for speed)

    const scroll = () => {
      position -= speed;

      // When we've scrolled one full set of images, reset to beginning
      // This creates the infinite loop effect without any jumps
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
