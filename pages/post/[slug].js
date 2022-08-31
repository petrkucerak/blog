import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";

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
    <div className="prose prose-lg prose-stone max-w-4xl w-[90vw] m-0 mx-auto">
      <h1>{frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{
        __html: md({
          html: true,        // Enable HTML tags in source
          xhtmlOut: false,        // Use '/' to close single tags (<br />).
          // This is only for full CommonMark compatibility.
          breaks: false,        // Convert '\n' in paragraphs into <br>
          linkify: true,        // Autoconvert URL-like text to links

          // Enable some language-neutral replacement + quotes beautification
          // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
          typographer: false,

          // Double + single quotes replacement pairs, when typographer enabled,
          // and smartquotes on. Could be either a String or an Array.
          //
          // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
          // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
          quotes: '“”‘’',

          // Highlighter function. Should return escaped HTML,
          // or '' if the source string is not changed and should be escaped externally.
          // If result starts with <pre... internal wrapper is skipped.
          highlight: function (/*str, lang*/) { return ''; }
        }).render(content)
      }} />
    </div>
  );
}
