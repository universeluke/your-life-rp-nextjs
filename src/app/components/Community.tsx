"use client";

import React, { useEffect, useState } from "react";
import {
  MessageSquare,
  ThumbsUp,
  Users,
  Star,
  Calendar,
  Award,
} from "lucide-react";
import "./Community.css";

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface StarProps {
  id: number;
  size: string;
  left: string;
  top: string;
  animationDuration: string;
  animationDelay: string;
}

const stats: StatItem[] = [
  {
    icon: <Users className="icon" />,
    value: "10,000+",
    label: "Active Players",
  },
  {
    icon: <MessageSquare className="icon" />,
    value: "500,000+",
    label: "Forum Posts",
  },
  {
    icon: <ThumbsUp className="icon" />,
    value: "4.9/5",
    label: "Player Rating",
  },
  { icon: <Star className="icon" />, value: "50+", label: "Custom Scripts" },
  {
    icon: <Calendar className="icon" />,
    value: "365",
    label: "Days of Uptime",
  },
  { icon: <Award className="icon" />, value: "#1", label: "Ranked Server" },
];

//claude magic for generating stars
const generateStars = (count: number): StarProps[] => {
  const stars: StarProps[] = [];
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 3 + 1;
    stars.push({
      id: i,
      size: size + "px",
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      animationDuration: Math.random() * 5 + 2 + "s",
      animationDelay: Math.random() * 5 + "s",
    });
  }
  return stars;
};

const Community: React.FC = () => {
  const [stars, setStars] = useState<StarProps[]>([]);

  useEffect(() => {
    setStars(generateStars(50));
  }, []);

  return (
    <section id="community" className="community-section">
      <div className="background-overlay"></div>

      <div className="grid-lines"></div>

      <div className="synthwave-sun"></div>

      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            width: star.size,
            height: star.size,
            left: star.left,
            top: star.top,
            animation: `star-twinkle ${star.animationDuration} infinite ${star.animationDelay}`,
            opacity: Math.random() * 0.7 + 0.3,
          }}
        />
      ))}

      <div className="container">
        <h2 className="community-title">Our Thriving Community</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;
