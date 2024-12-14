import { prisma } from '@/prisma/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { compare } from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: !!process.env.AUTH_DEBUG,
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials: Partial<Record<'username' | 'password', unknown>>) => {
        if (!credentials?.username || !credentials.password) {
          return null
        }

        const username: string = String(credentials.username)

        const user = await prisma.user.findUnique({
          where: {
            username: username.toLowerCase()
          }
        })

        if (!user || !(await compare(credentials.password as string, user.password))) {
          throw new Error('User or password not match.')
        }

        return { id: user.id, username: user.username, email: user.email }
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET || 'no-setup',
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 2
  },
  cookies: {
    sessionToken: {
      name: process.env.COOKIE_NAME
    }
  },
  jwt: {
    maxAge: 60 * 60 * 2
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.id as string
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout'
  }
})

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   // debug: !!process.env.AUTH_DEBUG,
//   theme: { logo: 'https://authjs.dev/img/logo-sm.png' },
//   adapter: PrismaAdapter(prisma),
//   secret: process.env.NEXTAUTH_SECRET,
//   providers: [
//     Passkey({
//       formFields: {
//         email: {
//           label: 'Username',
//           required: true,
//           autocomplete: 'username webauthn'
//         }
//       }
//     }),
//     Credentials({
//       credentials: {
//         username: { label: 'Username', type: 'text' },
//         password: { label: 'Password', type: 'password' }
//       },
//       authorize: async (credentials: Partial<Record<'username' | 'password', unknown>>) => {
//         if (!credentials?.username || !credentials.password) {
//           return null
//         }

//         const user = await prisma.user.findUnique({
//           where: {
//             username: credentials.username as string
//           }
//         })

//         if (!user || !(await compare(credentials.password as string, user.password))) {
//           throw new Error('User or password not match.')
//         }

//         return { id: user.id, username: user.username, email: user.email }
//       }
//     })
//   ],
//   // basePath: '/auth',
//   session: {
//     strategy: 'jwt',
//     maxAge: 60 * 60 * 2
//   },
//   cookies: {
//     sessionToken: {
//       name: process.env.COOKIE_NAME
//     }
//   },
//   jwt: {
//     maxAge: 60 * 60 * 2
//   },
//   // callbacks: {
//   //   // authorized({ request, auth }) {
//   //   //   const { pathname } = request.nextUrl
//   //   //   if (pathname === '/middleware-example') return !!auth
//   //   //   return true
//   //   // },
//   //   jwt({ token, trigger, session, account }) {
//   //     if (trigger === 'update') token.name = session.user.name

//   //     return token
//   //   },
//   //   async session({ session, token }) {
//   //     if (token?.accessToken) session.accessToken = token.accessToken

//   //     return session
//   //   }
//   // },
//   callbacks: {
//     async session({ session, token, user }) {
//       session.user.id = token.id as string
//       return session
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//       }
//       return token
//     }
//   },
//   experimental: { enableWebAuthn: true },
//   pages: {
//     signIn: '/auth/signin',
//     signOut: '/auth/signout'
//   }
// })

// declare module 'next-auth' {
//   interface Session {
//     accessToken?: string
//   }
// }

// declare module 'next-auth/jwt' {
//   interface JWT {
//     accessToken?: string
//   }
// }
