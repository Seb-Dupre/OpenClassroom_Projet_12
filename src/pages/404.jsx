import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import Container from "../components/Container";

export default function Error404() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="flex flex-col items-center justify-center h-[72vh] md:h-[80vh] bg-color1_light ">
      <h1 className=" text-color2_dark text-[10rem] md:text-[15rem] font-semibold  leading-none">
        404
      </h1>

      <p>
        <Link to="/" className="text-color3 hover:text-color2 underline text-xl">
          {t("404.link")}
        </Link>
      </p>
    </div>
  );
}
