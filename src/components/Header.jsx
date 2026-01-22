import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Container from "./Container";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const langRef = useRef(null);

  const toggleLangMenu = () => setLangOpen((prev) => !prev);
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLangOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/projects", label: t("nav.projects") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className="bg-color3 text-white shadow-md  z-50 relative">
      <Container>
        <div className="flex items-center  h-[10vh]">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/images/profile.png"
              alt="My logo"
              className="h-20 object-cover"
            />
          </div>

          {/* Navigation desktop */}
          <nav className="hidden md:flex ml-auto">
            <ul className="flex gap-6 text-lg">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;

                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={`transition-colors ${
                        isActive
                          ? "text-color2 underline underline-offset-4"
                          : "hover:text-color2"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Language selector + social links */}
          <div className="relative ml-auto md:ml-6 flex items-center gap-4">
            {/* Language selector */}
            <div className="relative" ref={langRef}>
              <button
                onClick={toggleLangMenu}
                className="p-1 rounded cursor-pointer"
              >
                <img
                  src={
                    i18n.language === "fr"
                      ? "/images/flags/icons8-france-circulaire-48.png"
                      : "/images/flags/icons8-great-britain-48.png"
                  }
                  alt={i18n.language}
                  className="w-8 h-8"
                />
              </button>

              {langOpen && (
                <ul className="absolute right-0 mt-2 bg-color3 rounded shadow-md z-50 w-10 flex flex-col items-center">
                  {i18n.language !== "fr" && (
                    <li>
                      <button
                        onClick={() => changeLanguage("fr")}
                        className="py-1 w-full cursor-pointer"
                      >
                        <img
                          src="/images/flags/icons8-france-circulaire-48.png"
                          alt="fr"
                          className="w-8 h-8"
                        />
                      </button>
                    </li>
                  )}
                  {i18n.language !== "en" && (
                    <li>
                      <button
                        onClick={() => changeLanguage("en")}
                        className="py-1 w-full cursor-pointer"
                      >
                        <img
                          src="/images/flags/icons8-great-britain-48.png"
                          alt="en"
                          className="w-8 h-8"
                        />
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </div>

            {/* social links */}
            <a
              href="https://github.com/Seb-Dupre"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-color2 transition-colors"
            >
              <FontAwesomeIcon icon={faGithub} size="lg" />
              <p className="text-[0px]">Github</p>
            </a>

            <a
              href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-color2 transition-colors"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
              <p className="text-[0px]">Linkedin</p>
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
}
