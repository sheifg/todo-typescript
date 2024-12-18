import React, { useEffect, useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import axios, { AxiosError } from "axios";

const url = "https://66c3d5edd057009ee9c15082.mockapi.io/api/todos";

// When it is had an object it is better to create an interface
// interface TodoInterface {
//     id: number | string;
//     task: string;
//     done: boolean
// }
//! Creating the file types.d.ts inside the src, typescript automatically recognised all the types defined inside and it is not necessary any importing. So it is commented the interface type definition

// Type it can defined anyhting that it is wanted
// It can also be used type instead of interface
// type TodoInterface {
//     id: number | string;
//     task: string;
//     done: boolean;
// }

const Home = () => {
  // It will be an array and every element in this array it will be an object with the structure defined above
  // Here it is defined an array. It is also necessary to tell what it is being stored in this array. It is told that this array will contain objects in it. And every object will contain id, task and done. To tell this it is defined an interface.
  const [todos, setTodos] = useState<TodoInterface[]>([]);

  // Get all todos
  const getTodos = async () => {
    try {
      // <TodoInterface[]>: it will receive the objects in an array. It is optional, it is just like a help to typescript to identify which type of data it will be received
      const { data } = await axios.get<TodoInterface[]>(url);
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Add a new Todo
  // It can be defined one by one the parameter inside, and not needed to use interface before
  // If it is not defined in the the file type.d.ts:
  // const addTodo = async (todo: string) => {
  // If it is defined in the file types.d.ts:
  const addTodo: addTodoFn = async (todo) => {
    const todoObj = {
      task: todo,
      done: false,
    };

    try {
      // It is not necessary to include here <TodoInterface>, but it is also good to include it, because it is being said which type of data, it will be received it. It is optional to write this
      const { data } = await axios<TodoInterface>({
        method: "POST",
        url,
        data: todoObj,
      });
      console.log(data);

      setTodos([...todos, data]);
      getTodos();
    } catch (error) {
      console.log(error);

      // First chekc the type of error. if the error is in that type, then it can be accessed these fields

      // If the error comes from axios, it can be written as following
      if (error instanceof AxiosError) {
        // console.log(error.response?.data || error.message || error);
        console.log(error.response?.data);
      }

      // error.message exist if the type of error is Error class
      // Error is a class, it is had to check if the error is generated from Error class
      // by adding a type guard it can be checked if the error is an instance of Error
      if (error instanceof Error) {
        console.log(error.message); // error is of type "unknow". This compile error would appear if it is not included it inside of the if
      }

      console.log(error);
    }
  };

  const deleteTodo: deleteTodoFn = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTodo: toggleTodoFn = async (item) => {
    try {
      await axios({
        method: "PUT", // or PATCH
        url: `${url}/${item.id}`,
        data: {
          // It is always better to make a copy of all items before doing anything in the item specific with the id, that it is wanted to toggle. But in that case it is still working if it is not needed to make a copy of all items with ->
          // ...items,
          // just writting ->
          // done: !item.done,
          ...item,
          done: !item.done,
        },
      });

      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

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
