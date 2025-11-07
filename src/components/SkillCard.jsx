export default function SkillCard({ name, icon }) {
  return (
    <div className="flex flex-col-reverse md:flex-col items-center text-center">
      {/* Logo */}
      <img src={icon} alt={name} className="w-25 md:w-30  object-contain" />

      {/* Nom */}
      <p className="mt-2 text-[#4a2b0b] font-medium text-lg md:text-xl">
        {name}
      </p>
    </div>
  );
}

// ajouté une bar de pourcentage sur la connaissance de l'outil
