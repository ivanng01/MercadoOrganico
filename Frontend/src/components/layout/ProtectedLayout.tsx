import AuthenticatedNavbar from "../custom/AuthenticatedNavbar";
import { LayoutProps } from "@/types/types";
import SideBarProducer from "@/pages/producer/components/SideBarProducer";

export default function ProtectedLayout({ children }: LayoutProps) {
  return (
    <main className="flex flex-col min-h-screen">
      <AuthenticatedNavbar />
      <div className="flex flex-grow">
        <section className="flex-shrink-0 w-auto">
          <SideBarProducer />
        </section>
        <div className="flex-grow p-4 transition-all duration-300">
          <div className="max-w-screen-2xl mx-auto">{children}</div>
        </div>
      </div>
    </main>
  );
}
