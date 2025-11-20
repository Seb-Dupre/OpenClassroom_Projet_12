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
      })
      .catch((err) => console.error("Erreur chargement projets:", err));
  }, []);

  const handleFilter = (filtered) => setFilteredProjects(filtered);

  const favorites = projects.filter((p) => p.favorite);

  return (
    <div className="bg-color1 min-h-screen text-color3">
      {/* --- Titre principal --- */}
      <h1 className="text-3xl md:text-4xl font-semibold text-center pt-10 pb-10 text-color3">
        {t("projects.title")}
      </h1>

      {/* --- Section favoris --- */}
      <section className=" pb-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-color3 mb-10 text-center">
          {t("projects.favorites")}
        </h2>

        <div className="flex flex-col gap-16">
          {favorites.map((project, i) => (
            <div
              key={project.id}
              className={`flex flex-col md:flex-row items-start justify-center gap-8 ${
                i % 2 === 1
                  ? "md:flex-row-reverse px-4 py-4 bg-color4 md:bg-transparent md:py-0"
                  : "px-4 py-4 "
              }`}
            >
              {/* Image + tags */}
              <div className="w-full md:w-[40%] flex flex-col items-center md:items-start">
                <div className="relative w-full group rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full md:h-[300px] object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105 "
                  />

                  {project.url && (
                    <div
                      className="absolute inset-0 bg-black flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity rounded-2xl cursor-pointer"
                      onClick={() => window.open(project.url, "_blank")}
                    >
                      <span className="text-white text-lg md:text-xl font-semibold">
                        {t("projects.githubLink", "Vers le repo GitHub >")}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start ">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-color3 text-color4 px-3 py-1 rounded text-sm font-medium "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Texte */}
              <div
                className={`w-full md:w-[40%] flex flex-col justify-start ${
                  i === 1
                    ? "text-left md:text-right md:pr-4"
                    : "text-left md:text-left"
                }`}
              >
                <h3 className="text-2xl font-semibold mb-3 text-color3 cursor-default">
                  {project.title}
                </h3>

                <p
                  className={`text-lg text-color3 leading-relaxed ${
                    i === 1 ? "text-center md:text-right" : "text-center"
                  }`}
                >
                  {project.description ||
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Section tous les projets --- */}
      <section className="bg-color3 px-4 md:px-20 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-color4 mb-6 text-center">
          {t("projects.all")}
        </h2>

        <div className="flex justify-center mb-10 ">
          <Filter items={projects} onFilter={handleFilter} />
        </div>

        {/* Grille des projets */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {filteredProjects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
