import Head from "next/head";

export default function Meta() {
  const descritpion = `Kůčův blog s jeho poznatky, projekty a nápady.`;
  const author = `Petr Kučera`;
  const mail = `petr@khome.cz`;
  return (
    <Head>
      {/* Start of config favicon */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#4b6b3c" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      {/* End of config favicon */}

      {/* Start of config fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Athiti:wght@500;700&display=swap"
        rel="preload"
        as="style"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Athiti:wght@500;700&display=swap"
        rel="stylesheet"
        media="print"
        onLoad="this.media='all'"
      />
      <noscript>
        <link
          href="https://fonts.googleapis.com/css2?family=Athiti:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </noscript>
      {/* End of config fonts */}

      {/* Start of meta tags */}
      <title>Kůčův blog</title>
      <meta name="description" content={descritpion} />
      <meta name="author" content={author} />
      <meta name="medium" content="blog" />
      <meta name="reply-to" content={mail} />
      <meta lang="cs-cz" />
      {/* The end of meta tags */}
    </Head>
  );
}
