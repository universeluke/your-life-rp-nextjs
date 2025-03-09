"use client";

import React, { useEffect, useRef, useState } from "react";
import "./ScrollingImageBelt.css";
import Image from "next/image";

interface ImageItem {
  id: number;
  src: string;
  alt: string;
}

const ScrollingImageBelt: React.FC = () => {
  const beltRef = useRef<HTMLDivElement>(null);
  const [beltWidth, setBeltWidth] = useState(0);

  // Your custom images array - replace with your actual image paths
  const images: ImageItem[] = [
    {
      id: 1,
      src: "/LSPD.png",
      alt: "Custom image 1",
    },
    {
      id: 2,
      src: "/ems.png",
      alt: "Custom image 2",
    },
    {
      id: 3,
      src: "/doj.svg",
      alt: "Custom image 3",
    },
    {
      id: 4,
      src: "/LS_LOGO.png",
      alt: "Custom image 4",
    },
    {
      id: 1,
      src: "/LSPD.png",
      alt: "Custom image 1",
    },
    {
      id: 2,
      src: "/ems.png",
      alt: "Custom image 2",
    },
    {
      id: 3,
      src: "/doj.svg",
      alt: "Custom image 3",
    },
    {
      id: 4,
      src: "/LS_LOGO.png",
      alt: "Custom image 4",
    },
    {
      id: 1,
      src: "/LSPD.png",
      alt: "Custom image 1",
    },
    {
      id: 2,
      src: "/ems.png",
      alt: "Custom image 2",
    },
    {
      id: 3,
      src: "/doj.svg",
      alt: "Custom image 3",
    },
    {
      id: 4,
      src: "/LS_LOGO.png",
      alt: "Custom image 4",
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
    const speed = 1; // Pixels per frame (adjust for speed)

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
    <div className="image-belt-container">
      <div className="image-belt-wrapper">
        <div className="grid-lines"></div>
        <div ref={beltRef} className="image-belt">
          {extendedImages.map((image, index) => (
            <div key={`${image.id}-${index}`} className="image-item">
              <Image
                width={500}
                height={500}
                src={image.src}
                alt={image.alt}
                className="belt-image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingImageBelt;
