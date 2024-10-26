import Header from "../components/header/Header";
import Partner from "../components/partner/Partner";
import VideoHero from "../components/hero/VideoHero";
import TeamSection from "../components/team/TeamSection";
import AboutInfo from "../components/about/AboutInfo";

export default function About() {
  return (
    <>
      <Header title="Sobre Nosotros" />
      <AboutInfo />
      <Partner />
      <VideoHero />
      <TeamSection />
    </>
  );
}
