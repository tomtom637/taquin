import { useState, useMemo, useRef } from "react";

// UTILS
import { buildTaquinBoard, isNeighborToZero, isSolved } from "./utils/utils";

// COMPONENTS
import Menu from "./components/Menu";

export default function App() {
  const [size, setSize] = useState({
    width: 4,
    height: 4,
  });
  const [board, setBoard] = useState(buildTaquinBoard(size.width, size.height));
  const zeroRef = useRef<HTMLButtonElement>(null);

  const rows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < size.height; i++) {
      rows.push(board.slice(i * size.width, (i + 1) * size.width));
    }
    return rows;
  }, [board, size]);

  const handleClick = (cell: number) => {
    if (!isNeighborToZero(board, size.width, cell)) return;
    const newBoard = [...board];
    const zeroIndex = newBoard.indexOf(0);
    const cellIndex = newBoard.indexOf(cell);
    newBoard[cellIndex] = 0;
    newBoard[zeroIndex] = cell;
    setBoard(newBoard);

    if (isSolved(newBoard)) {
      setTimeout(() => {
        alert("You won!");
        setBoard(buildTaquinBoard(size.width, size.height));
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
    <div className="container mx-auto flex h-[100dvh]">
      <Menu
        {...{
          size,
          setSize,
          setBoard,
        }}
      />
      <div className="container mx-auto flex flex-col items-center justify-center gap-2 px-4">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex  gap-2">
            {row.map((cell, cellIndex) => (
              <button
                ref={cell === 0 ? zeroRef : undefined}
                key={cellIndex}
                type="button"
                onClick={() => handleClick(cell)}
                className={`flex h-20 w-20 cursor-pointer items-center justify-center text-2xl font-bold text-white text-opacity-50 ${cell !== 0 ? "rounded border-2 border-solid border-slate-200 border-opacity-20 bg-white  bg-opacity-10 shadow-lg backdrop-blur-md transition-shadow hover:border-rose-300 hover:border-opacity-40 hover:text-rose-200 hover:shadow-rose-600/15 hover:text-shadow-lg" : ""}`}
              >
                {cell !== 0 && cell}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
