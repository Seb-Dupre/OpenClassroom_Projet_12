import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FormationCard from "../components/FormationCard";
import SkillCard from "../components/SkillCard";

export default function About() {
  const { t, i18n } = useTranslation();
  const [selectedSection, setSelectedSection] = useState("about");
  const [formations, setFormations] = useState([]);
  const [tools, setTools] = useState([]);

  // Récupération des formations
  useEffect(() => {
    fetch("/formations.json")
      .then((res) => res.json())
      .then((data) => setFormations(data))
      .catch((err) =>
        console.error("Erreur lors du chargement des formations :", err)
      );
  }, []);

  // Récupération des outils/compétences
  useEffect(() => {
    fetch("/tools.json")
      .then((res) => res.json())
      .then((data) => setTools(data))
      .catch((err) =>
        console.error("Erreur lors du chargement des outils :", err)
      );
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => setSelectedSection("about")}>
          {t("about.section.aboutMe")}
        </button>
        <button onClick={() => setSelectedSection("formation")}>
          {t("about.section.training")}
        </button>
        <button onClick={() => setSelectedSection("skills")}>
          {t("about.section.skills")}
        </button>
      </div>

      {selectedSection === "about" && (
        <div>
          <img src="/me.jpg" alt="Moi" width="160" height="160" />
          <p>
            {t("about.descriptionExtended", {
              defaultValue:
                "Étudiant en tant qu'intégrateur web sur OpenClassrooms, je souhaite approfondir mes connaissances.",
            })}
          </p>
        </div>
      )}

      {selectedSection === "formation" && (
        <div>
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

      {selectedSection === "skills" && (
        <div>
          <h2>{t("skills.title")}</h2>
          {tools.map((tool, index) => (
            <SkillCard key={index} name={tool.name} icon={tool.icon} />
          ))}
        </div>
      )}
    </div>
  );
}
