import { motion, useReducedMotion } from "framer-motion";
import { team } from "../data/team";
import { fadeUpVariants } from "../lib/motion";
import { Section } from "./Section";

const accentBg = [
  "from-[#8a9a8f] to-[#5c6b62]",
  "from-[#9aab9e] to-[#6b7a72]",
  "from-[#b8a99a] to-[#8a7d6f]",
  "from-[#a89b8c] to-[#7a6f63]",
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0][0];
    const b = parts[parts.length - 1][0];
    return (a + b).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function TeamAvatar({
  name,
  avatar,
  accentIndex,
}: {
  name: string;
  avatar?: string;
  accentIndex: number;
}) {
  const grad = accentBg[accentIndex % accentBg.length];

  if (avatar) {
    return (
      <div className="mx-auto h-28 w-28 overflow-hidden rounded-full shadow-md ring-2 ring-white/60">
        <img
          src={avatar}
          alt={name}
          width={112}
          height={112}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Ảnh đại diện ${name}`}
      className={`mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br ${grad} font-serif text-2xl font-semibold tracking-wide text-white shadow-md ring-2 ring-white/50`}
    >
      {initials(name)}
    </div>
  );
}

export function Team() {
  const reduced = useReducedMotion();
  const fade = fadeUpVariants(!!reduced);

  return (
    <Section
      id="nhom"
      title="Nhóm thực hiện"
      intro="Những người đứng sau từng mẻ phơi hương và từng đường may — có thể thay ảnh đại diện bằng cách đặt file trong thư mục public/team/ và cập nhật đường dẫn trong dữ liệu."
      className="py-24 sm:py-28"
    >
      <motion.div
        className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: reduced ? 0 : 0.09 },
          },
        }}
      >
        {team.map((member, i) => (
          <motion.article
            key={member.id}
            variants={fade}
            className="flex flex-col items-center text-center"
          >
            <TeamAvatar
              name={member.name}
              avatar={member.avatar}
              accentIndex={i}
            />
            <h3 className="mt-6 font-serif text-xl text-tinh-ink">
              {member.name}
            </h3>
            <p className="mt-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-tinh-sageDeep">
              {member.role}
            </p>
            <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-tinh-muted">
              {member.bio}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
