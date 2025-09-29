import { db } from "@/config/db"
import { cookies } from "next/headers"
import { sessionSignCookie } from "@/config/auth"
import bcrypt from "bcrypt"


export async function POST(request) {
  const { email, password } = await request.json()
  const cookieStore = await cookies()

  try {
    const [[user]] = await db.execute("SELECT * FROM users WHERE email = ?;", [email])

    if (!user) {
      return Response.json({ error: "Invalid Credentials!" }, { status: 400 })
    }
    
    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return Response.json({ error: "Invalid Credentials!" }, { status: 400 })
    }

    await db.execute("INSERT INTO session (id, userID) VALUES (?, ?);", [crypto.randomUUID(), user.id])
    const [[session]] = await db.execute("SELECT * FROM session WHERE userID = ?;", [user.id])            
    

    cookieStore.set("userID", sessionSignCookie(session.id), { httpOnly: true, maxAge: 60 * 60 })
    return Response.json({ success: "Loggin Success" }, { status: 200 })

  } catch (error) {
    return Response.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}