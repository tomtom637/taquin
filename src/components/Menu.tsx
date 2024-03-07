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
  const handleSizeChange = (value: number[], direction: "width" | "height") => {
    setSize((prev) => ({
      ...prev,
      [direction]: value[0],
    }));
    setBoard(
      buildTaquinBoard(
        direction === "width" ? value[0] : size.width,
        direction === "height" ? value[0] : size.height,
      ),
    );
    localStorage.setItem(
      "taquin-size",
      JSON.stringify({
        width: direction === "width" ? value[0] : size.width,
        height: direction === "height" ? value[0] : size.height,
      }),
    );
  };
  const handleClickReset = () => {
    setBoard(buildTaquinBoard(size.width, size.height));
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="absolute inset-y-auto left-4 top-4"
          size="icon"
          variant="outline"
        >
          <MenuIcon classes="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-96 opacity-70">
        <div className="flex flex-col gap-2 py-2">
          <Button onClick={handleClickReset}>Reset</Button>
        </div>
        <div className="flex flex-col gap-2 py-2">
          <p>Set the width</p>
          <Slider
            value={[size.width]}
            max={4}
            min={2}
            step={1}
            onValueChange={(e) => handleSizeChange(e, "width")}
          />
        </div>
        <div className="flex flex-col gap-2 py-2">
          <p>Set the height</p>
          <Slider
            value={[size.height]}
            max={6}
            min={2}
            step={1}
            onValueChange={(e) => handleSizeChange(e, "height")}
          />
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
