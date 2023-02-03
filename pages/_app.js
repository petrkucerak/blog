import Layout from "../components/layout";
import "../styles/globals.css";
import { Athiti } from "@next/font/google";

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
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
