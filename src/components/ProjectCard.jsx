import "../style.css";

export default function ProjectCard({ project }) {
  return (
    <div
      className="
        bg-color1 rounded-2xl overflow-hidden shadow-md
        w-full h-full
        flex flex-col
        transition-transform hover:scale-105
        cursor-pointer
      "
    >
      <img
        src={project.image}
        alt={project.alt}
        className="w-full h-52 object-cover"
      />

      <div className="p-4 flex flex-col gap-2 ">
        <h3 className="text-xl font-semibold text-color3">{project.title}</h3>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-color3 text-color4 px-2 py-1 rounded text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
