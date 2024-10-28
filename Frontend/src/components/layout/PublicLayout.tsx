import PublicNavbar from "../custom/PublicNavbar";
import { LayoutProps } from "@/types/types";
import SiteFooter from "../ui/site-footer";
import BackToTopButton from "../custom/BackToTopButton";

export default function PublicLayout({ children }: LayoutProps) {
  return (
    <main className="flex flex-col min-h-screen">
      <PublicNavbar />

      <main className="flex-grow">{children}</main>
      <BackToTopButton />
      <SiteFooter />
    </main>
  );
}
