import { Leaf } from "lucide-react";

export default function SpinnerProducts() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-foreground">
      <div className="text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
            <Leaf className="w-16 h-16 text-primary" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center animate-spin-reverse-slower">
            <Leaf className="w-24 h-24 text-green-400 opacity-50" />
          </div>
          <div className="relative z-10">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-24 h-24 border-8 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-green-800 animate-pulse">Cargando productos frescos...</h2>
      </div>
    </div>
  );
}
