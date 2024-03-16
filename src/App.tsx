import { useState, useMemo, useRef, useEffect, useCallback } from "react";

// UTILS
import { buildTaquinBoard, isNeighborToZero, isSolved } from "./utils/utils";
import { cn } from "./lib/utils";

// COMPONENTS
import Menu from "./components/Menu";

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

  const handleClick = useCallback(
    (cell: number) => {
      if (!isNeighborToZero(board, size.width, cell)) return;
      if (hasWon) return;
      const newBoard = [...board];
      const zeroIndex = newBoard.indexOf(0);
      const cellIndex = newBoard.indexOf(cell);
      newBoard[cellIndex] = 0;
      newBoard[zeroIndex] = cell;
      setBoard(newBoard);

      if (isSolved(newBoard)) {
        setHasWon(true);
        setTimeout(() => {
          setHasWon(false);
          setBoard(buildTaquinBoard(size.width, size.height));
        }, 1400);
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
    },
    [board, size.width, size.height, hasWon],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          handleClick(board[board.indexOf(0) + size.width]);
          break;
        case "ArrowDown":
          handleClick(board[board.indexOf(0) - size.width]);
          break;
        case "ArrowLeft":
          handleClick(board[board.indexOf(0) + 1]);
          break;
        case "ArrowRight":
          handleClick(board[board.indexOf(0) - 1]);
          break;
      }
    },
    [handleClick, board, size.width],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="container mx-auto flex h-[100dvh] bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat">
      <Menu
        {...{
          size,
          setSize,
          setBoard,
          setHasWon,
        }}
      />
      <div
        className={`container mx-auto flex select-none flex-col items-center justify-center gap-2 px-4 transition-opacity`}
      >
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((cell, cellIndex) => (
              <button
                ref={cell === 0 ? zeroRef : undefined}
                key={cellIndex}
                type="button"
                onPointerDown={() => handleClick(cell)}
                className={cn(
                  "flex h-20 w-20 items-center justify-center",
                  "cursor-pointer select-none",
                  "overscroll-none",
                  "text-2xl font-bold text-white text-opacity-50",
                  cell !== 0
                    ? "focus:text-shadow-lg hover:text-shadow-lg rounded" +
                        " border-2 border-solid border-slate-200 border-opacity-20" +
                        " bg-white bg-opacity-10" +
                        " shadow-lg backdrop-blur-md transition-shadow" +
                        " hover:border-rose-300 hover:border-opacity-40 hover:text-rose-200 hover:shadow-rose-600/15" +
                        " focus:border-rose-300 focus:border-opacity-40 focus:text-rose-200 focus:shadow-rose-600/15"
                    : "",
                  hasWon && cell !== 0 ? "border bg-opacity-5" : "",
                )}
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
