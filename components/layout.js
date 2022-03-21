import { IconTree } from "@tabler/icons";
import Link from "next/link";
import Meta from "../components/meta";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Meta></Meta>
      <header className="bg-fuchsia-100 mb-8 py-4">
        <div className="container mx-auto flex justify-center">
          <Link href="/">
            <a>
              <IconTree />
            </a>
          </Link>
          <span className="mx-auto">Welcome to my blog</span>{" "}
        </div>
      </header>
      <main className="container mx-auto flex-1">{children}</main>
      <footer className="bg-fuchsia-100 mt-8 py-4">
        <div className="container mx-auto flex justify-center">
          &copy; 2022 Petr Kucera
        </div>
      </footer>
    </div>
  );
}
