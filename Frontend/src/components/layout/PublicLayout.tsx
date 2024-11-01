import PublicNavbar from "../custom/PublicNavbar";
import { LayoutProps } from "@/types/types";
import SiteFooter from "../ui/site-footer";
import BackToTopButton from "../custom/BackToTopButton";

export default function PublicLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />
      <div className="flex-grow">{children}</div>
      <SiteFooter />
      <BackToTopButton />
    </div>
  );
}
