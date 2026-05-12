import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function Section({
  id,
  title,
  intro,
  children,
  className = "",
  contentClassName = "",
}: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-20 ${className}`}>
      <div className={`mx-auto max-w-content px-5 sm:px-8 ${contentClassName}`}>
        {(title || intro) && (
          <header className="mb-14 max-w-2xl">
            {title && (
              <h2 className="font-serif text-3xl tracking-tight text-tinh-ink sm:text-4xl md:text-[2.75rem]">
                {title}
              </h2>
            )}
            {intro && (
              <p className="mt-4 font-sans text-lg leading-relaxed text-tinh-muted">
                {intro}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
