export default function Pagination({
  questionsData,
  setCurrentQuestion,
}: {
  questionsData: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
}) {
  function component() {
    return Array.from({ length: questionsData }).map((_, index) => (
      <button
        className="pagination-button"
        key={index}
        onClick={() => setCurrentQuestion(index)}
      >
        {index + 1}
      </button>
    ));
  }

  return (
    <div className="pagination-container">
      <div className="pagination">{component()}</div>
    </div>
  );
}
