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

const sortOptionsText: { [key: string]: string } = {
  "": "Predeterminado",
  alpha_asc: "Alfabético: A-Z",
  alpha_desc: "Alfabético: Z-A",
  price_asc: "Precio: Menor a Mayor",
  price_desc: "Precio: Mayor a Menor",
};

export default function ResultsCounterSorter({ totalResults, currentPage, resultsPerPage, onSortChange }: ResultsCounterSorterProps) {
  const [sortOption, setSortOption] = useState("");
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
            Ordenar por {sortOptionsText[sortOption]} <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onClick={() => handleSortChange("")}>Predeterminado</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSortChange("alpha_asc")}>Alfabético: A-Z</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSortChange("alpha_desc")}>Alfabético: Z-A</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSortChange("price_asc")}>Precio: Menor a Mayor</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSortChange("price_desc")}>Precio: Mayor a Menor</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
