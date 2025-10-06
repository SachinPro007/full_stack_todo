import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "./config/db";
import { cookies } from "next/headers";
import { sessionSignCookie } from "./config/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      const cookieStore = cookies();

      const [[db_user]] = await db.execute(
        "SELECT * FROM auth_users WHERE email = ?;",
        [user?.email],
      );

      if (!db_user) {
        await db.execute(
          "INSERT INTO auth_users (id, user_name, email, image) VALUES (?, ?, ?, ?);",
          [crypto.randomUUID(), user.name, user.email, user.image],
        );
      }

      const [[db_user1]] = await db.execute(
        "SELECT * FROM auth_users WHERE email = ?;",
        [user?.email],
      );
      if (db_user1) {
        await db.execute("INSERT INTO session (id, userID) VALUES (?, ?);", [
          crypto.randomUUID(),
          db_user1.id,
        ]);

        const [[session]] = await db.execute(
          "SELECT * FROM session WHERE userID = ?;",
          [db_user1.id],
        );

        cookieStore.set("userID", sessionSignCookie(session.id), {
          httpOnly: true,
          maxAge: 60 * 60,
        });
      }

      return true;
    },
  },
});
