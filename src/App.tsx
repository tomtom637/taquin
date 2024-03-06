import { useState, useMemo, useRef } from "react";
import { buildTaquinBoard, isNeighborToZero, isSolved } from "./utils/utils";

export default function App() {
  const [width] = useState(4);
  const [height] = useState(4);
  // const [board, setBoard] = useState(buildTaquinBoard(width, height));
  const [board, setBoard] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15,
  ]);
  const zeroRef = useRef<HTMLButtonElement>(null);

  const rows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < height; i++) {
      rows.push(board.slice(i * width, (i + 1) * width));
    }
    return rows;
  }, [board, width, height]);

  const handleClick = (cell: number) => {
    if (!isNeighborToZero(board, width, cell)) return;
    const newBoard = [...board];
    const zeroIndex = newBoard.indexOf(0);
    const cellIndex = newBoard.indexOf(cell);
    newBoard[cellIndex] = 0;
    newBoard[zeroIndex] = cell;
    setBoard(newBoard);

    if (isSolved(newBoard)) {
      setTimeout(() => {
        alert("You won!");
        setBoard(buildTaquinBoard(width, height));
      }, 100);
    }

    if (!zeroRef.current) return;
    if (cellIndex === zeroIndex + 1) {
      zeroRef.current.style.animation = "move-right 0.09s ease-in-out";
    } else if (cellIndex === zeroIndex - 1) {
      zeroRef.current.style.animation = "move-left 0.09s ease-in-out";
    } else if (cellIndex > zeroIndex) {
      zeroRef.current.style.animation = "move-down 0.09s ease-in-out";
    } else if (cellIndex < zeroIndex) {
      zeroRef.current.style.animation = "move-up 0.09s ease-in-out";
    }

    setTimeout(() => {
      if (!zeroRef.current) return;
      zeroRef.current.style.animation = "";
    }, 50);
  };

  return (
    <div className="container mx-auto flex h-[100dvh] flex-col items-center justify-center gap-2 px-4">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex  gap-2">
          {row.map((cell, cellIndex) => (
            <button
              ref={cell === 0 ? zeroRef : undefined}
              key={cellIndex}
              type="button"
              onClick={() => handleClick(cell)}
              className={`flex h-20 w-20 cursor-pointer items-center justify-center text-2xl font-bold text-white text-opacity-50 ${cell !== 0 ? "hover:text-shadow-lg rounded border-2 border-solid border-slate-200 border-opacity-20  bg-white bg-opacity-10 shadow-lg backdrop-blur-md transition-shadow hover:border-rose-300 hover:border-opacity-40 hover:text-rose-200 hover:shadow-rose-600/15" : ""}`}
            >
              {cell !== 0 && cell}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
