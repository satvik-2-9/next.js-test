// routing in next.js is all dependent on folders and their ordering.

/* another crazy thing about next.js is that we can make direct server side calls with it, and dont need 
   a dedicated backend to handle DB requests as long as there are no useState & useEffects involed.
*/

import Link from "next/link"
import { prisma } from "@/db"
import { TodoItem } from "@/components/Todoitem";

function getTodos() {
  return prisma.todo.findMany();
}


async function toggleTodo(id: string, completion: boolean) {

  // to operate on server side.
  "use server"

  // updating the tick of a list item.
  await prisma.todo.update({ where: {id}, data: { completion } })

}

export default async function Home() {
  
  const todos = await getTodos();
  //await prisma.todo.create({data:{title:"test", completion:false }})
  return <>
    <header className="flex justify-between mb-4 items-center">
      <h1 className="text=2x1">Todos</h1>
      <Link className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none" href="/new">New</Link>
    </header>
    <ul className="pl-4">
      {todos.map(todo => (
        // passing a server side funcion as well, passing all of em as props
                                /* sending the entire item todo, after deconstructing it */
        <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} /> 
      
      ))}

    </ul>

  </>
}