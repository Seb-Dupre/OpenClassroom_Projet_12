export default function SkillCard({
  name,
  icon,
  level = 70,
  showLevel = true,
}) {
  return (
    <div className="flex flex-col items-center text-center w-50 md:w-36">
      <img
        src={icon}
        alt={name}
        className="w-40  md:w-20 md:h-20 object-contain mb-2"
      />

      <p className="text-color3 font-medium text-lg md:text-xl mb-2">{name}</p>

      {/* Barre de progression — affichée seulement si showLevel = true */}
      {showLevel && (
        <div className="w-full bg-color4 rounded-full h-3 shadow-inner">
          <div
            className="bg-color2 h-3 rounded-full transition-all"
            style={{ width: `${level}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}
