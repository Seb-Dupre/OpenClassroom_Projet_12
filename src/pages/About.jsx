import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import FormationCard from "../components/FormationCard";
import SkillCard from "../components/SkillCard";
import Container from "../components/Container";
import AboutNav from "../components/AboutNav";
import formationsData from "../data/formations.json";
import toolsData from "../data/tools.json";

export default function About() {
  const { t, i18n } = useTranslation();
  const [selectedSection, setSelectedSection] = useState("biography");

  const formations = formationsData;
  const tools = toolsData;

  // Grow like animation (scale + opacity)
  const renderSection = (key, content) => (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ transformOrigin: "center" }}
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <section className="text-color3 py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-12">
          {/* Navigation */}
          <div>
            <h1 className="text-4xl font-bold mb-8 text-color2_dark">
              {t("about.title")}
            </h1>

            <AboutNav
              selectedSection={selectedSection}
              onSelect={setSelectedSection}
            />
          </div>

          {/* Content */}
          <div>
            {selectedSection === "biography" &&
              renderSection(
                "biography",
                <div className="md:flex md:items-start gap-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl text-color2_dark font-semibold mb-5">
                      {t("about.bioSection")}
                    </h2>

                    <div className="border-2 w-80 flex mb-5 md:mb-10 border-color2_dark"></div>

                    <img
                      src="/images/profile.webp"
                      alt="My logo"
                      width="200"
                      height="200"
                      loading="lazy"
                      decoding="async"
                      className="float-left mr-4 mb-2 max-h-30 md:max-h-50 w-auto object-contain"
                    />

                    <p className="text-lg md:text-xl leading-relaxed whitespace-pre-line">
                      {t("about.descriptionExtended")}
                    </p>
                  </div>
                </div>,
              )}

            {selectedSection === "formation" &&
              renderSection(
                "formation",
                <div>
                  <h2 className="text-color2_dark text-2xl md:text-3xl text-center font-semibold mb-5">
                    {t("about.trainingSection")}
                  </h2>

                  <div className="border-2 flex mb-15 mx-auto border-color2_dark"></div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {formations.map((formation) => (
                      <FormationCard
                        key={formation.id}
                        logo={formation.logo}
                        title={formation.title[i18n.language]}
                        description={formation.description[i18n.language]}
                        tags={formation.tags}
                      />
                    ))}
                  </div>
                </div>,
              )}

            {selectedSection === "skills" &&
              renderSection(
                "skills",
                <div>
                  <h2 className="text-color2_dark text-2xl md:text-3xl text-center font-semibold mb-5">
                    {t("about.skillsSection")}
                  </h2>

                  <div className="border-2 w-150 flex mb-15 mx-auto border-color2_dark"></div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 justify-items-center">
                    {tools.map((tool) => (
                      <SkillCard
                        key={tool.name}
                        name={tool.name}
                        icon={tool.icon}
                        alt={tool.alt}
                        level={tool.level}
                        showLevel
                        skillIconSize="w-20 sm:w-24"
                        skillTitle="text-base md:text-lg"
                      />
                    ))}
                  </div>
                </div>,
              )}
          </div>
        </div>
      </Container>
    </section>
  );
}
