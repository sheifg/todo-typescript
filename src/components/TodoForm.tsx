import React from "react";

interface TodoFormProps {
  // If it is not defined in the file types.d.ts:
  // addTodo: (todo: string) => void;
  // if it is defined in the file types.d.ts, because it is being used more than once:
  addTodo: addTodoFn;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  // It can be used the syntax as following and not importing useState
  const [input, setInput] = React.useState("");
  // or use as following and import useState(), as it has being done so far
  // const [input, setInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Here typescript only sees a function has a parameter called "e"
    // and complains about the type of "e" variable
    // It has to be defined the type of "e" variable
    // "e" is an object so it can be defined it as React.ChangeEvent<HTMLInputElement>
    setInput(e.target.value);
  };

  // For forms we use this syntax
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(input);
    setInput("");
  };

  // This is a just example how to define click events, but with Forms, it has always to submit in the form tag

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // For the click events normally it isn't needed to have the event details
    // If event details is needed, it can be defined the type of "e" variable
    // "e" : React.MouseEvent<HTMLButtonElement>
    alert("Button clicked!");
  };
  // For the click eventit isn't needed the "e" part, but in that case it is needed to define it

  return (
    <div className="input-form">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-task"
          placeholder="Enter a todo..."
          value={input}
          // Using the following syntax -> In case it is just wanted to use the function inside of the input, it can be used this syntax
          // Typescript is not complaining about "e", because automatically recognise that is event listener
          // Here typescript automatically infers the type of the input and dont complain what is "e" variale
          // onChange={(e) => setInput(e.target.value)}
          // Using the followign syntax -> In case it is wanted to use in more than once, it is better to create outside of the return and reuse it as many times as it is wanted
          onChange={handleChange}
        />
        <button
          className="btn-hover btn-color"
          type="submit"
          onClick={handleClick}
        >
          Add New Todo
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
