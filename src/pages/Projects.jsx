import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProjectCard from "../components/ProjectCard";
import Filter from "../components/Filter";
import ProjectModal from "../components/ProjectModal";
import { Grow } from "@mui/material";
import Container from "../components/Container";

export default function Projects() {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

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

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setModalOpen(false);
  };

  return (
    <div className="bg-color1 min-h-screen text-color3">
      <Container>
        <h1 className="text-3xl md:text-4xl font-semibold text-center pt-10 pb-10">
          {t("projects.title")}
        </h1>
      </Container>

      {/* Favoris*/}
      <section className="pb-10">
        <Container>
          <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center">
            {t("projects.favorites")}
          </h2>
        </Container>

        <div className="flex flex-col">
          {favorites.map((project, i) => {
            const isEven = i % 2 === 0;
            const isOdd = !isEven;

            return (
              <div
                key={project.id}
                className={`${isOdd ? "bg-color1_light" : ""}`}
              >
                <Container>
                  <div
                    className={`flex flex-col md:flex-row items-start justify-center gap-8 ${
                      isOdd ? "md:flex-row-reverse" : ""
                    } py-4 md:py-8`}
                  >
                    {/* Titre Mobile */}
                    <h3 className="block md:hidden text-2xl font-semibold text-color3 text-center">
                      {project.title}
                    </h3>

                    {/* Image et Tags */}
                    <div className="w-full md:w-[40%] flex flex-col items-center md:items-start">
                      <div className="relative w-full group rounded-2xl overflow-hidden shadow-xl">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-[300px] object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                        />

                        {project.url && (
                          <div
                            className="absolute inset-0 bg-black flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity rounded-2xl cursor-pointer"
                            onClick={() => window.open(project.url, "_blank")}
                          >
                            <span className="text-white text-lg md:text-xl font-semibold">
                              {t(
                                "projects.githubLink",
                                "Vers le repo GitHub >",
                              )}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-color3 text-color4 px-3 py-1 rounded text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Texte et Titre Desktop*/}
                    <div
                      className={`w-full md:w-[40%] flex flex-col justify-start ${
                        isOdd ? "md:text-right pr-4" : "md:text-left"
                      }`}
                    >
                      {/* Titre Desktop */}
                      <h3 className="hidden md:block text-2xl font-semibold mb-3 text-color3 cursor-default">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p
                        className={`text-lg text-color3 leading-relaxed px-10 md:px-0 ${
                          isOdd ? " md:text-right" : "md:text-left"
                        }`}
                      >
                        {project.description?.[i18n.language] ||
                          t(
                            "projects.noDescription",
                            "Description non disponible",
                          )}
                      </p>
                    </div>
                  </div>
                </Container>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tous mes Projets*/}
      <section className="bg-color3 py-12">
        <Container>
          <h2 className="text-2xl md:text-3xl font-semibold text-color4 mb-6 text-center">
            {t("projects.all")}
          </h2>

          <div className="flex justify-center mb-10">
            <Filter items={projects} onFilter={handleFilter} />
          </div>

          <Grow in timeout={400}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => openModal(p)}
                  className="cursor-pointer w-full"
                >
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          </Grow>
        </Container>
      </section>

      <ProjectModal
        project={selectedProject}
        open={modalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
