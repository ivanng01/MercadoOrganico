import { TitleDecor } from "@/lib/iconsCustom";
import { teamInfo } from "../../data/teamInfo";

export default function TeamSection() {
  if (!teamInfo.members) {
    return <div>No hay miembros en el equipo.</div>;
  }
  return (
    <section className="px-4 lg:px-[120px] bg-foreground">
      <div className="w-full py-16 max-w-screen-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex flex-col items-center justify-center gap-2 mb-4">
            <TitleDecor className="h-8 w-8 text-primary" />
            <span className="text-primary text-xl font-semibold">{teamInfo.title}</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">{teamInfo.subtitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamInfo.members.map((member) => (
            <div
              key={member.id}
              className="bg-card border-input border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              <div className="aspect-square overflow-hidden">
                <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex flex-col justify-between p-6 flex-1">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>

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
    </section>
  );
}
