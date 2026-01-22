import { useState, useEffect } from "react";

export default function Filter({ items, onFilter }) {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]); // plusieurs tags

  // Récupère tous les tags existants
  useEffect(() => {
    const allTags = Array.from(new Set(items.flatMap((item) => item.tags)));
    setTags(allTags);
  }, [items]);

  // Gérer la sélection/dé-sélection d'un tag
  const handleFilter = (tag) => {
    if (tag === "all") {
      setSelectedTags([]);
      onFilter(items);
      return;
    }

    let newSelectedTags = [];
    if (selectedTags.includes(tag)) {
      // retirer le tag s'il était déjà sélectionné
      newSelectedTags = selectedTags.filter((t) => t !== tag);
    } else {
      // ajouter le tag
      newSelectedTags = [...selectedTags, tag];
    }

    setSelectedTags(newSelectedTags);

    // filtrer les items
    if (newSelectedTags.length === 0) {
      onFilter(items);
    } else {
      const filtered = items.filter((item) =>
        item.tags.some((t) => newSelectedTags.includes(t))
      );
      onFilter(filtered);
    }
  };

  // Vérifie si "Tous" est actif
  const isAllActive = selectedTags.length === 0;

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-6">
      <button
        onClick={() => handleFilter("all")}
        className={`px-4 py-2 rounded font-medium transition-colors ${
          isAllActive
            ? "bg-color2 text-color3"
            : "bg-white text-color3 hover:bg-color2 hover:text-white"
        }`}
      >
        Tous
      </button>

      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleFilter(tag)}
          className={`px-4 py-2 rounded font-medium transition-colors cursor-pointer ${
            selectedTags.includes(tag)
              ? "bg-color2 text-color3"
              : "bg-white text-color3 hover:bg-color2 hover:text-white"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
