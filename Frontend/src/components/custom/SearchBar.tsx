import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ placeholder = "Búsqueda", value, onChange }: SearchBarProps) {
  return (
    <div className="w-full">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full py-2 px-4 h-11 rounded-lg outline-none text-white bg-primary placeholder-white"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Search className="h-6 w-6 text-white" />
        </span>
      </div>
    </div>
  );
}
