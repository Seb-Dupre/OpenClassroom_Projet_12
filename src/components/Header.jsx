import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <header className="flex justify-between items-center px-6 bg-[#52341B] text-white shadow-md h-[10vh]">
      {/* Navigation */}
      <nav className="flex items-center h-full">
        <ul className="flex gap-6">
          <li>
            <Link to="/" className="hover:text-[#FA9224] transition">
              {t("nav.home")}
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-[#FA9224] transition">
              {t("nav.about")}
            </Link>
          </li>
          <li>
            <Link to="/projects" className="hover:text-[#FA9224] transition">
              {t("nav.projects")}
            </Link>
          </li>
          <li>
            <Link to="/veille" className="hover:text-[#FA9224] transition">
              {t("nav.veille")}
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-[#FA9224] transition">
              {t("nav.contact")}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Sélecteur de langue */}
      <div className="h-full flex items-center">
        <select
          onChange={changeLanguage}
          value={i18n.language}
          className="bg-[#52341B] text-white "
        >
          <option value="fr">🇫🇷 Français</option>
          <option value="en">🇬🇧 English</option>
        </select>
      </div>
    </header>
  );
}
