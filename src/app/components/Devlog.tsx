"use client";
import { useState, useEffect } from "react";
import "./Devlog.css";
import Image from "next/image";

interface Author {
  name?: string;
  email?: string;
  avatar_url?: string | null;
}

interface Commit {
  sha: string;
  message: string;
  date: string;
  url: string;
  author: Author;
}

interface GitHubCommitLogProps {
  owner?: string;
  repo?: string;
  count?: number;
}

export default function GitHubCommitLog({
  owner = "DanskieTV",
  repo = "Your-LifeRP", // Just the repo name, not the full URL
  count = 5,
}: GitHubCommitLogProps) {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCommits() {
      try {
        console.log(`Fetching commits for ${owner}/${repo}`);
        // The GitHub API endpoint for commits
        const response = await fetch(
          `/api/devlogroute?owner=${owner}&repo=${repo}&count=${count}`
        );

        if (!response.ok) {
          const errorText = await response.text().catch(() => "");
          console.error("API error:", response.status, errorText);
          throw new Error(`Failed to fetch commits: ${response.status}`);
        }

        const data = await response.json();
        setCommits(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setLoading(false);
      }
    }

    fetchCommits();
  }, [owner, repo, count]);

  if (loading) return <div className="synth-commit-loading"></div>;
  if (error) return <div className="synth-commit-error">Error: {error}</div>;

  return (
    <div className="synth-commit-container">
      <h2 className="synth-commit-heading">Recent Development Activity</h2>
      <ul className="synth-commit-list">
        {commits.map((commit) => (
          <li key={commit.sha} className="synth-commit-item">
            <div className="synth-commit-content">
              <div className="synth-commit-avatar-container">
                <Image
                  src="/githublogo.svg"
                  alt={commit.author.name || "Author"}
                  className="synth-commit-avatar"
                  width="500"
                  height="500"
                />
              </div>
              <div className="synth-commit-details">
                <p className="synth-commit-message">{commit.message}</p>
                <div className="synth-commit-meta">
                  <span>{commit.author.name || "Unknown"}</span>
                  <span className="synth-commit-separator">•</span>
                  <time dateTime={commit.date}>
                    {new Date(commit.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
