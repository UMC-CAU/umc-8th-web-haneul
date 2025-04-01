import { useState } from "react";
import TodoBlock from "./components/TodoBlock";
import { useTodo } from "./context/TodoProvider";

interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

const App = () => {
  const [todoInput, setTodoInput] = useState<string>("");
  // const [todos, setTodos] = useState<Todo[]>([]); // todos를 상태로 관리
  const { todos, setTodos } = useTodo();

  const handleAddTodoClick = (): void => {
    const newTodo: Todo = {
      id: Date.now(),
      title: todoInput,
      isCompleted: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]); // todos 상태 업데이트
    setTodoInput("");
  };

  const handleTodoClick = (id: number) => {
    console.log(`${id}에 대한 Toggle이 Trigger 되었습니다.`);
    setTodos((prevTodos) => {
      return prevTodos
        .filter((todo) => !(todo.id === id && todo.isCompleted))
        .map((todo) =>
          todo.id === id
            ? { ...todo, isCompleted: !todo.isCompleted } // todo의 완료 상태를 토글
            : todo
        );
    });
  };

  return (
    <div className="todo-container">
      <span className="todo-container__header">Haneul's Todo</span>
      <form
        className="todo-container__form"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTodoClick();
        }}
      >
        <input
          className="todo-container__input"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        ></input>
        <button className="todo-container__button" type="submit">
          할 일 추가
        </button>
      </form>

      <div className="render-container">
        <div className="render-container__section">
          <span className="render-container__title">할 일</span>
          {todos
            .filter((todo) => !todo.isCompleted) // 완료되지 않은 할 일만 표시
            .map((todo: Todo, idx: number) => {
              return (
                <TodoBlock
                  key={idx}
                  name={todo.title}
                  isCompleted={todo.isCompleted} // 할 일을 클릭할 수 있는 버튼
                  onButtonClick={() => handleTodoClick(todo.id)}
                />
              );
            })}
        </div>
        <div className="render-container__section">
          <span className="render-container__title">완료된 할 일</span>
          {todos
            .filter((todo) => todo.isCompleted) // 완료된 할 일만 표시
            .map((todo: Todo, idx: number) => {
              return (
                <TodoBlock
                  key={idx}
                  name={todo.title}
                  isCompleted={todo.isCompleted} // 완료된 할 일을 다시 클릭하여 취소할 수 있는 버튼
                  onButtonClick={() => handleTodoClick(todo.id)}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default App;
