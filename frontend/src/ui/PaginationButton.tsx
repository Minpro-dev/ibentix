interface PaginationButtonProps {
  totalPage: number;
  onClick: (clickedPage: number) => void;
  page: number;
}

function PaginationButton({ totalPage, onClick, page }: PaginationButtonProps) {
  return (
    <div className="flex gap-4">
      {Array.from({ length: totalPage }, (_, i) => (
        <button
          onClick={() => onClick(i + 1)}
          className={`btn ${page !== i + 1 ? "text-zinc-100 bg-indigo-500 border-indigo-500" : "text-white border-indigo-600 bg-indigo-600"}`}>
          {i + 1}
        </button>
      ))}
    </div>
  );
}

export default PaginationButton;
