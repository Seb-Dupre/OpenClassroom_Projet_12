import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Carousel from "../components/Carousel";

export default function Home() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [latestProjects, setLatestProjects] = useState([]);

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLatestProjects(data.slice(-3)); // Affiche les 3 derniers projet
      })
      .catch((err) =>
        console.error("Erreur lors du chargement des projets :", err)
      );
  }, []);

  return (
    <div>
      <h1>{t("home.welcome")}</h1>

      {latestProjects.length > 0 ? (
        <Carousel slides={latestProjects} />
      ) : (
        <p>{t("home.loading")}</p>
      )}

      <div>
        {/* plus tard : section diplômes, compétences, liens LinkedIn, GitHub, contact */}
      </div>
    </div>
  );
}
