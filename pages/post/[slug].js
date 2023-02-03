import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import hljs from "highlight.js";
import footnote_plugin from "markdown-it-footnote";
import sub_plugin from "markdown-it-sub";
import sup_plugin from "markdown-it-sup";
import abbr_plugin from "markdown-it-abbr";
import container_plugin from "markdown-it-container";
import deflist_plugin from "markdown-it-deflist";
import ins_plugin from "markdown-it-ins";
import mark_plugin from "markdown-it-mark";
import math_plugin from "markdown-it-math";

import Tags from "../../components/tags";

export async function getStaticPaths() {
  const files = fs.readdirSync("posts");
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const fileName = fs.readFileSync(`posts/${slug}.md`, "utf-8");
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}

export default function PostPage({ frontmatter, content }) {
  return (
    <article className="prose prose-lg prose-stone max-w-4xl w-[90vw] m-0 mx-auto">
      <h1
        dangerouslySetInnerHTML={{ __html: frontmatter.title }}
        className="mb-1"
      />
      <span className="text-stone-400 text-base">
        {frontmatter.updated !== null && frontmatter.updated !== undefined
          ? `Naposledy upraveno: ${frontmatter.updated}`
          : null}
        {frontmatter.updated === null || frontmatter.updated === undefined
          ? `Zveřejněno: ${frontmatter.date}`
          : null}
      </span>
      <div className="ml-[-10px] text-base">
        <Tags tags={frontmatter.tags} />
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: md({
            html: true, // Enable HTML tags in source
            xhtmlOut: false, // Use '/' to close single tags (<br />).
            // This is only for full CommonMark compatibility.
            breaks: false, // Convert '\n' in paragraphs into <br>
            linkify: true, // Autoconvert URL-like text to links

            // Enable some language-neutral replacement + quotes beautification
            // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
            typographer: false,

            // Double + single quotes replacement pairs, when typographer enabled,
            // and smartquotes on. Could be either a String or an Array.
            //
            // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
            // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
            quotes: "„“‚‘",

            // Highlighter function. Should return escaped HTML,
            // or '' if the source string is not changed and should be escaped externally.
            // If result starts with <pre... internal wrapper is skipped.
            highlight: function (str, lang) {
              if (lang && hljs.getLanguage(lang)) {
                try {
                  return hljs.highlight(str, { language: lang }).value;
                } catch (__) {}
              }

              return ""; // use external default escaping
            },
          })
            .use(footnote_plugin)
            .use(sub_plugin)
            .use(sup_plugin)
            .use(abbr_plugin)
            .use(container_plugin)
            .use(deflist_plugin)
            .use(ins_plugin)
            .use(mark_plugin)
            .use(math_plugin)
            .render(content),
        }}
      />
    </article>
  );
}
