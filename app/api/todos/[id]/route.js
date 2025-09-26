import { db } from "@/config/db"


export async function GET(_, {params}) {
  const {id} = await params
  const [[todo]] = await db.execute(`SELECT * FROM todos_data WHERE id = ?`, [id])  
  
  return Response.json(todo)  
}

export async function PATCH(request, {params}) {
  const {id} = await params
  const reqUpdateTodo = await request.json()  
  
  if(reqUpdateTodo.text){
    await db.execute(`UPDATE todos_data SET text = ? WHERE id = ?;`, [reqUpdateTodo.text, id])
  }else{
    await db.execute(`UPDATE todos_data SET completed = ? WHERE id = ?;`, [reqUpdateTodo.completed, id])
  }

  const [[updatedTodo]] = await db.execute(`SELECT * FROM todos_data WHERE id = ?`, [id])

  return Response.json(updatedTodo)
}



export async function DELETE(_, {params}) {
  const {id} = await params

  await db.execute("DELETE FROM todos_data WHERE id = ?;", [id])
  return new Response(null)  
}