import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);

  const toggleLangMenu = () => setLangOpen((prev) => !prev);
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLangOpen(false);
  };

  const navItems = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/projects", label: t("nav.projects") },
    { to: "/veille", label: t("nav.veille") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className="bg-color3 text-color4 shadow-md h-[10vh] flex items-center px-4 md:px-6 z-50 relative">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="/images/profile.png"
          alt="Logo"
          className="w-14 object-cover"
        />
      </div>

      {/* Navigation desktop */}
      <nav className="hidden md:flex ml-auto">
        <ul className="flex gap-6 text-lg">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="hover:text-color2 transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Language selector + social links */}
      <div className="relative ml-auto md:ml-6 flex items-center gap-4">
        {/* Sélecteur de langue */}
        <div className="relative">
          <button
            onClick={toggleLangMenu}
            className="p-1 rounded cursor-pointer"
          >
            <img
              src={
                i18n.language === "fr"
                  ? "https://img.icons8.com/color/48/france-circular.png"
                  : "https://img.icons8.com/fluency/48/great-britain-circular.png"
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
                    className="py-1 w-full"
                  >
                    <img
                      src="https://img.icons8.com/color/48/france-circular.png"
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
                    className="py-1 w-full"
                  >
                    <img
                      src="https://img.icons8.com/fluency/48/great-britain-circular.png"
                      alt="en"
                      className="w-8 h-8"
                    />
                  </button>
                </li>
              )}
            </ul>
          )}
        </div>

        {/* Liens sociaux */}
        <a
          href="https://github.com/Seb-Dupre"
          target="_blank"
          rel="noopener noreferrer"
          className="text-color4 hover:text-color2 transition-colors"
        >
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </a>

        <a
          href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-color4 hover:text-color2 transition-colors"
        >
          <FontAwesomeIcon icon={faLinkedin} size="lg" />
        </a>
      </div>
    </header>
  );
}
