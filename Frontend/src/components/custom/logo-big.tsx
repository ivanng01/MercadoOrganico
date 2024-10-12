import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { themeStore } from "@/store/themeStore";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function LogoBig({ size = "md", className }: LogoProps) {
  const { isDarkMode } = themeStore();

  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const variant = isDarkMode ? "dark" : "light";

  const logoImages = {
    dark: "/logo-big-dark.svg",
    light: "/logo-big-light.svg",
  };

  return (
    <div className={cn("font-bold", sizeClasses[size], className)}>
      <Link to="/" aria-label="Inicio">
        <img src={logoImages[variant]} alt="logo" />
      </Link>
    </div>
  );
}
