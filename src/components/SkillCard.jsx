import { useEffect, useState } from "react";

export default function SkillCard({
  name,
  icon,
  alt,
  level = 50,
  showLevel = true,
  skillIconSize = "",
  skillTitle = "",
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(level);
    }, 300);

    return () => clearTimeout(timeout);
  }, [level]);

  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={icon}
        alt={alt || name}
        width="64"
        height="64"
        loading="lazy"
        decoding="async"
        className={`object-contain mb-2 ${skillIconSize}`}
      />

      <p className={`text-color3 font-medium mb-2 ${skillTitle}`}>{name}</p>

      {showLevel && (
        <div
          className="w-25 bg-color4 rounded-full h-3 shadow-inner overflow-hidden"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`${name} level`}
        >
          <div
            className="bg-color2 h-3 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
