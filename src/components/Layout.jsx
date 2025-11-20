import Header from "./Header";
import Footer from "./Footer";
import BottomNav from "./BottomNav";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-color1">{children}</main>
      <BottomNav />
      <Footer />
    </div>
  );
}
