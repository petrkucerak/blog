import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-stone-900 mt-8 py-20">
      <div className="container mx-auto flex justify-center text-white">
        <Link
          href="https://petrkucerak.cz/"
          target="_blank"
          rel="noreferrer"
          title="Více infromací o autorovi."
        >
          petr@khome.cz
        </Link>
      </div>
    </footer>
  );
}
