import { useState } from "react";
import "../style.css";

export default function Carousel({ slides }) {
  const [index, setIndex] = useState(0);

  if (!slides || slides.length === 0) {
    return <div className="">Aucun projet trouvé.</div>;
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
    <div className="">
      <div className="">
        <img
          src={slides[index].image}
          alt={slides[index].title}
          onClick={handleClick}
          className="project-image"
        />
      </div>
      <div className="">
        <button onClick={prevSlide} className="">
          Prev
        </button>
        <button onClick={nextSlide} className="">
          Next
        </button>
      </div>
    </div>
  );
}
