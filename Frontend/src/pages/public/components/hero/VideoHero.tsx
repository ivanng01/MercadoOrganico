import { VideoHeroProps } from "@/types/types";
import { Play } from "lucide-react";
import { useState, useEffect } from "react";

export default function VideoHero({ title = "Obtén Siempre", subtitle = "Alimentos Orgánicos Frescos" }: VideoHeroProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative w-full h-[651px] overflow-hidden">
      <div className="absolute inset-0">
        <img src="/hero_video.webp" alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-70" />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <button className="mb-8 w-16 h-16 bg-primary flex items-center justify-center" onClick={handleOpenModal}>
          <Play className="w-8 h-8 text-white" />
        </button>

        <div className="flex text-center relative max-w-4xl mx-auto lg:gap-14">
          <img src="/video-one__leaf-1.svg" alt="" />

          <div className="space-y-4">
            <h1 className="text-3xl lg:text-[40px] font-bold">{title}</h1>
            <h2 className="text-3xl lg:text-[40px] font-bold">{subtitle}</h2>
          </div>

          <img src="/video-one__leaf-2.svg" alt="" />
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75" onClick={handleOverlayClick}>
          <div className="relative w-full max-w-3xl">
            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-white text-xl z-50">
              X
            </button>
            <video className="w-full h-auto" controls autoPlay src="/video.webm">
              Tu navegador no soporta la etiqueta de video.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
