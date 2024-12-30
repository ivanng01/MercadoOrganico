import CarouselHero from "../components/hero/CarouselHero";
import ProductCategories from "../components/category/ProductCategories";
import FeaturedProducts from "../components/product/FeaturedProducts";
import EventSection from "../components/events-card/EventSection";
import { events } from "../data/events";
import VideoHero from "../components/hero/VideoHero";
import ImageCarousel from "../components/gallery/ImageCarousel";
import TestimonialSlider from "../components/testimonial/TestimonialSlider";
import AdvertisementOrganic from "../components/advertisement/AdvertisementOrganic";
import { motion } from "framer-motion";

const fadeInDiagonal = {
  hidden: { opacity: 0, x: -50, y: 20 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

export default function Home() {
  return (
    <>
      <CarouselHero />

      <ProductCategories />

      <FeaturedProducts />

      <motion.div initial="hidden" whileInView="visible" variants={fadeInDiagonal} viewport={{ once: false }}>
        <VideoHero />
      </motion.div>

      <AdvertisementOrganic />

      <TestimonialSlider />

      <EventSection title="Nuestros próximos eventos" subtitle="Lo que viene" events={events} />

      <ImageCarousel />
    </>
  );
}
