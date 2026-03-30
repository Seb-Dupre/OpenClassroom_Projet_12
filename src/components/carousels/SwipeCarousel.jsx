import React, { useState, useEffect, lazy, Suspense } from "react";
import { motion, useMotionValue } from "framer-motion";
import SlideOverlay from "./shared/SlideOverlay";
import Dots from "./shared/Dots";
import GradientEdges from "./shared/GradientEdges";
import { SPRING_OPTIONS } from "./shared/animation";

const ProjectModal = lazy(() => import("../ProjectModal"));

const DRAG_BUFFER = 50;

export default function SwipeCarousel({ slides = [] }) {
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const dragX = useMotionValue(0);
  const total = slides.length;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const onDragEnd = () => {
    if (modalOpen || total === 0) return;

    const x = dragX.get();
    if (x <= -DRAG_BUFFER) setIndex((prev) => (prev + 1) % total);
    else if (x >= DRAG_BUFFER) setIndex((prev) => (prev - 1 + total) % total);
  };

  if (total === 0) {
    return <div className="bg-inactive h-[56vw] max-h-[300px]" />;
  }

  const currentIndex = index;

  return (
    <div className="relative overflow-hidden bg-color3_dark py-4 sm:py-8">
      <motion.div
        drag={hasMounted ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x: dragX }}
        initial={false}
        animate={
          hasMounted
            ? { translateX: `-${index * 100}%` }
            : { translateX: `-${index * 100}%` }
        }
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab active:cursor-grabbing"
      >
        {slides.map((slide, i) => {
          const isActive = i === currentIndex;
          const isNear =
            i === currentIndex ||
            i === currentIndex - 1 ||
            i === currentIndex + 1;

          return (
            <motion.div
              key={slide.id || i}
              className="
                relative w-full shrink-0 rounded-lg
                bg-neutral-900 p-3 flex flex-col
                justify-end overflow-hidden aspect-video
              "
              animate={hasMounted ? { scale: isActive ? 0.97 : 0.9 } : false}
              transition={SPRING_OPTIONS}
            >
              {/* IMAGE */}
              {isNear && (
                <img
                  src={slide.image_md}
                  srcSet={`
                    ${slide.image_sm} 450w,
                    ${slide.image_md} 768w
                  `}
                  sizes="100vw"
                  alt={slide.title}
                  width="768"
                  height="432"
                  loading={isActive ? "eager" : "lazy"}
                  fetchPriority={isActive ? "high" : "auto"}
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              )}

              <div className="relative z-10" onClick={() => setModalOpen(true)}>
                <SlideOverlay
                  title={slide.title}
                  tags={slide.tags}
                  className="max-w-[90%] cursor-pointer"
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="h-8 mt-4">
        <Dots current={index} total={total} onClick={setIndex} />
      </div>

      <GradientEdges />

      {modalOpen && (
        <Suspense fallback={null}>
          <ProjectModal
            project={slides[index]}
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
}
