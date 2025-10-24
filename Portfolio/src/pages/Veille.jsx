import { useTranslation } from "react-i18next";

export default function Veille() {
  const { t } = useTranslation();

  const articles = [
    {
      title: t("veille.article1"),
      link: "https://reactnative.dev/blog/2025/10/08/react-native-0.82?ref=dailydev",
    },
    { title: t("veille.article2"), link: "#" },
    { title: t("veille.article3"), link: "#" },
  ];

  return (
    <div>
      <h1>{t("veille.title")}</h1>
      <ul>
        {articles.map((a, i) => (
          <li key={i}>
            <a href={a.link} target="_blank" rel="noopener noreferrer">
              {a.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
