import Meta from "../components/meta";
import Footer from "./layout/footer";
import Header from "./layout/header";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen font-athiti">
      <Meta></Meta>
      <Header />
      <main className="container mx-auto flex-1">{children}</main>
      <Footer />
    </div>
  );
}
