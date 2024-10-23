import { Button } from "@/components/ui/button";
import { PaginationProps } from "@/types/types";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const renderPageNumbers = () => {
    return pageNumbers.map((number) => {
      if (number === 1 || number === totalPages || (number >= currentPage - 1 && number <= currentPage + 1)) {
        return (
          <Button
            key={number}
            onClick={() => onPageChange(number)}
            variant={currentPage === number ? "default" : "link"}
            className={`w-8 h-8 ${currentPage === number ? "bg-primary text-white" : "text-gray-600 hover:text-gray-800"}`}
          >
            {number}
          </Button>
        );
      } else if (number === currentPage - 2 || number === currentPage + 2) {
        return (
          <span key={number} className="text-gray-400">
            ...
          </span>
        );
      }
      return null;
    });
  };

  return (
    <nav className="flex justify-end items-center space-x-1 p-2">
      <Button onClick={() => onPageChange(1)} disabled={currentPage === 1} variant="link" size="icon" className="text-gray-400 hover:text-gray-600">
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="link"
        size="icon"
        className="text-gray-400 hover:text-gray-600"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {renderPageNumbers()}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="link"
        size="icon"
        className="text-gray-400 hover:text-gray-600"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        variant="link"
        size="icon"
        className="text-gray-400 hover:text-gray-600"
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
