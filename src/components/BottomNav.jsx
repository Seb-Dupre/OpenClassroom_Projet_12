import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faFolderOpen,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { to: "/", icon: faHome, label: "Home" },
    { to: "/about", icon: faUser, label: "About" },
    { to: "/projects", icon: faFolderOpen, label: "Projects" },
    { to: "/contact", icon: faEnvelope, label: "Contact" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-color3 shadow-lg md:hidden z-50">
      <ul className="flex justify-around py-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;

          return (
            <li key={item.to}>
              <button
                onClick={() => navigate(item.to)}
                className={`flex flex-col items-center text-xl font-bold focus:outline-none ${
                  isActive ? "text-color2_dark" : "text-color3"
                }`}
              >
                <FontAwesomeIcon icon={item.icon} size="lg" />
                <span className="mt-1">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
