import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="">
      <h1 className="">{t("contact.title")}</h1>
      <form className="">
        <input type="text" placeholder={t("contact.name")} className="" />
        <input type="email" placeholder={t("contact.email")} className="" />
        <textarea placeholder={t("contact.message")} className=""></textarea>
        <button type="submit" className="">
          {t("contact.send")}
        </button>
      </form>
    </div>
  );
}
