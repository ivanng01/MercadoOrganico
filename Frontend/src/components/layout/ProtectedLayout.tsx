import AuthenticatedNavbar from "../custom/AuthenticatedNavbar";
import { LayoutProps } from "@/types/types";
import SideBarProducer from "@/pages/producer/components/SideBarProducer";

export default function ProtectedLayout({ children }: LayoutProps) {
  return (
    <main className="flex flex-col min-h-screen">
      <AuthenticatedNavbar />
      <div className="flex flex-grow bg-foreground gap-4">
        <SideBarProducer />

        <div className="flex-grow p-4">{children}</div>
      </div>
    </main>
  );
}
