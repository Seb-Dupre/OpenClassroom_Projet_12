import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <header className="flex justify-between items-center p-4">
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link to="/">{t("nav.home")}</Link>
          </li>
          <li>
            <Link to="/about">{t("nav.about")}</Link>
          </li>
          <li>
            <Link to="/projects">{t("nav.projects")}</Link>
          </li>
          <li>
            <Link to="/contact">{t("nav.contact")}</Link>
          </li>
        </ul>
      </nav>

      <div>
        <select
          onChange={changeLanguage}
          value={i18n.language}
          className="border rounded px-2 py-1"
        >
          <option value="fr">🇫🇷 Français</option>
          <option value="en">🇬🇧 English</option>
        </select>
      </div>
    </header>
  );
}
