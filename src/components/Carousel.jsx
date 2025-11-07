import { useState } from "react";

export default function Carousel({ slides }) {
  const [index, setIndex] = useState(0);

  if (!slides || slides.length === 0) {
    return (
      <div className="text-center text-gray-500">Aucun projet trouvé.</div>
    );
  }

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleClick = () => {
    window.open(slides[index].url, "_blank");
  };

  return (
    <div className="relative w-full h-[calc(100vh-10vh)] overflow-hidden">
      {/* Image principale */}
      <img
        src={slides[index].image}
        alt={slides[index].title}
        onClick={handleClick}
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* Flèches gauche/droite */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-4xl font-bold   rounded"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-4xl font-bold  rounded"
      >
        &gt;
      </button>

      {/* Barre titre + tags */}
      <div className="absolute bottom-0 w-full bg-[#52341B] text-white flex flex-col md:flex-row justify-between md:items-center px-4 md:px-10 py-2 md:py-3">
        <h2 className="text-lg md:text-2xl font-semibold">
          {slides[index].title}
        </h2>
        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
          {slides[index].tags.map((tag, i) => (
            <span
              key={i}
              className="bg-white text-[#52341B] px-2 py-1 rounded text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
