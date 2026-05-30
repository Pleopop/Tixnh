import { motion, useReducedMotion } from "framer-motion";
import { products } from "../data/products";
import { fadeUpVariants } from "../lib/motion";
import { Section } from "./Section";
import { ProductVisual } from "./ProductVisual";
import { useCart } from "../context/CartContext";

function formatVND(n: number) {
  return n.toLocaleString("vi-VN") + "₫";
}

const PRICE_MAP: Record<string, number> = {
  "tinh-yen": 40000,
  "tinh-tram": 40000,
  "tinh-nhien": 40000,
};

export function ProductsAndStories() {
  const reduced = useReducedMotion();
  const fade = fadeUpVariants(!!reduced);
  const { addItem, items } = useCart();

  return (
    <Section
      id="san-pham"
      title="Sản phẩm & câu chuyện"
      intro="Mỗi dòng là một sự phối hương và một lời kể nhỏ — đọc chậm như gấp một trang sách."
      className="border-t border-tinh-dusk/25 bg-tinh-paper/50 py-24 sm:py-28"
    >
      <div className="space-y-20 sm:space-y-24 md:space-y-28">
        {products.map((product, index) => {
          const imageOnLeft = index % 2 === 0;
          const price = PRICE_MAP[product.id] ?? 185000;
          const inCart = items.find((i) => i.product.id === product.id);

          return (
            <motion.article
              key={product.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-48px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: reduced ? 0 : 0.11,
                    delayChildren: reduced ? 0 : 0.02,
                  },
                },
              }}
              className="grid gap-10 md:grid-cols-2 md:items-center md:gap-12 lg:gap-16"
            >
              <motion.div
                variants={fade}
                className={imageOnLeft ? "order-1 md:order-1" : "order-1 md:order-2"}
              >
                <ProductVisual product={product} />
              </motion.div>

              <motion.div
                variants={fade}
                className={
                  imageOnLeft
                    ? "order-2 flex flex-col gap-6 md:order-2"
                    : "order-2 flex flex-col gap-6 md:order-1"
                }
              >
                {product.lineLabel && (
                  <span className="inline-flex w-fit rounded-full border border-tinh-dusk/50 bg-white/70 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-tinh-sageDeep">
                    {product.lineLabel}
                  </span>
                )}
                <div>
                  <p className="font-serif text-sm font-medium tracking-[0.25em] text-tinh-muted">
                    Tĩnh
                  </p>
                  <h3 className="mt-2 font-serif text-3xl tracking-tight text-tinh-ink sm:text-4xl">
                    {product.name.replace(/^Tĩnh · /, "")}
                  </h3>
                  <p className="mt-3 font-serif text-xl italic text-tinh-sageDeep">
                    {product.tagline}
                  </p>
                </div>
                <p className="max-w-prose font-sans text-base leading-relaxed text-tinh-muted">
                  {product.description}
                </p>
                <aside className="relative border-l-2 border-tinh-dusk/35 bg-tinh-cream/60 py-4 pl-6 pr-2">
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-tinh-dusk">
                    Câu chuyện bên lề
                  </p>
                  <p className="mt-3 font-serif text-lg italic leading-relaxed text-tinh-ink/90">
                    {product.story}
                  </p>
                </aside>

                {/* Price + Add to cart */}
                <div className="flex items-center gap-4 pt-1">
                  <div>
                    <p className="font-sans text-xs text-tinh-muted">Giá bán</p>
                    <p className="font-serif text-2xl text-tinh-ink">{formatVND(price)}</p>
                  </div>
                  <button
                    onClick={() => addItem(product)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 font-sans text-sm font-semibold transition ${
                      inCart
                        ? "border border-tinh-sageDeep bg-tinh-sageDeep/10 text-tinh-sageDeep hover:bg-tinh-sageDeep hover:text-white"
                        : "bg-tinh-sageDeep text-white shadow-sm hover:bg-tinh-ink"
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                    {inCart ? `Thêm 1 nữa (đang có ${inCart.quantity})` : "Thêm vào giỏ hàng"}
                  </button>
                </div>
              </motion.div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
