import axios from 'axios';
import type { NextAuthOptions } from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        try {
          if (credentials.mode === 'update') {
            return {
              accessToken: credentials.accessToken,
              refreshToken: credentials.refreshToken,
            };
          }

          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/sign-in`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          const user = res.data?.user;
          const accessToken = res.data?.access_token;
          const refreshToken = res.data?.refresh_token;
          const verificationToken = res.data?.verification_token;

          if (user && accessToken) {
            return {
              ...user,
              accessToken,
              refreshToken,
            };
          }

          if (verificationToken) {
            return {
              verificationToken,
            };
          }

          return null;
        } catch (error: any) {
          const message = error?.response?.data?.message || error?.message || 'Something went wrong';
          throw new Error(message);
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'credentials') {
        if (!user) return false;

        if ((user as any).verificationToken) {
          return `${process.env.NEXTAUTH_URL}verify-email?token=${(user as any).verificationToken}`;
        }

        return true; // ✅ allow login
      }

      return true;
    },

    async jwt({ token, account, profile, session, trigger, user }) {
      if (trigger === 'update' && session) {
        if (session.accessToken) {
          token.accessToken = session.accessToken;
        }
        if (session.refreshToken) {
          token.refreshToken = session.refreshToken;
        }
        if (session.userData) {
          // @ts-ignore
          token.userData = { ...token.userData, ...session.userData };
        }
        return token;
      }

      // @ts-ignore
      if (user?.verificationToken) {
        // @ts-ignore
        token.verificationToken = user.verificationToken;
      }

      // @ts-ignore
      if (user?.accessToken) {
        // @ts-ignore
        token.accessToken = user.accessToken;
        // @ts-ignore
        token.refreshToken = user.refreshToken;
        token.userData = user;
        return token;
      }

      if (account && profile) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/sign-social`, {
            email: profile.email,
            social_id: account.providerAccountId,
          });

          token = {
            accessToken: response?.data.data.accessToken,
            refreshToken: response?.data.data.refreshToken,
            userData: {
              ...response?.data.data.user,
              avatar: token.picture,
              role: response?.data.data.user.role || 'user',
            },
          };
        } catch (error: any) {
          console.error('Error syncing with backend:', error.response.data.message);
          token.error = error.response.data.message;
          return token;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...token,
      };
      return session;
    },
  },
  cookies: {
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true,
      },
    },
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true,
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/sign-in',
  },
};
