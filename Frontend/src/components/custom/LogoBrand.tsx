import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type LogoProps = {
  variant?: "big" | "small";
  className?: string;
};

export default function LogoBrand({ variant = "big", className }: LogoProps) {
  // Definimos las imágenes para ambas variantes
  const logoImages = {
    big: "/logo-big.svg",
    small: "/logo-small.svg",
  };

  return (
    <div className={cn("font-bold", className)}>
      <Link to="/" aria-label="Inicio">
        <img src={logoImages[variant]} alt="logo" />
      </Link>
    </div>
  );
}
