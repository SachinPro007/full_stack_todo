import { db } from "@/config/db"



export async function GET() {
  const [todos] = await db.execute("SELECT * FROM todos_data;")

  return Response.json(todos)
}


export async function POST(request) {
  const todo = await request.json()
  const newTodo = {
    id: crypto.randomUUID(),
    text: todo.text,
    completed: false
  }

  await db.execute("INSERT INTO todos_data (id, text, completed) VALUES (?, ?, ?)", [newTodo.id, newTodo.text, newTodo.completed])

  return Response.json(newTodo)  
    
}