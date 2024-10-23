import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ResultsCounterSorterProps {
  totalResults: number;
  currentPage: number;
  resultsPerPage: number;
  onSortChange: (sortOption: string) => void;
}

export default function ResultsCounterSorter({ totalResults, currentPage, resultsPerPage, onSortChange }: ResultsCounterSorterProps) {
  const [sortOption, setSortOption] = useState("Relevancia");
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  const handleSortChange = (option: string) => {
    setSortOption(option);
    onSortChange(option);
  };

  return (
    <div className="flex justify-between items-center w-full pb-4">
      <div className="text-sm text-card-foreground">
        Mostrando {startResult}-{endResult} de {totalResults} resultados
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            Ordenar por: {sortOption} <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onClick={() => handleSortChange("Relevancia")}>Relevancia</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSortChange("Precio: Menor a Mayor")}>Precio: Menor a Mayor</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSortChange("Precio: Mayor a Menor")}>Precio: Mayor a Menor</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSortChange("Más Reciente")}>Más Reciente</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
