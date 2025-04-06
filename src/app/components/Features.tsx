"use client";

import { useEffect, useRef, useState } from "react";
import { Shield, Users, Briefcase, Map, Zap, Crosshair } from "lucide-react";
import "./Features.css";
// import dynamic from "next/dynamic";

// might comment this out for now? the JoinNow component isn't used at all, and this import is stopping deployment
// const JoinNow = dynamic(() => import('./JoinNow'), {
//   loading: () => <p>Loading...</p>,
//   ssr: false
// });

const features = [
  {
    icon: <Shield className="icon" />,
    title: "Advanced Anti-Cheat",
    description:
      "Our state-of-the-art anti-cheat system ensures a fair and intense experience for all players.",
  },
  {
    icon: <Users className="icon" />,
    title: "Thriving Community",
    description:
      "Join thousands of active players in our dynamic and immersive Los Santos.",
  },
  {
    icon: <Briefcase className="icon" />,
    title: "Diverse Careers",
    description:
      "Choose from a wide array of unique jobs and criminal enterprises to shape your destiny.",
  },
  {
    icon: <Map className="icon" />,
    title: "Expansive Custom Map",
    description:
      "Explore our extensively modified map with new locations, hidden secrets, and intense gameplay areas.",
  },
  {
    icon: <Zap className="icon" />,
    title: "High-Octane Events",
    description:
      "Participate in regular server-wide events, heists, and competitions with epic rewards.",
  },
  {
    icon: <Crosshair className="icon" />,
    title: "Custom Weapons & Vehicles",
    description:
      "Experience unique, custom-made weapons and vehicles exclusive to our server.",
  },
];

const hoverImages = [
  "/trevor.png",
  "/trevortwo.png",
  "/trevorthree.png",
  "/trevorfour.png",
  "/gun.png",
  "/guntwo.png",
  "/michaelfranklin.png",
  "/michaelfranklintwo.png",
  "/michael.png",
  "/franklin.png",
];

const Features = () => {
  const featureCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollY, setScrollY] = useState(0);

  const getRandomRotation = () => {
    const rotation = Math.random() * 2.4 - 1.2;
    return `rotate(${rotation}deg)`;
  };

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * hoverImages.length);
    return hoverImages[randomIndex];
  };

  useEffect(() => {
    featureCardsRef.current.forEach((card) => {
      if (card) {
        const randomImage = getRandomImage();
        card.style.backgroundImage = `url(${randomImage})`;
      }
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const titleTransform = `translateY(${-30 + scrollY * 0.2}px)`;

  return (
    <section id="features" className="features-section">
      <div className="features-container">
        <div className="container">
          <h2 className="features-title" style={{ transform: titleTransform }}>
            SERVER FEATURES
          </h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card"
                ref={(el) => {
                  featureCardsRef.current[index] = el;
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget;
                  const randomImage = getRandomImage();
                  card.style.backgroundImage = `url(${randomImage})`;
                  card.style.transform = `scale(1.05) ${getRandomRotation()}`;
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;

                  const randomImage = getRandomImage();
                  card.style.backgroundImage = `url(${randomImage})`;
                  card.style.transform = "scale(1) rotate(0deg)";
                }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
