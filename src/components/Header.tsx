import logo from "../../assets/Logo.png";
import { useCart } from "../context/CartContext";

const links = [
  { href: "#gioi-thieu", label: "Giới thiệu" },
  { href: "#san-pham", label: "Sản phẩm" },
  { href: "#nhom", label: "Nhóm" },
  { href: "#lien-he", label: "Liên hệ" },
];

export function Header() {
  const { totalItems, openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-tinh-dusk/25 bg-tinh-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a
          href="#"
          className="font-serif text-2xl tracking-wide text-tinh-ink transition-opacity hover:opacity-80"
        >
          <img src={logo} alt="Tĩnh Logo" className="h-10 w-auto" />
        </a>

        <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-1 text-xs font-medium text-tinh-muted sm:gap-x-6 md:gap-8 md:text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-tinh-ink"
            >
              {l.label}
            </a>
          ))}

          {/* Cart button */}
          <button
            onClick={openCart}
            aria-label="Giỏ hàng"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-tinh-dusk/40 bg-white/60 text-tinh-ink transition hover:border-tinh-sage hover:bg-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-4.5 w-4.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-tinh-sageDeep font-sans text-[9px] font-bold text-white">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
