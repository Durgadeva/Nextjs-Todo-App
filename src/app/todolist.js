'use client'

import { useState, useEffect, useMemo, useRef } from "react";
import { TodoContext } from "./storeWrapper";
import { useContext } from "react";

const TodoList = () => {
    const [newTodo, setNewTodo] = useState({
        id: 0,
        title: "",
        completed: false
      });
    const [searchText, setSearchText] = useState("")
    const {state, dispatch} = useContext(TodoContext)

    const { todos } = state

    useEffect(() => {
        fetchApi();
      }, []);

    const fetchApi =  async () => {
        let todos = await fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
        .catch((error) => console.log('error===', error))
        if (todos) {
            dispatch({ type: "GET_TODOS", payload: todos });
        }
    }

    const lastRecord = useMemo(() => {
        if (state.todos.length > 0) {
          return state.todos[state.todos.length - 1];
        }
    }, [state.todos.length])

    const addTodoApi = () => {
        // let data = await fetch("https://jsonplaceholder.typicode.com/todos",
        //  {
        //     method: "POST",
        //     body: JSON.stringify(newTodo),
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8"
        //     },
        //     })
        //     .then((response) => response.json()
        //     .catch((error) => console.log('error===', error))
        //     )
            let checkdata = [...state.todos, newTodo]
            dispatch({ type: "ADD_TODO", payload: checkdata});
            setNewTodo({
                id: 0,
                title: "",
                completed: false
              });
    }

    const enterInputVal = (value) => {
        let newData = {
            id: lastRecord ? lastRecord.id + 1 : 1,
            title: value,
            completed: false
          };
        setNewTodo(newData);
    }

    const debounceTimeout = useRef(null);

    const handleSearch = (searchText) => {
        const result = todos?.filter(item =>
        item?.title.toLowerCase().includes(searchText.toLowerCase())
        );

        dispatch({ type: "GET_TODOS", payload: result })
    };

    useEffect(() => {
    if (searchText) {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
          }
          debounceTimeout.current = setTimeout(() => {
            handleSearch(searchText);
          }, 500);      
    } else {
        fetchApi()
    }
    
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchText]);


  return (
    <div>
      <h1>Todo List</h1>
      <input 
        type="text"
        value={newTodo?.title}
        onChange={(e) => enterInputVal(e.target.value)}
        placeholder="Enter New Todo"
        className={"inputField"}
       />
       <button onClick={addTodoApi} className={"addTodoBtn"}>ADD TODO</button>
    <div>
       <input 
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Enter Search Text"
        className={"inputField"}
       />
       </div>
    </div>
  );
}

export default TodoList;
