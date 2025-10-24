import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Carousel from "../components/Carousel";
import { Link } from "react-router-dom";

export default function Home() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [latestProjects, setLatestProjects] = useState([]);
  const [tools, setTools] = useState([]);

  // Charger les projets
  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLatestProjects(data.slice(-3));
      })
      .catch((err) =>
        console.error("Erreur lors du chargement des projets :", err)
      );
  }, []);

  // Charger les outils
  useEffect(() => {
    fetch("/tools.json")
      .then((res) => res.json())
      .then((data) => setTools(data.slice(-3)))
      .catch((err) =>
        console.error("Erreur lors du chargement des outils :", err)
      );
  }, []);

  return (
    <div>
      {/* Titre principal */}
      <h1>{t("home.welcome")}</h1>

      {/* Carousel des projets */}
      {latestProjects.length > 0 ? (
        <Carousel slides={latestProjects} />
      ) : (
        <p>{t("home.loading")}</p>
      )}

      {/* Section À propos */}
      <section>
        <h2>{t("home.aboutTitle")}</h2>
        <div>
          <img
            src="/images/profile.jpg" // Image de profil ou logo
            alt="Moi"
            width="150"
          />
          <p>{t("home.aboutText")}</p>
        </div>
        <Link to="/about">{t("home.aboutButton")}</Link>
      </section>

      {/* Section outils récents */}
      <section>
        <h2>{t("home.latestToolsTitle")}</h2>
        <div>
          {tools.map((tool) => (
            <div key={tool.name}>
              <img src={tool.icon} alt={tool.name} width="50" />
              <p>{tool.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section contact */}
      <section>
        <h2>{t("home.contactTitle")}</h2>
        <p>{t("home.contactText")}</p>
        <Link to="/contact">{t("home.contactButton")}</Link>
      </section>
    </div>
  );
}
