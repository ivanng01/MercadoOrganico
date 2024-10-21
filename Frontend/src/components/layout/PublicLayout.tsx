import { SiteFooter } from "@/components/ui/site-footer";
import PublicNavbar from "../custom/PublicNavbar";
import { LayoutProps } from "@/types/types";

export default function PublicLayout({ children }: LayoutProps) {
  return (
    <main className="flex flex-col min-h-screen">
      <PublicNavbar />

      <main className="flex-grow">{children}</main>

      <SiteFooter />
    </main>
  );
}
