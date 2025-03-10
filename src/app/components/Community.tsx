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

const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
const firstDate = new Date(2025, 2, 20);
const secondDate = new Date();

const uptime = Math.round((Number(secondDate) - Number(firstDate)) / oneDay);
// console.log(`first date is ${firstDate}`);
// console.log(`second date is ${secondDate}`);
// console.log(uptime);

const stats: StatItem[] = [
  {
    icon: <Users className="icon" />,
    value: "20+",
    label: "Active Devs",
  },
  {
    icon: <MessageSquare className="icon" />,
    value: "100+",
    label: "Discord Users",
  },
  {
    icon: <ThumbsUp className="icon" />,
    value: "4.9/5",
    label: "Player Rating",
  },
  { icon: <Star className="icon" />, value: "50+", label: "Custom Scripts" },
  {
    icon: <Calendar className="icon" />,
    value: `${uptime}`,
    label: "Days of Uptime",
  },
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
          <div className="stat-card">
            <div className="stat-icon">
              <Award className="icon" />
            </div>
            <h3 className="stat-value">#1</h3>
            <div className="stat-label">
              Ranked Server
              <div className="stat-card-footer">in our hearts</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
