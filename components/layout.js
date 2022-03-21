import { IconTree } from "@tabler/icons";
import Link from "next/link";
import Meta from "../components/meta";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-800 text-white">
      <Meta></Meta>
      <header className="bg-zinc-900 mb-8 py-4">
        <div className="container mx-auto flex justify-center">
          <Link href="/">
            <a>
              <IconTree />
            </a>
          </Link>
        </div>
      </header>
      <main className="container mx-auto flex-1">{children}</main>
      <footer className="bg-zinc-900 mt-8 py-20">
        <div className="container mx-auto flex justify-center">
          &copy; 2022 Petr Kučera
        </div>
      </footer>
    </div>
  );
}
