import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Carousel from "../components/Carousel";
import SkillCard from "../components/SkillCard";
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
      .then((data) => setTools(data))
      .catch((err) =>
        console.error("Erreur lors du chargement des outils :", err)
      );
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero / Carousel */}
      <Carousel slides={latestProjects} />

      {/* Section À propos */}
      <section className="py-12 px-6 md:px-20  bg-color1">
        <h1 className="text-3xl md:text-4xl font-semibold text-color3 text-center mb-15">
          {t("home.welcome")}
        </h1>
        <div className="flex flex-row  items-center justify-center gap-6">
          <img
            src="/images/profile.png"
            alt="Moi"
            className="hidden md:block w-40 h-40 md:w-80 md:h-80 rounded-full object-cover"
          />
          <div className="flex flex-col items-start">
            <h2 className="text-2xl md:text-3xl font-semibold text-color3 mb-4">
              {t("home.aboutTitle")}
            </h2>
            <p className="max-w-lg text-gray-700  md:text-lg">
              {t("home.aboutText")}
            </p>
            <Link
              to="/about"
              className="inline-block mt-6 bg-color3 hover:bg-color2  text-color4 px-6 py-2 rounded font-medium"
            >
              {t("home.aboutButton")}
            </Link>
          </div>
        </div>
      </section>

      {/* Section outils récents */}
      <section className="py-12 px-6 md:px-20 bg-linear-to-b from-color1 to-color2 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-color3 mb-6">
          {t("home.latestToolsTitle")}
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          {tools.slice(-3).map((tool) => (
            <SkillCard
              key={tool.name}
              name={tool.name}
              icon={tool.icon}
              showLevel={false}
            />
          ))}
        </div>
      </section>

      {/* Section contact */}
      <section className="py-12 px-6 md:px-20 text-center bg-color3 flex flex-col items-center ">
        <div className="bg-color4 py-15 px-25 flex flex-col items-center max-w-150 ">
          <h2 className="text-2xl md:text-3xl font-semibold text-color3 mb-4 w 100">
            {t("home.contactTitle")}
          </h2>
          <p className="text-gray-600 mb-6 text-xl">{t("home.contactText")}</p>
          <Link
            to="/contact"
            className="inline-block bg-color3 hover:bg-color2 text-xl text-color4 px-6 py-2 rounded font-medium"
          >
            {t("home.contactButton")}
          </Link>
        </div>
      </section>
    </div>
  );
}
