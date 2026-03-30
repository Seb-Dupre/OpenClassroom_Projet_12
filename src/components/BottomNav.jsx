import { useLocation, useNavigate } from "react-router-dom";
import { Home, User, FolderOpen, Mail } from "lucide-react";

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/about", icon: User, label: "About" },
    { to: "/projects", icon: FolderOpen, label: "Projects" },
    { to: "/contact", icon: Mail, label: "Contact" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-color3 shadow-lg md:hidden z-50">
      <ul className="flex justify-around py-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;

          return (
            <li key={item.to}>
              <button
                onClick={() => navigate(item.to)}
                className={`flex flex-col items-center text-xl font-bold focus:outline-none ${
                  isActive ? "text-color2_dark" : "text-color3"
                }`}
              >
                <Icon size={24} />
                <span className="mt-1">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}