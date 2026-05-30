import type { Product } from "../data/products";

type Props = {
  product: Product;
};

export function ProductVisual({ product }: Props) {
  if (product.image) {
    return (
      <div className="group relative aspect-[4/5] overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5">
        <img
          src={product.image}
          alt={product.name}
          width={480}
          height={600}
          className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  return (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5">
      <div
        className="absolute inset-0 transition duration-500 ease-out group-hover:scale-[1.02]"
        style={{
          background: `linear-gradient(155deg, ${product.accentColor}dd 0%, ${product.accentColor}66 42%, #faf8f5 100%)`,
        }}
      />
      <svg
        className="pointer-events-none absolute -bottom-4 -right-4 h-40 w-40 text-white/25"
        viewBox="0 0 120 120"
        fill="currentColor"
        aria-hidden
      >
        <path d="M80 100c20-25 15-55-10-70S25 15 10 40s5 55 35 55 35-10 35 5z" />
      </svg>
      <svg
        className="pointer-events-none absolute left-4 top-6 h-16 w-16 text-white/20"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        aria-hidden
      >
        <path d="M8 40c12-20 28-24 48-8M12 52c16-8 32-6 44 8" />
      </svg>
    </div>
  );
}
