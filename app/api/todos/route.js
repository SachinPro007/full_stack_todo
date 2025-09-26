import { db } from "@/config/db"
import { cookies } from "next/headers"



export async function GET() {
  const cookiesStore = await cookies()
  const userID = cookiesStore.get("userID")?.value

  if(!userID){
    return Response.json({error: "Please Login First...!"}, {status: 401})
  }
  

  const [todos] = await db.execute("SELECT * FROM todos_data;")
  const filterTodos = todos.filter(todo => todo.userID === userID)

  return Response.json(filterTodos)
}


export async function POST(request) {
  const todo = await request.json()
  const cookiesStore = await cookies()
  const userID = cookiesStore.get("userID")?.value

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