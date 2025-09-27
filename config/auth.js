import { createHmac } from "crypto"
import { cookies } from "next/headers"

export function useridSignCookie(sessionID) {
  const signature = createHmac("sha256", process.env.COOKIE_SECRET).update(sessionID).digest("hex")

  return `${sessionID}.${signature}`
}


export async function verifyCookie (){
  const cookiesStore = await cookies()
  const [sessionID, cookieSignature] = cookiesStore.get("userID")?.value.split(".") || []
  

  if(!sessionID){
    return Response.json({error: "Please Login First...!"}, {status: 401})
  }

  const signature = useridSignCookie(sessionID).split(".")[1]

  if(signature !== cookieSignature){
    return Response.json({error: "Something Went wrong...!"}, {status: 401})
  }

  return sessionID
}