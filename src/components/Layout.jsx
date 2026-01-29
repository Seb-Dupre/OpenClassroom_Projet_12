import Header from "./Header";
import Footer from "./Footer";
import BottomNav from "./BottomNav";

export default function Layout({ children }) {
  return (
    <div className="relative flex flex-col min-h-screen pb-20 md:pb-0">
      {/* Gradient gauche */}
      <div
        className="
          hidden lg:block
          pointer-events-none
          fixed top-0 bottom-0 left-0
          z-40
          bg-linear-to-r from-color3_dark/60 to-color3_dark/0
        "
        style={{ width: "calc(50% - 600px)" }}
      />

      {/* Gradient droit */}
      <div
        className="
          hidden lg:block
          pointer-events-none
          fixed top-0 bottom-0 right-0
          z-40
          bg-linear-to-l from-color3_dark/60 to-color3_dark/0
        "
        style={{ width: "calc(50% - 600px)" }}
      />

      <Header />

      <main className="flex-1 bg-linear-to-b from-color1_light to-color1">
        {children}
      </main>

      <BottomNav />
      <Footer />
    </div>
  );
}
