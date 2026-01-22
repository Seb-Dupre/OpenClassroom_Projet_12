import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function ProjectModal({ project, open, onClose }) {
  const { i18n, t } = useTranslation();
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open || !project) return null;

  const description =
    project.description?.[i18n.language] || t("project.noDescription");

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-100 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          ref={modalRef}
          className="
            bg-color1_light rounded-xl
            w-full max-w-[90%] sm:max-w-[600px] md:max-w-[900px]
            h-auto max-h-[90vh] overflow-y-auto
            p-6 relative
          "
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 rounded-full bg-color1 hover:bg-color2 text-color3 hover:text-white cursor-pointer"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-color3">
            {project.title}
          </h2>

          {/* Image */}
          <img
            src={project.image}
            alt={project.title}
            className="w-full rounded-lg mb-4"
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags?.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-color3 text-color4 rounded-md text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-6 whitespace-pre-line">
            {description}
          </p>

          {/* GitHub button */}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-color3 hover:bg-color2 text-white font-medium py-2 rounded-md"
            >
              {t("project.githubButton")}
            </a>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
