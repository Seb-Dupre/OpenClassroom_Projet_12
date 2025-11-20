import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({ slides }) {
  if (!slides || slides.length === 0) return null;

  const [index, setIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  const handlePrev = () => {
    setDirection("left");
    setPreviousIndex(index);
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection("right");
    setPreviousIndex(index);
    setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleTitleClick = () => {
    if (slides[index]?.url) window.open(slides[index].url, "_blank");
  };

  const getAnimationClass = (i) => {
    if (i === index) {
      return direction === "right"
        ? "animate-slide-in-right"
        : "animate-slide-in-left";
    }

    if (i === previousIndex) {
      return direction === "right"
        ? "animate-slide-out-left"
        : "animate-slide-out-right";
    }

    return "hidden";
  };

  return (
    <div className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden">
      <div className="w-full h-[60vh] md:h-[84vh] relative overflow-hidden">
        {slides.map((slide, i) => (
          <img
            key={i}
            src={slide.image}
            alt={slide.title ?? ""}
            className={`absolute top-0 left-0 w-full h-full object-cover ${getAnimationClass(
              i
            )}`}
          />
        ))}
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 text-white cursor-pointer"
      >
        <ChevronLeft size={100} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 text-white cursor-pointer"
      >
        <ChevronRight size={100} />
      </button>

      <div className="absolute bottom-0 w-full h-[10vh] md:h-[6vh] bg-color3 text-color4 flex flex-col md:flex-row justify-center md:justify-between md:items-center px-4 md:px-10">
        <h2
          onClick={handleTitleClick}
          className="text-lg md:text-2xl font-semibold hover:text-color2 cursor-pointer transition-colors"
        >
          {slides[index]?.title ?? "Sans titre"}
        </h2>

        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
          {slides[index]?.tags?.map((tag, i) => (
            <span
              key={i}
              className="bg-white text-color3 px-2 py-1 rounded text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
