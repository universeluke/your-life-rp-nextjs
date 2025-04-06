"use client";

import { useState, useEffect } from "react";
import "./Carousel.css";
import {
  Landmark,
  PersonStanding,
  Car,
  User,
  SquareChartGantt,
} from "lucide-react";
import Image from "next/image";

interface Card {
  src: string;
  title: string;
  description: string;
  img: string;
  icon: string;
}

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Add the debounce utility function with proper typing
  const debounce = <T extends (...args: unknown[]) => void>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: Parameters<T>) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  useEffect(() => {
    const handleScroll = debounce(() => {
      setScrollY(window.scrollY);
    }, 10);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cards: Card[] = [
    {
      src: "/output.jpg",
      title: "Make your millions",
      description: "And create a custom garage from a wide range of cars",
      img: "/femalechar.png",
      icon: "Car",
    },
    {
      src: "/background2.png",
      title: "Huge library of custom scripts",
      description: "Explore, and experience FiveM like never before",
      img: "/malechar.png",
      icon: "SquareChartGantt",
    },
    {
      src: "/background3.png",
      title: "Civilian jobs",
      description: "Choose from our huge variety of job scripts",
      img: "/malechar2.png",
      icon: "User",
    },
    {
      src: "/background4.png",
      title: "Orchestrate and engage in daring heists",
      description: "Show the PD who's boss",
      img: "/malechar3.png",
      icon: "Landmark",
    },
    {
      src: "/background1.png",
      title: "Accessibility",
      description:
        "This city is for everyone, and our custom accessibility scripts help make this possible",
      img: "/hazmatchar.png",
      icon: "PersonStanding",
    },
  ];

  const rotateCarousel = (direction: number) => {
    if (isAnimating) return;

    setIsAnimating(true);

    if (direction < 0) {
      setActiveIndex((prevIndex) =>
        prevIndex === 0 ? cards.length - 1 : prevIndex - 1
      );
    } else {
      setActiveIndex((prevIndex) =>
        prevIndex === cards.length - 1 ? 0 : prevIndex + 1
      );
    }

    setTimeout(() => {
      requestAnimationFrame(() => {
        setIsAnimating(false);
      });
    }, 600);
  };

  const calculateCardPosition = (index: number) => {
    let adjustedIndex = index - activeIndex;

    // normalize the adjusted index to be within -2 to +2 range
    if (adjustedIndex < -2) {
      adjustedIndex += cards.length;
    } else if (adjustedIndex > 2) {
      adjustedIndex -= cards.length;
    }

    const theta = (adjustedIndex * 2 * Math.PI) / cards.length;
    const radius = 360;

    return {
      x: radius * Math.sin(theta),
      z: radius * Math.cos(theta) - radius,
      rotateY: (theta * 180) / Math.PI,
      isActive: adjustedIndex === 0,
    };
  };

  // render the icon because idk how else to do it :))))
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Landmark":
        return <Landmark className="icon-carousel" />;
      case "PersonStanding":
        return <PersonStanding className="icon-carousel" />;
      case "Car":
        return <Car className="icon-carousel" />;
      case "User":
        return <User className="icon-carousel" />;
      case "SquareChartGantt":
        return <SquareChartGantt className="icon-carousel" />;
      default:
        return null;
    }
  };

  const titleTransform = `translateY(${-60 + scrollY * 0.2}px)`;

  return (
    <div id="showcase" className="showcase-container">
      <h1 className="showcase-title" style={{ transform: titleTransform }}>
        SHOWCASE
      </h1>
      <div className="carousel-container">
        <Image
          width={50}
          height={50}
          src="/chevronleft.png"
          className="nav-button nav-left"
          onClick={() => rotateCarousel(-1)}
          alt="Previous"
        />

        <div
          className="carousel-stage"
          style={{ transform: "translateY(-240px)" }}
        >
          <div className="carousel-wrapper">
            {cards.map((card, index) => {
              const { x, z, rotateY, isActive } = calculateCardPosition(index);
              const scale = ((z + 360) / 360) * 0.5 + 0.5;

              return (
                <div
                  key={index}
                  className={`carousel-card ${isActive ? "active" : ""}`}
                  style={{
                    transform: `translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg)`,
                    opacity: scale,
                    zIndex: Math.round(scale * 100),
                  }}
                >
                  <div
                    className="card-container"
                    onMouseEnter={() => {
                      if (isActive) {
                        document
                          .querySelector(`.carousel-card.active`)
                          ?.classList.add("hovered");
                      }
                    }}
                    onMouseLeave={() => {
                      document
                        .querySelector(`.carousel-card.active`)
                        ?.classList.remove("hovered");
                    }}
                  >
                    <h3 className={`carousel-text ${isActive ? "active" : ""}`}>
                      {renderIcon(card.icon)}
                      <span>{card.title}</span>
                      <span className="card-description">
                        {card.description}
                      </span>
                    </h3>
                    <div className="card">
                      <Image
                        fill={true}
                        src={card.src}
                        className="card-image"
                        alt={card.title}
                      />
                    </div>
                    {isActive && (
                      <div className="card-overlay">
                        <div className="card-overlay-inside">
                          <Image
                            width={500}
                            height={500}
                            className="card-img"
                            src={card.img}
                            alt={card.title}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Image
          width={500}
          height={500}
          src="/chevronright.png"
          className="nav-button nav-right"
          onClick={() => rotateCarousel(1)}
          alt="Next"
        />
      </div>
    </div>
  );
};

export default Carousel;
