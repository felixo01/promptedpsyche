import { execSync } from 'node:child_process';

const SHORT_HASH_LENGTH = 7;
const GIT_HASH_PATTERN = /^[0-9a-f]{7,40}$/i;

function normalizeGitHash(value: string | undefined) {
  const hash = value?.trim();

  if (!hash || !GIT_HASH_PATTERN.test(hash)) {
    return undefined;
  }

  return hash.slice(0, SHORT_HASH_LENGTH).toLowerCase();
}

function readLocalGitHash() {
  try {
    return normalizeGitHash(
      execSync('git rev-parse HEAD', {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore']
      })
    );
  } catch {
    return undefined;
  }
}

export const siteVersion =
  normalizeGitHash(process.env.VERCEL_GIT_COMMIT_SHA) ??
  normalizeGitHash(process.env.GITHUB_SHA) ??
  readLocalGitHash() ??
  'local';
