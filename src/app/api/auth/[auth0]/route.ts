// src/app/api/auth/[auth0]/route.ts
import { handleAuth } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

// Note: handleAuth() automatically creates the following routes:
// /api/auth/login: For logging users in.
// /api/auth/logout: For logging users out.
// /api/auth/callback: The callback URL Auth0 will redirect to after authentication.
// /api/auth/me: To get user profile information.

// It's important that this file is named `route.ts` and placed in `src/app/api/auth/[auth0]/`
// for the Next.js App Router to correctly handle dynamic API routes.

export const GET = (req: NextApiRequest, res: NextApiResponse) => {
  return handleAuth()(req, res);
};
