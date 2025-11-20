export default function Footer() {
  return (
    <footer className="bg-color3_dark text-color4 shadow-md h-[10vh] flex flex-col items-center justify-center gap-2 text-sm">
      {/* Mention obligatoire Icons8 */}
      <p>
        Icons by{" "}
        <a
          href="https://icons8.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-color2 hover:underline"
        >
          Icons8
        </a>
      </p>
    </footer>
  );
}
