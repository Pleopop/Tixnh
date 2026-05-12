import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants } from "../lib/motion";
import { Section } from "./Section";

export function About() {
  const reduced = useReducedMotion();
  const fade = fadeUpVariants(!!reduced);

  return (
    <Section
      id="gioi-thieu"
      title="Giới thiệu dự án"
      intro="Tĩnh ra đời từ mong muốn mang một góc yên vào tủ áo, gối và bàn làm việc — không chỉ là hương, mà là một thói quen chậm rãi."
      className="py-24 sm:py-28"
    >
      <motion.div
        className="grid gap-12 lg:grid-cols-12 lg:gap-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: reduced ? 0 : 0.12 },
          },
        }}
      >
        <motion.div variants={fade} className="lg:col-span-7">
          <p className="font-sans text-lg leading-relaxed text-tinh-muted">
            Chúng mình chọn nguyên liệu thảo mộc có nguồn gốc rõ ràng, phơi và
            phối hương thủ công theo từng dòng cảm xúc — từ ấm trầm của trầm và
            quế đến trong veo của bạc hà và nhài. Mỗi túi được may bằng vải tự
            nhiên, để hương thoáng dần, không gắt, phù hợp cả không gian nhỏ.
          </p>
          <p className="mt-6 font-sans text-lg leading-relaxed text-tinh-muted">
            Đây là một dự án học thuật và thực hành: chúng mình tin rằng “an
            thần” không phải một sản phẩm đơn lẻ, mà là sự chăm sóc nhỏ lặp lại
            mỗi ngày.
          </p>
        </motion.div>
        <motion.aside
          variants={fade}
          className="border-l border-tinh-dusk/40 pl-8 lg:col-span-5"
        >
          <p className="font-serif text-xl italic leading-relaxed text-tinh-sageDeep">
            “Chúng mình không hứa phép màu — chỉ gửi gắm một chút tĩnh, có thể
            cất trong lòng bàn tay.”
          </p>
          <p className="mt-6 font-sans text-sm text-tinh-muted">
            Cam kết của nhóm: minh bạch thành phần, đóng gói có thể tái chế,
            không thử nghiệm trên động vật cho dòng sản phẩm hiện tại.
          </p>
        </motion.aside>
      </motion.div>
    </Section>
  );
}
