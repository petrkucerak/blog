import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandPinterest,
  IconBrandReddit,
  IconMail,
} from "@tabler/icons";
import { now } from "lodash";
import Link from "next/link";
export default function Footer() {
  const now = new Date();
  return (
    <footer className="bg-stone-900 mt-8 pt-10 pb-6">
      <div className="container mx-auto flex md:justify-center justify-around text-white">
        <Link
          href="mailto:petr@khome.cz"
          target="_blank"
          rel="noreferrer"
          title="Muj email"
          className="px-1 transition hover:text-amber-300"
        >
          <IconMail />
        </Link>
        <Link
          href="https://github.com/petrkucerak"
          target="_blank"
          rel="noreferrer"
          title="Profil na GitHubu"
          className="px-1 transition hover:text-green-500"
        >
          <IconBrandGithub />
        </Link>
        <Link
          href="https://www.instagram.com/_petr_kucerak/"
          target="_blank"
          rel="noreferrer"
          title="Muj profil na Instagramu"
          className="px-1 transition hover:text-pink-500"
        >
          <IconBrandInstagram />
        </Link>
        <Link
          href="https://www.linkedin.com/in/kucera-petr/"
          target="_blank"
          rel="noreferrer"
          title="Muj profil na Linkedinu"
          className="px-1 transition hover:text-blue-500"
        >
          <IconBrandLinkedin />
        </Link>
        <Link
          href="https://cz.pinterest.com/petrkucerak/"
          target="_blank"
          rel="noreferrer"
          title="Muj profil na Pinterestu"
          className="px-1 transition hover:text-red-600"
        >
          <IconBrandPinterest />
        </Link>
        <Link
          href="https://www.reddit.com/user/petrkucerak"
          target="_blank"
          rel="noreferrer"
          title="Muj profil na Redditu"
          className="px-1 transition hover:text-orange-400"
        >
          <IconBrandReddit />
        </Link>
      </div>
      <div className="text-white font-light text-sm flex justify-center mt-5">
        <p>&#169; 2022 - {now.getFullYear()}</p>
      </div>
    </footer>
  );
}
