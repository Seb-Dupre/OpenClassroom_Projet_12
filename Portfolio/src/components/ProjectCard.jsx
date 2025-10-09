import "../style.css";

export default function ProjectCard({ project }) {
  return (
    <div className="">
      <img src={project.image} alt={project.title} className="project-image" />
      <h3 className="">{project.title}</h3>
    </div>
  );
}
