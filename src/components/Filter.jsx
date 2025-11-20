import { useState, useEffect } from "react";

export default function Filter({ items, onFilter }) {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");

  useEffect(() => {
    const allTags = Array.from(new Set(items.flatMap((item) => item.tags)));
    setTags(allTags);
  }, [items]);

  const handleFilter = (tag) => {
    setSelectedTag(tag);
    if (tag === "all") {
      onFilter(items);
    } else {
      onFilter(items.filter((item) => item.tags.includes(tag)));
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-6">
      <button
        onClick={() => handleFilter("all")}
        className={`px-4 py-2 rounded font-medium transition-colors ${
          selectedTag === "all"
            ? "bg-color2 text-color3"
            : "bg-color4 text-color3 hover:bg-color2 hover:text-color4 "
        }`}
      >
        Tous
      </button>

      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleFilter(tag)}
          className={`px-4 py-2 rounded font-medium transition-colors cursor-pointer ${
            selectedTag === tag
              ? "bg-color2 text-color3"
              : "bg-color4 text-color3 hover:bg-color2 hover:text-color4"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
