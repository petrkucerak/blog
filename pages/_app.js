import Layout from "../components/layout";
import "../styles/globals.css";
import { Athiti } from "@next/font/google";

const athiti = Athiti({
  weight: "500",
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
