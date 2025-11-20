export default function FormationCard({ logo, title, description, tags }) {
  return (
    <div className="bg-color4 rounded-2xl shadow-md p-4 flex flex-col gap-3">
      <img src={logo} alt={title} className="w-20 h-20 object-contain mb-2" />
      <h3 className="text-xl font-semibold text-color3">{title}</h3>
      <p className="text-color3 text-sm md:text-base">{description}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-color3 text-color4 px-2 py-1 rounded text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
