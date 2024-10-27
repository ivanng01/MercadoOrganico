import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TitleDecor } from "@/lib/iconsCustom";
import { teamInfo } from "../../data/teamInfo";
import { TeamMember } from "@/types/types";
import { X } from "lucide-react"; 

export default function TeamSection() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedMember = teamInfo.members?.find((member) => member.id === selectedId);

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
          {teamInfo.members.map((member: TeamMember) => (
            <motion.div
              key={member.id}
              layoutId={member.id.toString()}
              className="bg-card border-input border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col cursor-pointer"
              onClick={() => setSelectedId(member.id)}
            >
              <div className="aspect-square overflow-hidden">
                <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-between p-6 flex-1">
                <div className="space-y-4">
                  <motion.h3 className="text-xl font-semibold text-gray-800">{member.name}</motion.h3>
                  <motion.p className="font-medium" style={{ color: member.roleColor || "#000" }}>
                    {member.role}
                  </motion.p>
                  <motion.p className="text-gray-600 text-sm">{member.bio}</motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedId && selectedMember && (
            <motion.div
              layoutId={selectedId.toString()}
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 py-20"
              onClick={() => setSelectedId(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-lg overflow-hidden shadow-lg p-6 max-w-sm w-full relative"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <X
                  className="w-6 h-6 text-gray-800 absolute top-4 right-4 cursor-pointer"
                  onClick={() => setSelectedId(null)}
                />
                
                <div className="aspect-square overflow-hidden mt-6">
                  <img src={selectedMember.imageUrl} alt={selectedMember.name} className="w-full h-full object-cover" />
                </div>
                <motion.h3 className="text-xl font-semibold text-gray-800 mb-2">{selectedMember.name}</motion.h3>
                <motion.p className="font-medium mb-4" style={{ color: selectedMember.roleColor || "#000" }}>
                  {selectedMember.role}
                </motion.p>
                <motion.div className="text-gray-600 text-sm">{selectedMember.bio}</motion.div>
                <div className="mt-4">
                  {selectedMember.linkedinUrl && (
                    <a href={selectedMember.linkedinUrl} target="_blank" rel="noopener noreferrer">
                      <img src="/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
