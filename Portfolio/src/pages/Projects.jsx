import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProjectCard from "../components/ProjectCard";
import Filter from "../components/Filter";

export default function Projects() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setFilteredProjects(data);
      });
  }, []);

  const handleFilter = (filtered) => setFilteredProjects(filtered);

  return (
    <div>
      <h1>{t("projects.title")}</h1>

      <h2>{t("projects.favorites")}</h2>
      <div>
        {projects
          .filter((p) => p.favorite)
          .map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
      </div>

      <h2>{t("projects.all")}</h2>
      <Filter items={projects} onFilter={handleFilter} />

      <div>
        {filteredProjects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}
