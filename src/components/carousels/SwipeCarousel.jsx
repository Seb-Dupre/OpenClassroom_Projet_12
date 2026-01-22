import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

import SlideOverlay from "./shared/SlideOverlay";
import Dots from "./shared/Dots";
import GradientEdges from "./shared/GradientEdges";
import ProjectModal from "../ProjectModal";
import { SPRING_OPTIONS } from "./shared/animation";

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

export default function SwipeCarousel({ slides = [] }) {
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const dragX = useMotionValue(0);
  const total = slides.length;

  //Stop auto-slide when modal is open
  useEffect(() => {
    if (modalOpen) return;

    const interval = setInterval(() => {
      if (dragX.get() === 0) {
        setIndex((prev) => (prev + 1) % total);
      }
    }, AUTO_DELAY);

    return () => clearInterval(interval);
  }, [total, modalOpen]);

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
            className="w-full shrink-0 h-[60vh]  rounded-lg  bg-neutral-900 p-3  flex flex-col justify-end"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            animate={{ scale: index === i ? 0.97 : 0.9 }}
            transition={SPRING_OPTIONS}
          >
            <div onClick={() => setModalOpen(true)}>
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
