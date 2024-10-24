import { MapPin, Mail, Phone } from "lucide-react";

export default function CardsContact() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 lg:py-10">
      <ContactCard icon={<MapPin className="w-6 h-6 text-primary" />} title="Dirección" content="Av. Corrientes 1234, C1043AAX, BS, Argentina" />
      <ContactCard icon={<Mail className="w-6 h-6 text-primary" />} title="Enviar un correo" content="info@company.com" />
      <ContactCard icon={<Phone className="w-6 h-6 text-primary" />} title="Call Center" content="+54 11 4321-5678" />
    </div>
  );
}

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

function ContactCard({ icon, title, content }: ContactCardProps) {
  return (
    <div className="bg-white border-input rounded-lg border transition-transform duration-200 hover:scale-105 p-6 flex flex-col items-center text-center flex-1">
      <div className="bg-gray-200 rounded-full p-4 mb-4">{icon}</div>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{content}</p>
    </div>
  );
}
