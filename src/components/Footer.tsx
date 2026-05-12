export function Footer() {
  return (
    <footer
      id="lien-he"
      className="border-t border-tinh-dusk/30 bg-tinh-ink text-tinh-cream"
    >
      <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="font-serif text-3xl tracking-wide">Tĩnh</p>
            <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-tinh-dusk">
              Túi thơm an thần phối từ thảo mộc tự nhiên. Liên hệ để hợp tác,
              đặt hàng hoặc chỉ để kể chúng mình nghe cảm nhận của bạn về hương.
            </p>
          </div>
          <div className="space-y-4 font-sans text-sm">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-tinh-dusk">
                Email
              </p>
              <a
                href="mailto:hello@tinh.project"
                className="mt-1 inline-block text-tinh-cream underline decoration-tinh-dusk underline-offset-4 transition hover:text-white"
              >
                hello@tinh.project
              </a>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-tinh-dusk">
                Điện thoại
              </p>
              <a
                href="tel:+84901234567"
                className="mt-1 inline-block text-tinh-cream transition hover:text-white"
              >
                +84 90 123 4567
              </a>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-tinh-dusk">
                Địa chỉ
              </p>
              <p className="mt-1 max-w-xs leading-relaxed text-tinh-dusk">
                Khu học tập / Studio — placeholder, cập nhật sau khi có địa chỉ
                cố định.
              </p>
            </div>
            <div className="flex gap-6 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium text-tinh-dusk transition hover:text-white"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium text-tinh-dusk transition hover:text-white"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
        <p className="mt-14 border-t border-white/10 pt-8 font-sans text-xs text-tinh-dusk">
          © {new Date().getFullYear()} Tĩnh. Bản quyền nội dung thuộc nhóm dự án.
        </p>
      </div>
    </footer>
  );
}
