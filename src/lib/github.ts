import { SITE } from './constants';

interface RepoStats {
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
}

interface Contributor {
  login: string;
  avatarUrl: string;
  profileUrl: string;
  contributions: number;
}

export async function getRepoStats(): Promise<RepoStats> {
  try {
    const res = await fetch(SITE.github.repoApi, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        ...(import.meta.env.GITHUB_TOKEN
          ? { 'Authorization': `Bearer ${import.meta.env.GITHUB_TOKEN}` }
          : {}),
      },
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const data = await res.json();
    return {
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      watchers: data.subscribers_count ?? 0,
      openIssues: data.open_issues_count ?? 0,
    };
  } catch {
    return { stars: 0, forks: 0, watchers: 0, openIssues: 0 };
  }
}

export async function getContributors(): Promise<Contributor[]> {
  try {
    const res = await fetch(
      `${SITE.github.repoApi}/contributors?per_page=100`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          ...(import.meta.env.GITHUB_TOKEN
            ? { 'Authorization': `Bearer ${import.meta.env.GITHUB_TOKEN}` }
            : {}),
        },
      }
    );
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const data = await res.json();
    return data.map((c: Record<string, unknown>) => ({
      login: c.login as string,
      avatarUrl: c.avatar_url as string,
      profileUrl: c.html_url as string,
      contributions: c.contributions as number,
    }));
  } catch {
    return [];
  }
}
