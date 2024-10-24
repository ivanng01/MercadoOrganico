import { TitleDecor } from "@/lib/iconsCustom";
import { TeamSectionProps } from "@/types/types";

export default function TeamSection({
  title = "Conoce a Nuestro Equipo",
  subtitle = "Expertos comprometidos con la calidad",
  members = [
    {
      id: 1,
      name: "Max Cereceda",
      role: "UI - UX / Frontend Developer",
      imageUrl: "/team/image1.webp",
      bio: "Ex-cofundador de una startup. Integrante del equipo inicial en proyectos de UI/UX.",
      linkedinUrl: "https://www.linkedin.com/in/maxcereceda/",
    },
    {
      id: 2,
      name: "Zail Vegas",
      role: "Frontend Developer",
      imageUrl: "/team/image2.webp",
      bio: "Ex-cofundador de una startup. Integrante del equipo inicial como Frontend Developer.",
      linkedinUrl: "https://www.linkedin.com/in/zail-vegas-padron?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      id: 3,
      name: "Daniel Rodríguez",
      role: "Backend Developer",
      imageUrl: "/team/image3.webp",
      bio: "Ex-cofundador de una startup. Integrante del equipo inicial como Backend Developer.",
      linkedinUrl: "https://www.linkedin.com/in/danielrodback/",
    },
    {
      id: 4,
      name: "Iván González",
      role: "Backend Developer",
      imageUrl: "/team/image4.webp",
      bio: "Ex-cofundador de una startup. Integrante del equipo inicial como Backend Developer.",
      linkedinUrl: "https://www.linkedin.com/in/ivandgonzalez/",
    },
    {
      id: 5,
      name: "Noelia Aguilar",
      role: "QA Tester",
      imageUrl: "/team/image5.webp",
      bio: "Ex-cofundador de una startup. Integrante del equipo inicial como QA Tester.",
      linkedinUrl: "https://www.linkedin.com/in/noelia-cecilia-belén-aguilar",
    },
    {
      id: 6,
      name: "Gisela Lago",
      role: "QA Tester",
      imageUrl: "/team/image6.webp",
      bio: "Ex-cofundador de una startup. Integrante del equipo inicial como QA Tester.",
      linkedinUrl: "https://www.linkedin.com/in/giselalago",
    },
    {
      id: 7,
      name: "Veronica Bravo",
      role: "Team Leader",
      imageUrl: "/team/image7.webp",
      bio: "Ex-cofundador de una startup. Integrante del equipo inicial como Team Leader.",
      linkedinUrl: "#",
    },
  ],
}: TeamSectionProps) {
  return (
    <div className="w-full py-16 px-4 lg:px-[120px] bg-white">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <div className="flex flex-col items-center justify-center gap-2 mb-4">
          <TitleDecor className="h-8 w-8 text-primary" />
          <span className="text-primary">{title}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{subtitle}</h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((member) => (
          <div key={member.id} className="border-input border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
            <div className="aspect-square overflow-hidden">
              <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
            </div>

            {/* Contenedor flexible para garantizar que el LinkedIn esté al final */}
            <div className="flex flex-col justify-between p-6 flex-1">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>

              {/* Icono de LinkedIn siempre al final */}
              <div className="mt-4">
                {member.linkedinUrl && (
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <img src="/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}