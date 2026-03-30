export default function SlideOverlay({ title, tags = [], className = "" }) {
  return (
    <div
      className={`
        bg-color3_dark/80 backdrop-blur-sm p-3 rounded-xl text-white
        ${className}
      `}
      role="group"
      aria-label={title}
    >
      <h2 className="text-lg sm:text-2xl font-bold">{title}</h2>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-white/20 px-2 py-1 text-xs sm:text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
