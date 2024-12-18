import axios, { AxiosError } from "axios";
import React, { createContext, useContext, useState } from "react";

const url = "https://66c3d5edd057009ee9c15082.mockapi.io/api/todos";
interface TodoContextInterface {
  todos: TodoInterface[];
  getTodos: () => void;
  addTodo: addTodoFn;
  toggleTodo: toggleTodoFn;
  deleteTodo: deleteTodoFn;
}

// Create context
// Initially will be undefined, but in the future will contains TodoContextInterface
const TodoContext = createContext<TodoContextInterface | undefined>(undefined);

// Create a provider
// Define as a funcional component and define the children prop, it will be in React.ReactNode
export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<TodoInterface[]>([]);

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
  // If it isn't defined in the the file type.d.ts:
  // const addTodo = async (todo: string) => {
  // If it is defined in the file types.d.ts:
  const addTodo: addTodoFn = async (todo) => {
    const todoObj = {
      task: todo,
      done: false,
    };

    try {
      // It is not necessary to include here <TodoInterface>, but it is also good to include it, because it is being said in which type od data, it will be received it. It is optional to write this
      const { data } = await axios<TodoInterface>({
        method: "POST",
        url,
        data: todoObj,
      });

      setTodos([...todos, data]);
      getTodos();
    } catch (error) {
      // First check the type of error. If the error in that type then it can be acccesed these fields

      // error.message exist if the type of error is Error class
      // Error is a class, it has to be checked if the error is generated from Error class
      // By adding a type guard it can be checked if the error is an instance of Error
      if (error instanceof Error) {
        // error is of type "unknow". This compile error would appear if it isn't included inside of the if
        console.log(error.message);
      }

      // if the error comes from axios, it can be writtem as following
      if (error instanceof AxiosError) {
        // console.log(error.response?.data || error.message || error);
        console.log(error.response?.data);
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
        method: "PUT",
        url: `${url}/${item.id}`,
        data: {
          // It is always better to make a copy of all items before doing anythign in the item specific with the id, that it is wanted to toggle. But in that case it is still working if it is not made a copy of all items with ->
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

  return (
    <TodoContext.Provider
      value={{ todos, getTodos, addTodo, toggleTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook
export const useTodos = (): TodoContextInterface => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};
