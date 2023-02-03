import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import Icon from "../components/icon";
import Introduction from "../components/introduction";
import Tags from "../components/tags";
import TagsCloud from "../components/tags-cloud";

export async function getStaticProps() {
  const files = fs.readdirSync("posts");

  let posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);
    return {
      slug,
      frontmatter,
    };
  });

  // sorting data by date
  posts = posts.sort(
    (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  );

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  return (
    <>
      <Introduction />
      <section>
        <h2 className="text-xl font-bold text-center mt-8 uppercase text-stone-800">
          Nejnovější pousty
        </h2>
        <TagsCloud posts={posts} />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 p-4 pt-0 md:p-0 max-w-4xl w-[90vw] m-0 mx-auto">
          {posts.map(({ slug, frontmatter }) => (
            <article
              key={slug}
              className="m-2 overflow-hidden flex flex-col py-1 text-stone-500 hover:text-stone-900 transition-all hover:scale-105 duration-300	"
            >
              <Link
                href={`/post/${slug}`}
                className="p-5"
                title={frontmatter.title}
              >
                <Icon icon={frontmatter.icon} />
                <h3
                  className="px-2 pt-2 uppercase font-bold"
                  dangerouslySetInnerHTML={{ __html: frontmatter.title }}
                />

                <span className="px-2">{frontmatter.date}</span>
                <Tags tags={frontmatter.tags} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
