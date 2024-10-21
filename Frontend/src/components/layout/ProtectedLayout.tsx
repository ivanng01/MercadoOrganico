import AuthenticatedNavbar from "../custom/AuthenticatedNavbar";
import { LayoutProps } from "@/types/types";
import SiteFooter from "../ui/site-footer";

export default function ProtectedLayout({ children }: LayoutProps) {
  return (
    <main className="flex flex-col min-h-screen">
      <AuthenticatedNavbar />

      <main className="flex-grow">{children}</main>

      <SiteFooter />
    </main>
  );
}
