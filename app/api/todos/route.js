import { verifyCookie } from "@/config/auth"
import { db } from "@/config/db"
import { cookies } from "next/headers"


export async function GET() {
    
  const useridOrCookieRes = await verifyCookie()
  if(useridOrCookieRes instanceof Response){
    return useridOrCookieRes
  }

  const [todos] = await db.execute("SELECT * FROM todos_data WHERE userID = ?;", [useridOrCookieRes])
  return Response.json(todos)
}


export async function POST(request) {
  const todo = await request.json()
  const cookiesStore = await cookies()
  const [userID, cookieSignature] = cookiesStore.get("userID")?.value.split(".")
  

  if(userID){
    const [[user]] = await db.execute("SELECT * FROM users WHERE id = ?;", [userID])
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

  await db.execute("INSERT INTO todos_data (id, text, completed, userID) VALUES (?, ?, ?, ?)", [newTodo.id, newTodo.text, newTodo.completed, userID])

  return Response.json(newTodo) 
}