import { About } from "./components/About";

import { CartDrawer } from "./components/CartDrawer";
import { CheckoutModal } from "./components/CheckoutModal";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { OrderResult } from "./components/OrderResult";
import { ProductsAndStories } from "./components/ProductsAndStories";
import { Team } from "./components/Team";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <ProductsAndStories />
        <Team />
      </main>
      <Footer />


      {/* Shopping flow overlays */}
      <CartDrawer />
      <CheckoutModal />
      <OrderResult />
    </CartProvider>
  );
}
