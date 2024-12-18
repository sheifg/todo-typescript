import React from "react";

interface TodoListItemProps {
  todo: TodoInterface;
  deleteTodo: deleteTodoFn;
  toggleTodo: toggleTodoFn;
}

const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  deleteTodo,
  toggleTodo,
}) => {
  return (
    <li>
      <p
        onClick={() => toggleTodo(todo)}
        className={todo.done ? "checked" : ""}
      >
        {todo.task}
      </p>
      <span className="task-icons" onClick={() => deleteTodo(todo.id)}>
        ✖️
      </span>
    </li>
  );
};

export default TodoListItem;
