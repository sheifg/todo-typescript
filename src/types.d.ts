// When it is had an object, it is better to create an interface
// Interface just for object
interface TodoInterface {
  id: number | string;
  task: string;
  done: boolean;
}

// Like is a function it cant be used interface, so it will be used type
type addTodoFn = (todo: string) => void;

type deleteTodoFn = (id: number | string) => void;
type toggleTodoFn = (item: TodoInterface) => void;
