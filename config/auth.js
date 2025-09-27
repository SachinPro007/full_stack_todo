import { createHmac } from "crypto"
import { cookies } from "next/headers"

export function useridSignCookie(userId) {
  const signature = createHmac("sha256", process.env.COOKIE_SECRET).update(userId).digest("hex")

  return `${userId}.${signature}`
}


export async function verifyCookie (){
  const cookiesStore = await cookies()
  const [userID, cookieSignature] = cookiesStore.get("userID")?.value.split(".") || []

  if(!userID){
    return Response.json({error: "Please Login First...!"}, {status: 401})
  }
  // const signature = createHmac("sha256", process.env.COOKIE_SECRET).update(userID).digest("hex")
  const signature = useridSignCookie(userID).split(".")[1]

  if(signature !== cookieSignature){
    return Response.json({error: "Something Went wrong...!"}, {status: 401})
  }

  return userID
}