import { verifyCookie } from "@/config/auth"
import { db } from "@/config/db"
import { cookies } from "next/headers"


export async function GET() {
    
  const sessionIdRes = await verifyCookie()
  // console.log(sessionIdRes);
  
  if(sessionIdRes instanceof Response){
    return sessionIdRes
  }

  const [[session]] = await db.execute("SELECT * FROM session WHERE id = ?;", [sessionIdRes])
  
  if(!session){
    return Response.json({error: "Please Login First...!"}, {status: 401})
  }
  

  const [todos] = await db.execute("SELECT * FROM todos_data WHERE userID = ?;", [session.userID])
  return Response.json(todos)
}


export async function POST(request) {
  const todo = await request.json()
  const cookiesStore = await cookies()
  const [sessionID, cookieSignature] = cookiesStore.get("userID")?.value.split(".")

  if(!sessionID){
    return Response.json({error: "Please Login"}, {status: 401})
  }

  const [[userSession]] = await db.execute("SELECT * FROM session WHERE id = ?;", [sessionID])
  console.log("userSession: ", userSession);
  

  if(userSession){
    const [[user]] = await db.execute("SELECT * FROM users WHERE id = ?;", [userSession.userID])
    if(!user){
      return Response.json({error: "Please Login"}, {status: 401})
    }
  }else{
    return Response.json({error: "Your loggin session is expier, Please login first...!"}, {status: 401})
  }
  
  
  const newTodo = {
    id: crypto.randomUUID(),
    text: todo.text,
    completed: false
  }

  await db.execute("INSERT INTO todos_data (id, text, completed, userID) VALUES (?, ?, ?, ?)", [newTodo.id, newTodo.text, newTodo.completed, userSession.userID])

  return Response.json(newTodo) 
}