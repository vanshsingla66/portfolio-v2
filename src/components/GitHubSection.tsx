import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiStar, FiGitBranch, FiArrowUpRight } from "react-icons/fi";
import Reveal from "./ui/Reveal";
import { profile } from "../data/profile";
import "./styles/GitHub.css";

interface Repo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
}

// Shown if the GitHub API is unreachable or rate-limited.
const fallbackRepos: Repo[] = [
  {
    name: "Chatify",
    description: "Realtime language exchange platform — chat + video.",
    html_url: profile.github,
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
  },
  {
    name: "ProtoStack",
    description: "AI-powered personalized learning platform.",
    html_url: profile.github,
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
  },
  {
    name: "knowledge-gap-detection",
    description: "ML classifier for topic-level weakness detection.",
    html_url: profile.github,
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
  },
];

const langColor: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
};

const GitHubSection = () => {
  const [repos, setRepos] = useState<Repo[]>(fallbackRepos);

  useEffect(() => {
    const controller = new AbortController();
    fetch(
      `https://api.github.com/users/${profile.githubUser}/repos?sort=updated&per_page=100`,
      { signal: controller.signal }
    )
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: Repo[]) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const top = data
          .filter((r) => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6);
        if (top.length) setRepos(top);
      })
      .catch(() => {
        /* keep fallback */
      });
    return () => controller.abort();
  }, []);

  return (
    <section className="section gh" id="github">
      <Reveal>
        <span className="eyebrow">Open Source</span>
        <h2 className="section-title">
          Building in <span className="gradient-text">public</span>
        </h2>
        <p className="section-lead">
          A look at what I'm currently shipping on GitHub.
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="gh__banner glass">
          <div className="gh__profile">
            <span className="gh__avatar">
              <FiGithub />
            </span>
            <div>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="gh__handle"
              >
                @{profile.githubUser} <FiArrowUpRight />
              </a>
              <span className="gh__profile-sub">Open source & experiments</span>
            </div>
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <FiGithub /> Follow on GitHub
          </a>
        </div>
      </Reveal>

      <div className="gh__repos">
        {repos.map((repo, i) => (
          <Reveal key={repo.name} delay={i * 0.05}>
            <motion.a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="gh__repo glass"
              whileHover={{ y: -6, borderColor: "rgba(77,124,255,0.4)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="gh__repo-head">
                <FiGitBranch className="gh__repo-icon" />
                <span className="gh__repo-name">{repo.name}</span>
                <FiArrowUpRight className="gh__repo-arrow" />
              </div>
              <p className="gh__repo-desc">
                {repo.description || "No description provided."}
              </p>
              <div className="gh__repo-meta">
                {repo.language && (
                  <span className="gh__lang">
                    <span
                      className="gh__lang-dot"
                      style={{
                        background: langColor[repo.language] || "#8b8b8b",
                      }}
                    />
                    {repo.language}
                  </span>
                )}
                <span className="gh__stat">
                  <FiStar /> {repo.stargazers_count}
                </span>
                <span className="gh__stat">
                  <FiGitBranch /> {repo.forks_count}
                </span>
              </div>
            </motion.a>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default GitHubSection;
