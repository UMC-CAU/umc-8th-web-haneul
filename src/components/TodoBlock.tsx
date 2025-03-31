interface TodoBlock {
  name: string;
  isCompleted: boolean;
  onButtonClick: () => void;
}

const TodoBlock = ({ name, isCompleted, onButtonClick }: TodoBlock) => {
  return (
    <div>
      {name}
      <button onClick={onButtonClick}>{isCompleted ? "삭제" : "완료"}</button>
    </div>
  );
};

export default TodoBlock;
