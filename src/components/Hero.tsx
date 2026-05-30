import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainer } from "../lib/motion";

export function Hero() {
  const reduced = useReducedMotion();
  const fade = fadeUpVariants(!!reduced);
  const stagger = staggerContainer(!!reduced);

  return (
    <div className="relative overflow-hidden border-b border-tinh-dusk/20 bg-gradient-to-b from-tinh-paper via-tinh-cream to-tinh-cream">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full opacity-[0.12]"
        style={{
          background:
            "radial-gradient(circle, #8a9a8f 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-content px-5 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-28">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p
            variants={fade}
            className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-tinh-sageDeep"
          >
            Túi thơm an thần
          </motion.p>
          <motion.h1
            variants={fade}
            className="mt-6 font-serif text-5xl leading-[1.08] tracking-tight text-tinh-ink sm:text-6xl md:text-7xl"
          >
            Tĩnh
          </motion.h1>
          <motion.p
            variants={fade}
            className="mt-6 max-w-xl font-serif text-xl italic leading-relaxed text-tinh-muted sm:text-2xl"
          >
            Một nhịp thở chậm giữa ngày vội — qua những túi thơm may tay, chứa
            thảo mộc chọn lọc.
          </motion.p>
          <motion.div variants={fade} className="mt-12 flex flex-wrap gap-4">
            <a
              href="#san-pham"
              className="inline-flex items-center justify-center rounded-full bg-tinh-sageDeep px-8 py-3.5 font-sans text-sm font-semibold text-white shadow-sm transition hover:bg-tinh-ink"
            >
              Khám phá dòng sản phẩm
            </a>
            <a
              href="#gioi-thieu"
              className="inline-flex items-center justify-center rounded-full border border-tinh-dusk/60 bg-white/50 px-8 py-3.5 font-sans text-sm font-medium text-tinh-ink transition hover:border-tinh-sage hover:bg-white"
            >
              Về dự án
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
