import { getBusinessSettings } from "@/lib/business-settings";

export async function Hero() {
  const business = await getBusinessSettings();

  return (
    <section className="relative bg-anil text-white overflow-hidden">
      <HeroIllustration />
      <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-10 sm:pt-20 sm:pb-16">
        <h1 className="font-display text-3xl sm:text-5xl font-bold max-w-xl leading-tight">
          Sua próxima casa em {business.addressCity} está aqui.
        </h1>
        <p className="mt-4 max-w-lg text-white/90 text-base sm:text-lg">
          Casas e apartamentos para alugar, com o custo total mostrado antes de
          você perguntar — e garantia facilitada, sem complicação.
        </p>
      </div>
    </section>
  );
}

// Ilustração original (não é foto de banco de imagens): uma porta com a
// plaquinha de número e o molho de chaves, luz entrando pela fresta.
function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full opacity-25"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sunlight" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8f6f2" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f8f6f2" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="150" y="0" width="100" height="200" fill="url(#sunlight)" />
      <rect x="170" y="40" width="60" height="160" rx="4" stroke="#f8f6f2" strokeWidth="3" fill="none" />
      <circle cx="212" cy="120" r="4" fill="#f8f6f2" />
      <circle cx="120" cy="150" r="18" stroke="#f8f6f2" strokeWidth="3" fill="none" />
      <path d="M136 164 L165 193 M165 193 L165 178 M165 193 L150 193" stroke="#f8f6f2" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}
