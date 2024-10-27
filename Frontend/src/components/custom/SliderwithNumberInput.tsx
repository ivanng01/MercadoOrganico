import { useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Button } from "@/components/ui/button";
import { PriceRangeSliderProps } from "@/types/types";

const CURRENCY_SYMBOL: string = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

const PriceRangeSlider = ({ value, onChange, max = 2000 }: PriceRangeSliderProps) => (
  <SliderPrimitive.Root
    className="relative flex w-full touch-none select-none items-center"
    value={value}
    onValueChange={onChange}
    max={max}
    step={1}
  >
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-muted-foreground">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    {value.map((_, index) => (
      <SliderPrimitive.Thumb
        key={index}
        className="block h-4 w-4 rounded-full border border-primary bg-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      />
    ))}
  </SliderPrimitive.Root>
);

export default function SliderwithNumberInput() {
  const [range, setRange] = useState<number[]>([10, 600]);

  const handleFilter = () => {
    console.log("Filtrar con rango de precio:", range);
  };

  return (
    <div className="w-full space-y-4 p-4 rounded-lg">
      <h2 className="text-lg font-semibold">Precio</h2>
      <PriceRangeSlider value={range} onChange={setRange} />
      <div className="flex justify-center space-x-2">
        <div className="rounded px-2 py-1">
          <span className="text-sm">
            {CURRENCY_SYMBOL} {range[0]}
          </span>
        </div>
        <span>-</span>
        <div className="rounded px-2 py-1">
          <span className="text-sm">
            {CURRENCY_SYMBOL} {range[1]}
          </span>
        </div>
      </div>
      <div className="flex justify-end">
        <Button variant="default" onClick={handleFilter}>
          Filtrar Productos
        </Button>
      </div>
    </div>
  );
}
