import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectModal from "../ProjectModal";
import GradientEdges from "./shared/GradientEdges";
import SlideOverlay from "./shared/SlideOverlay";
import Dots from "./shared/Dots";
import Container from "../Container";

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
      <div className="relative h-[80vh] rounded-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id || index}
            className="absolute inset-0 bg-cover bg-center rounded-xl"
            style={{ backgroundImage: `url(${currentSlide.image})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={FADE_OPTIONS}
          >
            {/* slide overlay */}
            <div
              className="absolute bottom-4 left-4 cursor-pointer group"
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
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <button
          aria-label="Previous slide"
          onClick={() => setIndex((i) => (i - 1 + total) % total)}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full z-10"
        >
          <ChevronLeft size={28} />
        </button>

        <button
          aria-label="Next slide"
          onClick={() => setIndex((i) => (i + 1) % total)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full z-10"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Dots */}
      <Dots current={index} total={total} onClick={setIndex} />

      <GradientEdges />

      <ProjectModal
        project={currentSlide}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
