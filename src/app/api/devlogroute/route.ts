// app/api/devlogroute/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");
  const count = searchParams.get("count") || 5;

  // Get your GitHub token from environment variables
  const token = process.env.GITHUB_TOKEN;

  if (!owner || !repo) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  // For private repositories, a token is required
  if (!token) {
    return NextResponse.json(
      { error: "GitHub token is required for private repositories" },
      { status: 401 }
    );
  }

  try {
    console.log(`Fetching commits for ${owner}/${repo}`);

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${count}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status}`);
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Format the data to include only what we need
    const commits = data.map((item) => ({
      sha: item.sha,
      message: item.commit.message.split("\n")[0], // Just get the first line of the commit message
      date: item.commit.author.date,
      url: item.html_url,
      author: {
        name: item.commit.author.name,
        email: item.commit.author.email,
        avatar_url: item.author ? item.author.avatar_url : null,
      },
    }));

    return NextResponse.json(commits);
  } catch (error) {
    console.error("Error fetching GitHub commits:", error);
    return NextResponse.json(
      { error: "Failed to fetch commits" },
      { status: 500 }
    );
  }
}
