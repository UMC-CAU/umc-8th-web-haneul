import { createContext, ReactNode, useContext, useState } from "react";

interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

interface TodoContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("너 잘못했음 ㅇㅇ");
  return context;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]); // todos를 상태로 관리

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};
