import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectModal from "../ProjectModal";
import GradientEdges from "./shared/GradientEdges";
import SlideOverlay from "./shared/SlideOverlay";
import Dots from "./shared/Dots";

const AUTO_DELAY = 10000;
const FADE_OPTIONS = { type: "tween", duration: 0.4 };

export default function DesktopCarousel({ slides = [] }) {
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const total = slides.length;

  useEffect(() => {
    if (modalOpen || total === 0) return;

    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % total),
      AUTO_DELAY,
    );
    return () => clearInterval(interval);
  }, [total, modalOpen]);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[index];

  return (
    <div className="relative overflow-hidden bg-color3_dark py-8 px-8 z-45">
      {/* Container  */}
      <div className="relative aspect-video max-h-[80vh] w-full rounded-xl overflow-hidden">
        {/* Slides*/}
        {slides.map((slide, i) => (
          <motion.img
            key={slide.id || i}
            src={slide.image}
            alt={slide.title}
            width={1600}
            height={900}
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={FADE_OPTIONS}
          />
        ))}

        {/* Overlay */}
        <div
          className="absolute bottom-4 left-4 cursor-pointer group z-10"
          onClick={() => setModalOpen(true)}
        >
          <SlideOverlay
            title={currentSlide.title}
            tags={currentSlide.tags}
            className="
              w-[380px]
              transition-colors
              group-hover:text-color2
            "
          />
        </div>

        {/* Navigation */}
        <button
          aria-label="Previous slide"
          onClick={() => setIndex((i) => (i - 1 + total) % total)}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full z-10 cursor-pointer"
        >
          <ChevronLeft size={40} />
        </button>

        <button
          aria-label="Next slide"
          onClick={() => setIndex((i) => (i + 1) % total)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full z-10 cursor-pointer"
        >
          <ChevronRight size={40} />
        </button>
      </div>

      {/* Dots */}
      <Dots current={index} total={total} onClick={setIndex} />

      <GradientEdges />

      {/* Modal */}
      <ProjectModal
        project={currentSlide}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
