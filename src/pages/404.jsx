import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Error404() {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col items-center justify-center h-[72vh] md:h-[80vh] bg-color1_light text-center">
      <h1 className="text-color2_dark text-[10rem] md:text-[15rem] font-semibold leading-none">
        404
      </h1>

      <p>
        <Link
          to="/"
          className="text-color3 hover:text-color2 underline text-xl focus:outline-none focus:ring-2 focus:ring-color2/50"
        >
          {t("404.link")}
        </Link>
      </p>
    </main>
  );
}
