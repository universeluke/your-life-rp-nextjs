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
  const animationRef = useRef<number | null>(null);
  const [beltWidth, setBeltWidth] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

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
      src: "/ls_logo_background.png",
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
      src: "/ls_logo_background.png",
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
      src: "/ls_logo_background.png",
      alt: "Custom image 4",
    },
  ];

  const extendedImages = [...images, ...images, ...images];

  const startAnimation = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      animate();
    }
  };

  const stopAnimation = () => {
    setIsAnimating(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const animate = () => {
    const belt = beltRef.current;
    if (!belt || !isAnimating || beltWidth === 0) return;

    let position =
      parseFloat(belt.style.transform.replace(/[^\d.-]/g, "")) || 0;
    const speed = 0.5;

    position -= speed;

    if (position <= -beltWidth) {
      position += beltWidth;
    }

    belt.style.transform = `translateX(${position}px)`;
    animationRef.current = requestAnimationFrame(animate);
  };

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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
          } else {
            stopAnimation();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(belt);

    startAnimation();

    return () => {
      window.removeEventListener("resize", calculateWidths);
      observer.disconnect();
      stopAnimation();
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
                loading={index < 4 ? "eager" : "lazy"}
                priority={index < 2}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingImageBelt;
