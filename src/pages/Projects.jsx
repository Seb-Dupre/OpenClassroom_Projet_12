import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import projectsData from "../data/projects.json";
import ProjectCard from "../components/ProjectCard";
import Filter from "../components/Filter";
import ProjectModal from "../components/ProjectModal";
import Container from "../components/Container";

export default function Projects() {
  const { t, i18n } = useTranslation();

  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleFilter = (filtered) => setFilteredProjects(filtered);

  const favorites = useMemo(() => projectsData.filter((p) => p.favorite), []);

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setModalOpen(false);
  };

  return (
    <main className="bg-color1 min-h-screen text-color3">
      <Container>
        <h1 className="text-3xl md:text-4xl font-semibold text-center pt-10 pb-10">
          {t("projects.title")}
        </h1>
      </Container>

      {/* Favorites */}
      <section className="pb-10">
        <Container>
          <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center">
            {t("projects.favorites")}
          </h2>
        </Container>

        <div className="flex flex-col">
          {favorites.map((project, i) => {
            const isOdd = i % 2 !== 0;

            return (
              <div key={project.id} className={isOdd ? "bg-color1_light" : ""}>
                <Container>
                  <div
                    className={`flex flex-col md:flex-row items-start justify-center gap-8 ${
                      isOdd ? "md:flex-row-reverse" : ""
                    } py-4 md:py-8`}
                  >
                    {/* Mobile title */}
                    <h3 className="block md:hidden text-2xl font-semibold text-color3 text-center">
                      {project.title}
                    </h3>

                    {/* Image */}
                    <div className="w-full md:w-[40%] flex flex-col items-center md:items-start">
                      <div className="relative w-full group rounded-2xl overflow-hidden shadow-xl">
                        <div className="w-full aspect-[16/9]">
                          <img
                            src={project.image_md}
                            alt={project.title}
                            width="800"
                            height="450"
                            loading={i === 0 ? "eager" : "lazy"}
                            fetchPriority={i === 0 ? "high" : "auto"}
                            decoding="async"
                            className="
                              w-full h-full object-cover rounded-2xl
                              transition-transform duration-300
                              group-hover:scale-105
                              transform-gpu will-change-transform
                            "
                          />
                        </div>

                        {project.url && (
                          <div
                            className="absolute inset-0 bg-black flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity rounded-2xl cursor-pointer"
                            onClick={() => window.open(project.url, "_blank")}
                          >
                            <span className="text-white text-lg md:text-xl font-semibold">
                              {t("projects.githubLink")}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-color3 text-color4 px-3 py-1 rounded text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Text */}
                    <div
                      className={`w-full md:w-[40%] flex flex-col ${
                        isOdd ? "md:text-right pr-4" : "md:text-left"
                      }`}
                    >
                      <h3 className="hidden md:block text-2xl font-semibold mb-3 text-color3">
                        {project.title}
                      </h3>

                      <p className="text-lg text-color3 leading-relaxed px-10 md:px-0">
                        {project.description?.[i18n.language] ||
                          t("projects.noDescription")}
                      </p>
                    </div>
                  </div>
                </Container>
              </div>
            );
          })}
        </div>
      </section>

      {/* All projects */}
      <section className="bg-color3 py-12">
        <Container>
          <h2 className="text-2xl md:text-3xl font-semibold text-color4 mb-6 text-center">
            {t("projects.all")}
          </h2>

          <div className="flex justify-center mb-10">
            <Filter items={projectsData} onFilter={handleFilter} />
          </div>

          {/* Grow like animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filteredProjects.length}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => openModal(p)}
                  className="cursor-pointer w-full"
                >
                  <ProjectCard project={p} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        open={modalOpen}
        onClose={closeModal}
      />
    </main>
  );
}
