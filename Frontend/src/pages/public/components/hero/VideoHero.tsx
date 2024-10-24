import { Play } from "lucide-react";

interface VideoHeroProps {
  title?: string;
  subtitle?: string;
  videoUrl?: string;
  overlayOpacity?: number;
}

export default function VideoHero({
  title = "Obtén Siempre",
  subtitle = "Alimentos Orgánicos Frescos",
  videoUrl = "/hero_video.webp",
  overlayOpacity = 0.6,
}: VideoHeroProps) {
  return (
    <div className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <img src={videoUrl} alt="Background" className="w-full h-full object-cover" />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        {/* Play Button */}
        <button className="mb-8 w-16 h-16 bg-primary flex items-center justify-center">
          <Play className="w-8 h-8 text-white" />
        </button>

        {/* Text Content with Decorative Elements */}
        <div className="flex text-center relative max-w-4xl mx-auto lg:gap-14">
          <img src="/video-one__leaf-1.svg" alt="" />

          <div className="space-y-4">
            <h1 className="text-3xl  lg:text-[40px] font-bold">{title}</h1>
            <h2 className="text-3xl lg:text-[40px] font-bold">{subtitle}</h2>
          </div>

          <img src="/video-one__leaf-2.svg" alt="" />
        </div>
      </div>
    </div>
  );
}
