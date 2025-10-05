import { verifyCookie } from "@/config/auth"
import { db } from "@/config/db"


export async function GET() {
    
  const sessionIdRes = await verifyCookie()
  
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
  console.log(todo);
  
  const sessionID = await verifyCookie()
  
  if(sessionID instanceof Response){
    return sessionID
  }

  const [[userSession]] = await db.execute("SELECT * FROM session WHERE id = ?;", [sessionID])  

  if(!userSession){
    return Response.json({error: "Please Login"}, {status: 401})    
  }  

  const [[user]] = await db.execute("SELECT * FROM users WHERE id = ?;", [userSession.userID])

  if(!user){
    const [[authUser]] = await db.execute("SELECT * FROM auth_users WHERE id = ?;", [userSession.userID])

    if(!authUser){
      return Response.json({error: "You are not valid User.... Please create Account first....!"}, {status: 401})
    }
  }

  
  const newTodo = {
    id: crypto.randomUUID(),
    text: todo.text,
    completed: false
  }

  await db.execute("INSERT INTO todos_data (id, text, completed, userID) VALUES (?, ?, ?, ?)", [newTodo.id, newTodo.text, newTodo.completed, userSession.userID])

  return Response.json(newTodo) 
}