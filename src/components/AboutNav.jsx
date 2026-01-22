import { useTranslation } from "react-i18next";

export default function AboutNav({ selectedSection, onSelect }) {
  const { t } = useTranslation();

  const items = [
    { key: "biography", label: t("about.section.biography") },
    { key: "formation", label: t("about.section.training") },
    { key: "skills", label: t("about.section.skills") },
  ];

  return (
    <nav className="flex flex-row md:flex-col gap-4 flex-wrap">
      {items.map((item) => {
        const isActive = selectedSection === item.key;

        return (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            className={`
              whitespace-nowrap
              md:text-left cursor-pointer 
              transition-all font-semibold md:bg-transparent py-1 px-2 md:p-0 rounded-2xl md:rounded-none md:font-bold md:text-xl
              ${
                isActive
                  ? "text-white bg-color2_dark  md:text-color2_dark md:underline md:underline-offset-4"
                  : "text-white bg-color3  md:text-color3 hover:bg-color2  md:hover:text-color2 md:hover:bg-transparent"
              }
            `}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
