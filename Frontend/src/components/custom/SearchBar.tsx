import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ placeholder = "Búsqueda", value, onChange }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(value || "");
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("Buscando:", searchTerm);
    navigate(searchTerm ? `/store?search=${encodeURIComponent(searchTerm)}` : "/store");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);
    if (onChange) {
      onChange(event);
    }

    if (newValue === "") {
      navigate("/store");
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full py-2 px-4 h-11 rounded-lg outline-none text-xl"
      />
      <button
        onClick={handleSearch}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent outline-none cursor-pointer"
        aria-label="Buscar"
      >
        <Search className="h-6 w-6 text-background" />
      </button>
    </div>
  );
}
