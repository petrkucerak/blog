import { IconTree } from "@tabler/icons";
import Link from "next/link";
import Meta from "../components/meta";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen font-athiti">
      <Meta></Meta>
      <header className="bg-stone-900 mb-8 py-4">
        <div className="container mx-auto flex justify-center">
          <Link href="/">
            <a>
              <IconTree 
                className="text-white"
              />
            </a>
          </Link>
        </div>
      </header>
      <main className="container mx-auto flex-1">{children}</main>
      <footer className="bg-stone-900 mt-8 py-20">
        <div className="container mx-auto flex justify-center text-white">
          <a href="https://petrkucerak.cz/" target="_blank" rel="noreferrer">petr@khome.cz</a>
        </div>
      </footer>
    </div>
  );
}
