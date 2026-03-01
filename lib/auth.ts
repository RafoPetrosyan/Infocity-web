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
      async authorize(credentials) {
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/sign-in`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          const user = res.data?.data?.user;
          const accessToken = res.data?.data?.accessToken;

          if (user && accessToken) {
            return {
              ...user,
              accessToken,
            };
          }

          return null;
        } catch (error) {
          // @ts-ignore
          const message = error?.response?.data?.message || error?.message || 'Something went wrong';
          throw new Error(message);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile, session, trigger, user }) {
      if (trigger === 'update' && session?.userData) {
        // @ts-ignore
        token.userData = { ...token.userData, ...session.userData };
        return token;
      }

      if (trigger === 'update' && session?.accessToken) {
        token.accessToken = session.accessToken;
        return token;
      }

      // @ts-ignore
      if (user?.accessToken) {
        // @ts-ignore
        token.accessToken = user.accessToken;
        token.userData = user;
        return token;
      }

      if (account && profile) {
        token.accessToken = account.access_token;
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/sign-social`, {
            email: profile.email,
            social_id: account.providerAccountId,
          });

          token = {
            accessToken: response?.data.data.accessToken,
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
