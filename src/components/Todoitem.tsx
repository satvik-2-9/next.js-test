// for client side rendering

"use client"

/* we just define prop data type here and take them in as variables. */
type TodoItemProps = {

    id: string
    title: string
    completion: boolean
    /*return type for the given function is void cuz it dont matter.*/
    toggleTodo: (id: string, completion: boolean) => void
}

export function TodoItem({ id, title, completion, toggleTodo }: TodoItemProps) {

    return (

        <li className="flex gap-1 items-center">
            <input id={id} type="checkbox" className="cursor-pointer peer" defaultChecked={completion} onChange={e => toggleTodo(id, e.target.checked)}></input>
            <label
                htmlFor={id}
                className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500"
            >
                {title}
            </label>
        </li>



    )

}
