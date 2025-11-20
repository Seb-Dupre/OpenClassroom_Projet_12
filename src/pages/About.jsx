import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FormationCard from "../components/FormationCard";
import SkillCard from "../components/SkillCard";
import { Grow } from "@mui/material";

export default function About() {
  const { t, i18n } = useTranslation();
  const [selectedSection, setSelectedSection] = useState("about");
  const [formations, setFormations] = useState([]);
  const [tools, setTools] = useState([]);

  useEffect(() => {
    fetch("/formations.json")
      .then((res) => res.json())
      .then((data) => setFormations(data))
      .catch((err) => console.error("Erreur chargement formations :", err));
  }, []);

  useEffect(() => {
    fetch("/tools.json")
      .then((res) => res.json())
      .then((data) => setTools(data))
      .catch((err) => console.error("Erreur chargement outils :", err));
  }, []);

  const renderSection = (sectionContent) => (
    <Grow in mountOnEnter unmountOnExit timeout={500}>
      {sectionContent}
    </Grow>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-color1 text-color3">
      {/* --- Barre de navigation verticale --- */}
      <aside className="w-full md:w-48 bg-color3 text-color4 flex md:flex-col justify-center md:justify-start md:py-12 px-4 md:px-2 gap-4">
        {[
          { key: "about", label: t("about.section.aboutMe") },
          { key: "formation", label: t("about.section.training") },
          { key: "skills", label: t("about.section.skills") },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setSelectedSection(item.key)}
            className={`w-full py-3 text-center transition-colors cursor-pointer ${
              selectedSection === item.key
                ? "bg-color2 text-color4"
                : "hover:bg-color2 hover:text-color4"
            }`}
          >
            {item.label}
          </button>
        ))}
      </aside>

      {/* --- Contenu --- */}
      <main className="flex-1 p-6 md:p-10">
        {selectedSection === "about" &&
          renderSection(
            <div className="flex flex-col md:flex-row items-start gap-6">
              <img
                src="/images/profile.png"
                alt="Moi"
                className="w-40 h-40 md:w-100 md:h-100 object-cover md:mr-8"
              />
              <p className="text-lg md:text-xl leading-relaxed text-center md:text-left">
                {t("about.descriptionExtended", {
                  defaultValue:
                    "Étudiant en tant qu'intégrateur web sur OpenClassrooms, je souhaite approfondir mes connaissances.",
                })}
              </p>
            </div>
          )}

        {selectedSection === "formation" &&
          renderSection(
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
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
          )}

        {selectedSection === "skills" &&
          renderSection(
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center mt-4">
              {tools.map((tool, index) => (
                <SkillCard
                  key={index}
                  name={tool.name}
                  icon={tool.icon}
                  level={tool.level}
                  showLevel={true}
                />
              ))}
            </div>
          )}
      </main>
    </div>
  );
}
