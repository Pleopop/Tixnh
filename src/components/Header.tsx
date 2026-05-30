
import logo from "../../assets/Logo.png";
const links = [
  { href: "#gioi-thieu", label: "Giới thiệu" },
  { href: "#san-pham", label: "Sản phẩm" },
  { href: "#nhom", label: "Nhóm" },
  { href: "#lien-he", label: "Liên hệ" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-tinh-dusk/25 bg-tinh-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a
          href="#"
          className="font-serif text-2xl tracking-wide text-tinh-ink transition-opacity hover:opacity-80"
        >
          <img
            src={logo}
            alt="Tĩnh Logo"
            className="h-10 w-auto"
          />
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
        </nav>
      </div>
    </header>
  );
}
