import { createHmac } from "crypto"
import { cookies } from "next/headers"
import { db } from "./db"


export async function getLoggedInUser() {
  const sessionID = await verifyCookie()
  if(sessionID instanceof Response){
    return sessionID
  }

  const [[session]] = await db.execute("SELECT * FROM session WHERE id = ?;", [sessionID])

  if(!session){
    return Response.json({error: "Please Login First...!"}, {status: 401})
  }

  const [[user]] = await db.execute("SELECT id, user_name, email FROM users WHERE id = ?;", [session.userID])

  if(!user){
    return Response.json({error: "Please Login First...!"}, {status: 401})
  }

  
  return Response.json(user) 
  
}


export function sessionSignCookie(sessionID) {
  const signature = createHmac("sha256", process.env.COOKIE_SECRET).update(sessionID).digest("hex")

  return `${sessionID}.${signature}`
}


export async function verifyCookie (){
  const cookiesStore = await cookies()
  const [sessionID, cookieSignature] = cookiesStore.get("userID")?.value.split(".") || []
  

  if(!sessionID){
    return Response.json({error: "Please Login First...!"}, {status: 401})
  }

  const signature = sessionSignCookie(sessionID).split(".")[1]

  if(signature !== cookieSignature){
    return Response.json({error: "Something Went wrong...!"}, {status: 401})
  }

  return sessionID
}


export async function deleteCookie(cookie) {
  const cookiesStore = await cookies()
  cookiesStore.delete(cookie)
}