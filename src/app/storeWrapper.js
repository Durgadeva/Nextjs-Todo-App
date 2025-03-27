
import { createContext, useReducer } from "react";
import { todoReducer, initialState } from "./todoReducer";
export const TodoContext = createContext();


export const TodoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>;
  };