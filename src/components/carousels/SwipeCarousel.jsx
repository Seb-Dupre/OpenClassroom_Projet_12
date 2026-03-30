import React, { useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import SlideOverlay from "./shared/SlideOverlay";
import Dots from "./shared/Dots";
import GradientEdges from "./shared/GradientEdges";
import ProjectModal from "../ProjectModal";
import { SPRING_OPTIONS } from "./shared/animation";

const DRAG_BUFFER = 50;

export default function SwipeCarousel({ slides = [] }) {
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const dragX = useMotionValue(0);
  const total = slides.length;

  const onDragEnd = () => {
    if (modalOpen || total === 0) return;

    const x = dragX.get();
    if (x <= -DRAG_BUFFER) setIndex((prev) => (prev + 1) % total);
    else if (x >= DRAG_BUFFER) setIndex((prev) => (prev - 1 + total) % total);
  };

  // PLACEHOLDER
  if (total === 0) {
    return <div className="bg-inactive h-[56vw] max-h-[300px]" />;
  }

  const currentSlide = slides[index];

  return (
    <div className="relative overflow-hidden bg-color3_dark py-4 sm:py-8">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x: dragX }}
        animate={{ translateX: `-${index * 100}%` }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab active:cursor-grabbing"
      >
        {slides.map((slide, i) => (
          <motion.div
            key={slide.id || i}
            className="
              relative
              w-full
              shrink-0
              rounded-lg
              bg-neutral-900
              p-3
              flex
              flex-col
              justify-end
              overflow-hidden
              aspect-video
            "
            animate={{ scale: index === i ? 0.97 : 0.9 }}
            transition={SPRING_OPTIONS}
          >
            {/* Image */}
            <img
              src={slide.image_md}
              srcSet={`
              ${slide.image_sm} 450w,
              ${slide.image_md} 768w`}
              sizes="100vw"
              alt={slide.title}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              decoding="async"
              className=" absolute inset-0 w-full h-full object-cover pointer-events-none"
            />

            {/* Overlay */}
            <div className="relative z-10" onClick={() => setModalOpen(true)}>
              <SlideOverlay
                title={slide.title}
                tags={slide.tags}
                className="max-w-[90%] cursor-pointer"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* DOTS  */}
      <div className="h-8 mt-4">
        <Dots current={index} total={total} onClick={setIndex} />
      </div>

      <GradientEdges />

      {/* MODAL */}
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
