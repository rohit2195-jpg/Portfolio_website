// Live "about this build" facts pulled from the public GitHub REST API.
// No auth (60 req/hr/IP is plenty for a portfolio); results are cached in
// sessionStorage so repeat visits in a session don't re-hit the API. Every
// field degrades gracefully to null so the UI can show "—".

const OWNER = "rohit2195-jpg";
const REPO = "Portfolio_website";
const API = `https://api.github.com/repos/${OWNER}/${REPO}`;
const CACHE_KEY = "metro:githubFacts";

export const REPO_URL = `https://github.com/${OWNER}/${REPO}`;

// Pull the total commit count out of the Link header of a per_page=1 request:
//   <...&page=413>; rel="last"
function commitCountFromLink(linkHeader) {
  if (!linkHeader) return null;
  const match = linkHeader.match(/[?&]page=(\d+)>;\s*rel="last"/);
  return match ? Number(match[1]) : null;
}

export async function fetchRepoFacts() {
  if (typeof window !== "undefined") {
    const cached = window.sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        /* fall through and refetch */
      }
    }
  }

  const facts = {
    stars: null,
    forks: null,
    language: null,
    updated: null,
    commits: null,
  };

  try {
    const [repoRes, commitsRes] = await Promise.all([
      fetch(API),
      fetch(`${API}/commits?per_page=1`),
    ]);

    if (repoRes.ok) {
      const repo = await repoRes.json();
      facts.stars = repo.stargazers_count ?? null;
      facts.forks = repo.forks_count ?? null;
      facts.language = repo.language ?? null;
      facts.updated = repo.pushed_at ?? null;
    }

    if (commitsRes.ok) {
      facts.commits = commitCountFromLink(commitsRes.headers.get("Link"));
      // Single-page repo (no Link header) → exactly the commits returned.
      if (facts.commits === null) {
        const commits = await commitsRes.json();
        if (Array.isArray(commits)) facts.commits = commits.length;
      }
    }
  } catch {
    // Offline / rate-limited / blocked — return whatever we have (likely nulls).
    return facts;
  }

  if (typeof window !== "undefined") {
    try {
      window.sessionStorage.setItem(CACHE_KEY, JSON.stringify(facts));
    } catch {
      /* sessionStorage may be unavailable; ignore */
    }
  }

  return facts;
}

// "3 days ago" style relative time from an ISO timestamp.
export function relativeTime(iso) {
  if (!iso) return null;
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return null;
  const secs = Math.round((Date.now() - then) / 1000);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, secsPer] of units) {
    if (Math.abs(secs) >= secsPer || unit === "minute") {
      return rtf.format(-Math.round(secs / secsPer), unit);
    }
  }
  return "just now";
}
