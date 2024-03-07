import { useState, useMemo, useRef } from "react";

// UTILS
import { buildTaquinBoard, isNeighborToZero, isSolved } from "./utils/utils";

// IMAGES
import winImage from "@/assets/win.png";

// COMPONENTS
import Menu from "./components/Menu";
import { Button } from "./components/ui/button";

const defaultSize = { width: 4, height: 4 };

export default function App() {
  const [size, setSize] = useState(
    localStorage.getItem("taquin-size")
      ? JSON.parse(localStorage.getItem("taquin-size") as string)
      : defaultSize,
  );
  const [board, setBoard] = useState(buildTaquinBoard(size.width, size.height));
  const [hasWon, setHasWon] = useState(false);
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
      setHasWon(true);
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
      <div
        className={`container mx-auto flex flex-col items-center justify-center gap-2 px-4 transition-opacity ${hasWon ? "opacity-0" : ""}`}
      >
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
      {hasWon && (
        <div className="fixed left-1/2 top-1/2 flex h-full -translate-x-1/2 -translate-y-1/2 animate-[appear_500ms_ease-in-out] flex-col items-center justify-center">
          <p className="mb-4 translate-y-7 rotate-3 scale-150 whitespace-nowrap rounded-md bg-black px-4 py-2 text-7xl font-semibold tracking-wide text-yellow-400 animate-in">
            YOU WIN
          </p>
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-6">
            <img
              className="pb-10"
              src={winImage}
              alt="win"
              width={300}
              height={300}
            />
            <Button
              className="border-2 border-yellow-400 border-b-transparent bg-black p-10 text-xl uppercase tracking-widest text-yellow-400 transition-all hover:border-transparent hover:border-b-yellow-400 hover:bg-slate-900"
              size="lg"
              onClick={() => {
                setHasWon(false);
                setBoard(buildTaquinBoard(size.width, size.height));
              }}
            >
              Play Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
