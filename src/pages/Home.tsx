import React, { useEffect } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

import { useTodos } from "../context/TodoContext";

const url = "https://66c3d5edd057009ee9c15082.mockapi.io/api/todos";

// When it is had an object, it is better to create an interface
// interface TodoInterface {
//     id: number | string;
//     task: string;
//     done: boolean
// }
//! Creating the file types.d.ts inside the src, typescript automatically recognised all the types defined inside and it is not necessary any importing. So it is commented the interface and type definition

// Type it can be defined anyhting thar is wanted
// It can also be used type instead of interface
// type TodoInterface {
//     id: number | string;
//     task: string;
//     done: boolean;
// }

const Home = () => {
  const { todos, getTodos, addTodo, deleteTodo, toggleTodo } = useTodos();

  // It will be used the above function when the app runs first
  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);

  // This line just to see that if it is not defined the type, there will be problems
  // setTodos(["Todo 1", "Todo 2"]);
  // The following creates an infinite loop
  // setTodos([
  //     { id: 1, task: 'Todo 1', done: false },
  //     { id: 2, task: 'Todo 2', done: false },
  //   ]);
  return (
    <div className="main">
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
    </div>
  );
};

export default Home;
