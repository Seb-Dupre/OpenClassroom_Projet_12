export default function SlideOverlay({ title, tags = [], className = "" }) {
  return (
    <div
      className={`
        bg-color3_dark/80 backdrop-blur-sm p-3  rounded-xl text-white
        ${className}
      `}
    >
      <h2 className="text-lg sm:text-2xl font-bold">{title}</h2>

      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, j) => (
          <span
            key={j}
            className="bg-white/20 px-2 py-1 text-xs sm:text-sm rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
