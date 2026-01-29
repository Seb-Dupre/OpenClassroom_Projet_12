import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectModal from "../ProjectModal";
import GradientEdges from "./shared/GradientEdges";
import SlideOverlay from "./shared/SlideOverlay";
import Dots from "./shared/Dots";

export default function DesktopCarousel({ slides = [] }) {
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const total = slides.length;

  useEffect(() => {
    if (modalOpen || total < 2) return;

    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % total),
      10000,
    );
    return () => clearInterval(interval);
  }, [total, modalOpen]);

  if (slides.length === 0) {
    return (
      <div
        className="bg-inactive h-[80vh] max-h-[900px]"
        
      />
    );
  }

  const currentSlide = slides[index];

  return (
    <div className="relative overflow-hidden bg-color3_dark py-8 px-8 flex flex-col items-center">
      <div
        className="relative w-full max-w-[1700px] rounded-xl overflow-hidden h-[80vh] max-h-[900px]"
      >
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
            transition={{ type: "tween", duration: 0.4 }}
          />
        ))}

        <GradientEdges />

        <div
          className="absolute bottom-4 left-4 cursor-pointer group z-10"
          onClick={() => setModalOpen(true)}
        >
          <SlideOverlay
            title={currentSlide.title}
            tags={currentSlide.tags}
            className="w-[380px]"
          />
        </div>

        {/* Chevron gauche */}

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

      {/* DOTS AVEC HAUTEUR FIXE */}
      <div className="h-[32px] mt-2">
        <Dots current={index} total={total} onClick={setIndex} />
      </div>

      {/* MODAL SEULEMENT SI OUVERT */}
      {modalOpen && (
        <ProjectModal
          project={currentSlide}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
