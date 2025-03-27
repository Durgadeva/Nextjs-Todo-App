import { useContext } from "react"
import { TodoContext } from "./storeWrapper";
import Link from "next/link";

const TodoItem = () => {
    const {state, dispatch} = useContext(TodoContext)

    return (
      <ul>
        {state.todos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            <Link
                href={`/todo/${todo.title.replace(/ /g, '')}`}
            >{todo.title}</Link>

            <button 
                onClick={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })}
                className="statusButton"
            >
              {todo.completed ? "UNDO" : "COMPLETE"}
            </button>

            <button 
                onClick={() => dispatch({ type: "DELETE_TODO", payload: todo.id })}
                className="deleteButton"
            >
                Delete
            </button>
          </li>
        ))}
      </ul>
    );
}

export default TodoItem;
