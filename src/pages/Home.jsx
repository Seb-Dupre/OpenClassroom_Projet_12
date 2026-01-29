import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ResponsiveCarousel from "../components/carousels/ResponsiveCarousel";
import SkillCard from "../components/SkillCard";
import { Link } from "react-router-dom";
import Container from "../components/Container";

export default function Home() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [latestProjects, setLatestProjects] = useState([]);
  const [tools, setTools] = useState([]);

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLatestProjects(data.slice(-3));
      });
  }, []);

  useEffect(() => {
    fetch("/tools.json")
      .then((res) => res.json())
      .then((data) => setTools(data));
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero*/}
      <ResponsiveCarousel slides={latestProjects} />
      {/* À propos */}
      <section className="py-12 bg-color1">
        <Container>
          <h1 className="text-3xl md:text-4xl font-semibold text-color3 text-center mb-15">
            {t("home.welcome")}
          </h1>

          <div className="flex flex-row items-center justify-center gap-6">
            <img
              src="/images/profile.webp"
              alt="My Logo"
              className="hidden md:block h-40 md:h-80"
            />

            <div className="flex flex-col items-start">
              <h2 className="text-2xl md:text-3xl font-semibold text-color3 mb-4">
                {t("home.aboutTitle")}
              </h2>
              <p className="max-w-lg text-gray-700 md:text-lg">
                {t("home.aboutText")}
              </p>
              <Link
                to="/about"
                className="inline-block mt-6 bg-color3 hover:bg-color2 text-white px-6 py-2 rounded font-medium"
              >
                {t("home.aboutButton")}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Outils récents */}
      <section className="py-12 bg-linear-to-b from-color1 to-color2 text-center">
        <Container>
          <h2 className="text-2xl md:text-3xl font-semibold text-color3 mb-6">
            {t("home.latestToolsTitle")}
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-5 md:gap-10">
            {tools.slice(-3).map((tool) => (
              <div
                key={tool.name}
                className="bg-color1_light rounded-full h-30 md:h-40 lg:h-60 w-30 md:w-40 lg:w-60 flex items-center justify-center shadow-2xl"
              >
                <SkillCard
                  name={tool.name}
                  icon={tool.icon}
                  alt={tool.alt}
                  skillIconSize="w-15 md:w-25 lg:w-40"
                  skillTitle="text-base md:text-lg lg:text-xl"
                  showLevel={false}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section className="py-12 text-center bg-color3 flex flex-col items-center">
        <Container>
          <div className="bg-white py-15 px-25 flex flex-col items-center max-w-150">
            <h2 className="text-2xl md:text-3xl font-semibold text-color3 mb-4">
              {t("home.contactTitle")}
            </h2>
            <p className="text-color3 mb-6 text-xl">{t("home.contactText")}</p>
            <Link
              to="/contact"
              className="inline-block bg-color3 hover:bg-color2 text-xl text-white px-6 py-2 rounded font-medium"
            >
              {t("home.contactButton")}
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
