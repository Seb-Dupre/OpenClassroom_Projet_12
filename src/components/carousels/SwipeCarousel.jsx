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
    if (modalOpen) return;

    const x = dragX.get();
    if (x <= -DRAG_BUFFER) setIndex((prev) => (prev + 1) % total);
    else if (x >= DRAG_BUFFER) setIndex((prev) => (prev - 1 + total) % total);
  };

  if (slides.length === 0) return null;

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
              aspect-[16/9]
              overflow-hidden
            "
            animate={{ scale: index === i ? 0.97 : 0.9 }}
            transition={SPRING_OPTIONS}
          >
            {/* Image (n'intercepte pas les events) */}
            <img
              src={slide.image}
              alt={slide.title}
              width={1200}
              height={675}
              loading="lazy"
              className="
                absolute inset-0
                w-full h-full
                object-cover
                pointer-events-none
              "
            />

            {/* Overlay interactif */}
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
