import React from "react";
import TodoListItem from "./TodoListItem";

interface TodoListProps {
  todos: TodoInterface[];
  deleteTodo: deleteTodoFn;
  toggleTodo: toggleTodoFn;
}

// When a function has parameters(here, as props), it is needed to define the types of those parameters(define the shape of the props)
// It can be defined the type of the parameter with interface or type keyword
// In react as the function is a Recat functional component, it is needed to tell this function will be in React.FC type

const TodoList: React.FC<TodoListProps> = ({
  todos,
  deleteTodo,
  toggleTodo,
}) => {
  return (
    <ul>
      {todos.map((item) => (
        <TodoListItem
          key={item.id}
          todo={item}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
