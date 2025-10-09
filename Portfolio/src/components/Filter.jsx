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
    <div>
      <button onClick={() => handleFilter("all")}>Tous</button>

      {tags.map((tag) => (
        <button key={tag} onClick={() => handleFilter(tag)}>
          {tag}
        </button>
      ))}
    </div>
  );
}
