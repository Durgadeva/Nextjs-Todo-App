'use client'

import styles from "./page.module.css";
import TodoList from "./todolist";
import TodoItem from "./todoitem";
import { TodoProvider } from "./storeWrapper";

const Home = ({ postData }) => {
  return (
    <TodoProvider>
    <div className={styles.page}>        
        <TodoList />
        <TodoItem />
    </div>
    </TodoProvider>
  );
}

export default Home;
