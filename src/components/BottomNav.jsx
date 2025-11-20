import { useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faFolderOpen,
  faNewspaper,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { to: "/", icon: faHome, label: "Home" },
    { to: "/about", icon: faUser, label: "About" },
    { to: "/projects", icon: faFolderOpen, label: "Projects" },
    { to: "/veille", icon: faNewspaper, label: "Veille" },
    { to: "/contact", icon: faEnvelope, label: "Contact" },
  ];

  const currentIndex = navItems.findIndex(
    (item) => item.to === location.pathname
  );
  const [value, setValue] = useState(currentIndex !== -1 ? currentIndex : 0);

  const handleChange = (index) => {
    setValue(index);
    navigate(navItems[index].to);
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-color4 border-t border-color3 shadow-lg md:hidden z-50">
      <ul className="flex justify-around py-3">
        {navItems.map((item, i) => (
          <li key={item.to}>
            <button
              onClick={() => handleChange(i)}
              className={`flex flex-col items-center text-lg focus:outline-none ${
                i === value ? "text-color2" : "text-color3"
              }`}
            >
              <FontAwesomeIcon icon={item.icon} size="lg" />
              <span className="mt-1">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
