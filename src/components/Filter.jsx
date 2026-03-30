import { useState, useMemo } from "react";

export default function Filter({ items, onFilter }) {
  const [selectedTags, setSelectedTags] = useState([]);

  const tags = useMemo(() => {
    return Array.from(new Set(items.flatMap((item) => item.tags)));
  }, [items]);

  const handleFilter = (tag) => {
    if (tag === "all") {
      setSelectedTags([]);
      onFilter(items);
      return;
    }

    let newSelectedTags;

    if (selectedTags.includes(tag)) {
      newSelectedTags = selectedTags.filter((t) => t !== tag);
    } else {
      newSelectedTags = [...selectedTags, tag];
    }

    setSelectedTags(newSelectedTags);

    if (newSelectedTags.length === 0) {
      onFilter(items);
    } else {
      const filtered = items.filter((item) =>
        item.tags.some((t) => newSelectedTags.includes(t))
      );
      onFilter(filtered);
    }
  };

  const isAllActive = selectedTags.length === 0;

  return (
    <div
      className="flex flex-wrap justify-center gap-3 mb-6"
      role="group"
      aria-label="Filter projects"
    >
      <button
        onClick={() => handleFilter("all")}
        aria-pressed={isAllActive}
        className={`px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-color2/50 ${
          isAllActive
            ? "bg-color2 text-color3"
            : "bg-white text-color3 hover:bg-color2 hover:text-white"
        }`}
      >
        Tous
      </button>

      {tags.map((tag) => {
        const isActive = selectedTags.includes(tag);

        return (
          <button
            key={tag}
            onClick={() => handleFilter(tag)}
            aria-pressed={isActive}
            className={`px-4 py-2 rounded font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-color2/50 ${
              isActive
                ? "bg-color2 text-color3"
                : "bg-white text-color3 hover:bg-color2 hover:text-white"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}