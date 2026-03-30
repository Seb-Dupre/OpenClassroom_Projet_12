import "../style.css";

export default function ProjectCard({ project }) {
  return (
    <div
      className="
        bg-color1 rounded-2xl overflow-hidden shadow-md
        w-full h-full flex flex-col
        transition-transform duration-200 hover:scale-105
        cursor-pointer
      "
      role="article"
    >
      <img
        src={project.image_md}
        srcSet={`${project.image_sm} 400w, ${project.image_md} 800w`}
        sizes="(min-width: 1024px) 300px, 100vw"
        alt={project.alt || project.title}
        width="800"
        height="450"
        loading="lazy"
        decoding="async"
        className="w-full h-52 object-cover"
      />

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-xl font-semibold text-color3">{project.title}</h3>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
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
