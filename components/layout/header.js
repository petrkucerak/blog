import { IconTree } from "@tabler/icons";
import Link from "next/link";
export default function Header() {
  return (
    <header className="bg-stone-900 mb-8 py-4">
      <div className="container mx-auto flex justify-center">
        <Link href="/" title="Kůčův blog">
          <IconTree className="text-white" />
        </Link>
      </div>
    </header>
  );
}
