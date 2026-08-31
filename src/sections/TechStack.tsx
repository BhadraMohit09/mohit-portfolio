import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { Icon } from "@iconify/react";

const SKILL_ICONS: Record<string, string> = {
  TypeScript: "logos:typescript-icon",
  JavaScript: "logos:javascript",
  React: "logos:react",
  "Next.js": "logos:nextjs-icon",
  "Node.js": "logos:nodejs-icon",
  "Express.js": "logos:express",
  "Tailwind CSS": "logos:tailwindcss-icon",
  "Shadcn UI": "simple-icons:shadcnui",
  PostgreSQL: "logos:postgresql",
  MongoDB: "logos:mongodb-icon",
  Prisma: "logos:prisma",
  Supabase: "logos:supabase-icon",
  Firebase: "logos:firebase",
  "REST APIs": "lucide:cpu",
  JWT: "logos:jwt-icon",
  Git: "logos:git-icon",
  GitHub: "logos:github-icon",
  "GitHub Actions": "logos:github-actions",
  Postman: "logos:postman-icon",
  Vercel: "logos:vercel-icon",
  Figma: "logos:figma",
  "C++": "logos:c-plusplus",
  Python: "logos:python",
  ".NET Core": "logos:dotnet",
  "C#": "logos:c-sharp",
  "Machine Learning": "lucide:brain-circuit",
  "SQL Server": "logos:microsoft-sql-server",
  "ASP.NET Core": "logos:dotnet",
  WebSockets: "lucide:wifi",
  OAuth2: "lucide:shield-check",
  Redis: "logos:redis",
  Docker: "logos:docker-icon",
  AWS: "logos:aws",
  Vite: "logos:vitejs",
  "Framer Motion": "logos:framer",
  PWA: "lucide:smartphone",
  GraphQL: "logos:graphql",
  Linux: "logos:linux-tux",
  Nginx: "logos:nginx",
  "Web Workers": "lucide:layers",
  "Web Crypto API": "lucide:lock-keyhole",
  "Scikit-learn": "logos:scikit-learn",
  Flask: "logos:flask",
  Redux: "logos:redux",
};

function SkillBadge({ skill }: { skill: string }) {
  const iconName = SKILL_ICONS[skill] || "lucide:code-2";
  const isShadcn = iconName === "simple-icons:shadcnui";
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2 font-mono text-[12px] text-[var(--muted)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)] shadow-xs group cursor-default select-none">
      <Icon
        icon={iconName}
        width={16}
        height={16}
        className={`size-4 shrink-0 transition-colors ${isShadcn ? "text-current" : ""} group-hover:filter group-hover:brightness-110`}
      />
      {skill}
    </span>
  );
}

function MarqueeRow({ skills, reverse = false }: { skills: string[]; reverse?: boolean }) {
  const doubled = [...skills, ...skills];
  return (
    <div className="overflow-hidden w-full" aria-hidden>
      <div className={`flex gap-3 w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {doubled.map((skill, i) => (
          <SkillBadge key={`${skill}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  if (!site.skills.length) return null;

  const skills = site.skills as unknown as string[];
  const mid = Math.ceil(skills.length / 2);
  const row1 = skills.slice(0, mid);
  const row2 = skills.slice(mid);

  return (
    <div id="skills">
      <SectionHeader title="Tech Stack" />
      <Shell className="px-0 py-6 overflow-hidden">
        <div className="flex flex-col gap-4">
          <MarqueeRow skills={row1} reverse={false} />
          <MarqueeRow skills={row2} reverse={true} />
        </div>
      </Shell>
    </div>
  );
}

export default TechStack;
