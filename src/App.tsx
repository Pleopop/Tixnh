import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProductsAndStories } from "./components/ProductsAndStories";
import { Team } from "./components/Team";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <ProductsAndStories />
        <Team />
      </main>
      <Footer />
    </>
  );
}
