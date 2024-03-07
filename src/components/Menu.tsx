import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { buildTaquinBoard } from "@/utils/utils";

type MenuProps = {
  size: {
    width: number;
    height: number;
  };
  setSize: React.Dispatch<
    React.SetStateAction<{
      width: number;
      height: number;
    }>
  >;
  setBoard: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function Menu({ size, setSize, setBoard }: MenuProps) {
  const width = size.width;
  const height = size.height;

  const handleSizeChange = (value: number[], direction: "width" | "height") => {
    const val = value[0];
    const w = direction === "width" ? val : size.width;
    const h = direction === "height" ? val : size.height;
    setSize((prev) => ({ ...prev, [direction]: val }));
    setBoard(buildTaquinBoard(w, h));
    localStorage.setItem(
      "taquin-size",
      JSON.stringify({ width: w, height: h }),
    );
  };
  const handleClickNewGame = () => {
    setBoard(buildTaquinBoard(width, height));
  };

  const handleClickReset = () => {
    const settings = { width: 4, height: 4 };
    setSize(settings);
    setBoard(buildTaquinBoard(4, 4));
    localStorage.setItem("taquin-size", JSON.stringify(settings));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="absolute inset-y-auto left-4 top-4 z-10"
          size="icon"
          variant="outline"
        >
          <MenuIcon classes="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-96 opacity-80">
        <div className="flex flex-col gap-2 py-2">
          <Button
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-2xl text-white shadow-md shadow-indigo-800 transition duration-150 ease-out hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:ease-in"
            onClick={handleClickNewGame}
          >
            New Game
          </Button>
        </div>
        <div className="flex flex-col gap-2 py-2">
          <p>Set the width</p>
          <Slider
            value={[width]}
            max={4}
            min={2}
            onValueChange={(e) => handleSizeChange(e, "width")}
          />
        </div>
        <div className="flex flex-col gap-2 py-2">
          <p>Set the height</p>
          <Slider
            value={[height]}
            max={6}
            min={2}
            onValueChange={(e) => handleSizeChange(e, "height")}
          />
        </div>
        <div className="my-2 flex flex-col gap-2 py-2">
          <Button
            className="border-2 border-slate-500 bg-slate-800 hover:bg-slate-700"
            onClick={handleClickReset}
          >
            <pre className="animate-bounce border-b-2 border-yellow-400 text-xs uppercase tracking-wide text-white">
              Reset to Factory
            </pre>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function MenuIcon({ classes }: { classes?: string }) {
  return (
    <svg
      className={cn(classes)}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
