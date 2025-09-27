import { db } from "@/config/db"
import { cookies } from "next/headers"
import { useridSignCookie } from "@/config/auth"


export async function POST(request) {
  const { email, password } = await request.json()
  const cookieStore = await cookies()

  try {
    const [[user]] = await db.execute("SELECT * FROM users WHERE email = ?;", [email])

    if (!user && user?.password !== password) {
      return Response.json({ error: "Invalid Credentials!" }, { status: 400 })
    }

    cookieStore.set("userID", useridSignCookie(user.id), { httpOnly: true, maxAge: 60 * 60 })
    return Response.json({ success: "Loggin Success" }, { status: 200 })

  } catch (error) {
    return Response.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}