import { HeaderProps } from "@/types/types";

export default function Header({
  title,
  backgroundImage = "/hero-carousel1.webp",
  overlayColor = "rgb(0, 0, 0)",
  overlayOpacity = 0.7,
}: HeaderProps) {
  return (
    <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
      <img src={backgroundImage} alt="Fresh produce background" className="absolute inset-0 w-full h-full object-cover" />

      <div
        className="absolute inset-0"
        style={{
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }}
      />

      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">{title}</h1>
      </div>
    </div>
  );
}
