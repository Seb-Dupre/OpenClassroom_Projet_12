// Dots.jsx
export default function Dots({
  current,
  total,
  onClick,
  className = "",
}) {
  return (
    <div
      className={`mt-4 flex w-full justify-center gap-3 ${className}`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onClick(i)}
          aria-label={`Go to slide ${i + 1}`}
          className={`
            h-3 w-3
            rounded-full cursor-pointer
            transition-colors
            ${
              current === i
                ? "bg-color2 scale-125"
                : "bg-inactive hover:bg-neutral-400 hover:scale-125 "
            }
          `}
        />
      ))}
    </div>
  );
}
