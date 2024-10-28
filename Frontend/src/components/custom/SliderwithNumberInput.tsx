import { useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const DEFAULT_MIN = 10;
const DEFAULT_MAX = 600;
const CURRENCY_SYMBOL: string = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

export default function SliderWithNumberInput() {
  const navigate = useNavigate();
  const location = useLocation();
  const [range, setRange] = useState([DEFAULT_MIN, DEFAULT_MAX]);

  const handleFilter = () => {
    const currentParams = new URLSearchParams(location.search);
    currentParams.set("min_price", range[0].toString());
    currentParams.set("max_price", range[1].toString());

    navigate(`${location.pathname}?${currentParams.toString()}`);

    window.dispatchEvent(
      new CustomEvent("priceFilterChanged", {
        detail: { min: range[0], max: range[1] },
      }),
    );
  };

  const handleClear = () => {
    setRange([DEFAULT_MIN, DEFAULT_MAX]);

    const currentParams = new URLSearchParams(location.search);
    currentParams.delete("min_price");
    currentParams.delete("max_price");

    const newSearch = currentParams.toString();
    const searchString = newSearch ? `?${newSearch}` : "";

    navigate(`${location.pathname}${searchString}`);

    window.dispatchEvent(new CustomEvent("priceFilterCleared"));
  };

  const handleInputChange = (value: number, index: number) => {
    const newRange = [...range];
    newRange[index] = value;

    if ((index === 0 && value <= range[1]) || (index === 1 && value >= range[0])) {
      setRange(newRange);
    }
  };

  return (
    <div className="w-full space-y-4 p-4 rounded-lg">
      <h2 className="text-lg font-semibold">Precio</h2>

      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center"
        value={range}
        onValueChange={setRange}
        max={DEFAULT_MAX}
        step={1}
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-muted-foreground">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {range.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className="block h-4 w-4 rounded-full border border-primary bg-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Root>

      <div className="flex justify-center space-x-2">
        <div className="flex items-center space-x-1">
          <span>{CURRENCY_SYMBOL}</span>
          <input
            type="number"
            min={0}
            max={DEFAULT_MAX}
            value={range[0]}
            onChange={(e) => handleInputChange(Number(e.target.value), 0)}
            className="w-20 rounded px-2 py-1 border text-sm bg-background"
          />
        </div>
        <span>-</span>
        <div className="flex items-center space-x-1">
          <span>{CURRENCY_SYMBOL}</span>
          <input
            type="number"
            min={0}
            max={DEFAULT_MAX}
            value={range[1]}
            onChange={(e) => handleInputChange(Number(e.target.value), 1)}
            className="w-20 rounded px-2 py-1 border text-sm bg-background"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="secondary" onClick={handleClear}>
          Limpiar Filtros
        </Button>
        <Button variant="default" onClick={handleFilter}>
          Aplicar Filtros
        </Button>
      </div>
    </div>
  );
}
