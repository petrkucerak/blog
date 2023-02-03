import Layout from "../components/layout";
import "../styles/globals.css";
import { Athiti } from "@next/font/google";
import NextNProgress from "nextjs-progressbar";

const athiti = Athiti({
  weight: ["500", "700", "300", "600"],
  subsets: ["latin-ext", "latin"],
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --athiti-font: ${athiti.style.fontFamily};
          }
        `}
      </style>
      <Layout>
        <NextNProgress
          color="#fcd34d"
          startPosition={0.3}
          stopDelayMs={100}
          height={2}
          showOnShallow={true}
        />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
