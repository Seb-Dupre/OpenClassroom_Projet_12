export default function Dots({ current, total, onClick, className = "" }) {
  return (
    <div
      className={`mt-4 flex w-full justify-center gap-3 ${className}`}
      role="tablist"
    >
      {Array.from({ length: total }).map((_, i) => {
        const isActive = current === i;

        return (
          <button
            key={i}
            onClick={() => onClick(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={isActive}
            role="tab"
            className={`
              h-3 w-3 rounded-full cursor-pointer
              transition-all duration-200
              ${
                isActive
                  ? "bg-color2 scale-125"
                  : "bg-inactive hover:bg-neutral-400 hover:scale-125"
              }
            `}
          />
        );
      })}
    </div>
  );
}
