import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SearchModalProps } from "@/types/types";

export default function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    onOpenChange(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const dummySuggestions = [
        "Manzanas Orgánicas",
        "Plátanos Orgánicos",
        "Espinacas Orgánicas",
        "Arroz Integral Orgánico",
        "Leche de Almendras Orgánica",
        "Barras de Granola Orgánicas",
        "Té Verde Orgánico",
        "Beneficios de consumir productos orgánicos",
        "Cómo leer etiquetas de alimentos",
        "Recetas sencillas con ingredientes orgánicos",
        "Ideas para snacks saludables con productos orgánicos",
        "Cómo comprar en esta tienda",
        "Cómo puedo vender en esta tienda",
      ];

      const filteredSuggestions = dummySuggestions.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Búsqueda</DialogTitle>
        <DialogDescription className="text-gray-200">Ingresa tu consulta para buscar productos, preguntas frecuentes, ayuda, etc.</DialogDescription>
        <form onSubmit={handleSearch} className="flex items-center space-x-2 pt-4">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Buscar productos, ayuda, etc..."
              value={searchQuery}
              onChange={handleInputChange}
              className="pr-10 pl-10 border border-primary outline-none focus:ring-0"
            />
            <button type="submit" aria-label="Buscar" className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary">
              <Search />
            </button>
            {suggestions.length > 0 && (
              <ul className="absolute z-10 mt-1 bg-background border border-gray-700 rounded-md shadow-lg w-full">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="px-4 py-2 hover:bg-gray-800 cursor-pointer" onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
