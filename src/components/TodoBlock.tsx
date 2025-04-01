interface TodoBlock {
  name: string;
  isCompleted: boolean;
  onButtonClick: () => void;
}

const TodoBlock = ({ name, isCompleted, onButtonClick }: TodoBlock) => {
  return (
    <div className="render-container__item">
      <span className="render-container__item-text">{name}</span>
      <button
        className={
          isCompleted
            ? "render-container__item-button"
            : "todo-container__button"
        }
        onClick={onButtonClick}
      >
        {isCompleted ? "삭제" : "완료"}
      </button>
    </div>
  );
};

export default TodoBlock;
