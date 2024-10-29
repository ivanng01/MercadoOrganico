import { TitleDecor } from "@/lib/iconsCustom";
import { PartnerProps } from "@/types/types";

export default function Partner({
  title = "Nuestros Productores Asociados",
  subtitle = "Productores comprometidos con la calidad y la sostenibilidad.",
  producers = [
    { id: 1, logoUrl: "/Partner_logo.svg", name: "Logo Ipsum 1" },
    { id: 2, logoUrl: "/Partner_logo.svg", name: "Logo Ipsum 2" },
    { id: 3, logoUrl: "/Partner_logo.svg", name: "Logo Ipsum 3" },
    { id: 4, logoUrl: "/Partner_logo.svg", name: "Logo Ipsum 4" },
    { id: 5, logoUrl: "/Partner_logo.svg", name: "Logo Ipsum 5" },
  ],
}: PartnerProps) {
  return (
    <div className="w-full py-16 overflow-hidden">
      <div className="text-center mb-12 space-y-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <TitleDecor className="h-8 w-8 text-primary" />
          <span className="text-green-500 text-xl font-semibold">{title}</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 px-4">{subtitle}</h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex w-full animate-marquee space-x-12 opacity-75">
          {/* Logos */}
          {producers.map((producer) => (
            <div key={producer.id} className="flex-shrink-0 w-48 h-20 flex items-center justify-center">
              <img
                src={producer.logoUrl}
                alt={producer.name}
                className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
          {producers.map((producer) => (
            <div key={`duplicate-${producer.id}`} className="flex-shrink-0 w-48 h-20 flex items-center justify-center">
              <img
                src={producer.logoUrl}
                alt={producer.name}
                className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
