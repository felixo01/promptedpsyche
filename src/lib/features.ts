type PracticeEnvironment = Record<string, string | undefined>;

export function shouldShowPractice(env: PracticeEnvironment = process.env) {
  const vercelEnvironment = env.VERCEL_ENV;
  const isVercelProduction = vercelEnvironment === 'production';
  const isUnidentifiedProduction = !vercelEnvironment && env.NODE_ENV === 'production';

  return (
    env.SHOW_PRACTICE === 'true' &&
    !isVercelProduction &&
    !isUnidentifiedProduction
  );
}

export const showPractice = shouldShowPractice();
