import { useEffect, useRef, useState, type ComponentType } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Droplets, Plus, ShieldCheck, Truck, Utensils, Waves } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { BTN, Footer, PharmaSection, SiteHeader, StickyHeader } from "@/components/dossenza-ui";
import { PRODUTOS, KIT_PRECOS, asset, whatsappUrl, type Preco, type Produto } from "@/data/produtos";
import { DIFERENCIAIS, FAQS } from "@/data/conteudo";
import { useHead } from "@/lib/head";

const DESC =
  "A loja oficial Dossenza: Gastro para o estômago, Entero para o intestino e o sistema completo com os dois juntos.";

const MARQUEE = [
  "Enzimas digestivas",
  "Gastro · estômago",
  "Entero · intestino",
  "Fórmula declarada",
  "Garantia de 7 dias",
  "Entrega para todo o Brasil",
];

/* Véu sobre o banner, no lado do texto (mesma técnica do hero da home) */
const VEIL_LIGHT =
  "linear-gradient(to right, rgba(246,240,228,0.97) 0%, rgba(246,240,228,0.88) 34%, rgba(246,240,228,0.35) 52%, rgba(246,240,228,0) 66%)";
const VEIL_DARK =
  "linear-gradient(to left, rgba(23,63,53,0.96) 0%, rgba(23,63,53,0.86) 34%, rgba(23,63,53,0.3) 54%, rgba(23,63,53,0) 70%)";

type Slide = {
  id: string;
  dark: boolean;
  align: "left" | "right";
  img: string;
  imgPos: string;
  imgMobile: string;
  veil: string;
  tag: string;
  titulo: string;
  sub: string;
  cta: string;
};

const SLIDES: Slide[] = [
  {
    id: "gastro",
    dark: false,
    align: "left",
    img: "/products/banner-loja-gastro.webp",
    imgPos: "right 60%",
    imgMobile: "/products/gastro-card.webp",
    veil: VEIL_LIGHT,
    tag: "Para o estômago",
    titulo: "Onde a digestão começa",
    sub: "Pepsina, protease ácida e Olea europaea em cápsulas vegetais, para acompanhar a digestão no estômago.",
    cta: "Comprar Gastro",
  },
  {
    id: "entero",
    dark: true,
    align: "right",
    img: "/products/banner-loja-entero.webp",
    imgPos: "left 60%",
    imgMobile: "/products/entero-card.webp",
    veil: VEIL_DARK,
    tag: "Para o intestino",
    titulo: "Onde ela se completa",
    sub: "Seis enzimas e ativos em cápsulas gastrorresistentes, liberados no intestino, onde eles atuam.",
    cta: "Comprar Entero",
  },
  {
    id: "kit",
    dark: false,
    align: "left",
    img: "/waves/hero-banner.webp",
    imgPos: "right 80%",
    imgMobile: "/waves/hero-banner.webp",
    veil: VEIL_LIGHT,
    tag: "Sistema completo",
    titulo: "Um sistema. Dois nomes.",
    sub: "Gastro e Entero juntos, do estômago ao intestino, com preço especial nos combos de 3 e 5.",
    cta: "Montar meu sistema",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const parseBRL = (s: string) => Number(s.replace(/\./g, "").replace(",", "."));
const fmtBRL = (n: number) => n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function LojaPage() {
  useHead({
    title: "Loja Dossenza — Gastro, Entero e sistema completo",
    description: DESC,
    path: "/loja",
    ogImage: "/og-image.jpg",
    jsonLd: faqJsonLd,
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), { threshold: 0 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-dz-creme text-dz-tinta">
      <StickyHeader visible={stuck} />
      <main>
        <div ref={heroRef}>
          <HeroCarousel />
        </div>
        <Marquee />
        <Vitrine />
        <Comprar />
        <PharmaSection />
        <Diferenciais />
        <FAQ />
        <CtaFinal />
      </main>
      <Footer />
    </div>
  );
}

/* ---------- HERO CARROSSEL (3 banners: Gastro, Entero, sistema) ---------- */
function HeroCarousel() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);
  const dark = SLIDES[active].dark;

  const Dots = ({ onDark }: { onDark: boolean }) => (
    <div className="flex justify-center gap-2">
      {SLIDES.map((sl, j) => (
        <button
          key={sl.id}
          type="button"
          onClick={() => setActive(j)}
          aria-label={`Banner ${j + 1}`}
          className={`h-2 rounded-full transition-all ${
            j === active
              ? onDark
                ? "w-6 bg-dz-trigo"
                : "w-6 bg-dz-espinafre"
              : onDark
                ? "w-2 bg-dz-creme/40"
                : "w-2 bg-dz-espinafre/30"
          }`}
        />
      ))}
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-dz-creme">
      {/* DESKTOP — banner de uma tela, imagem de fundo + véu no lado do texto */}
      <div className="relative hidden md:block md:min-h-svh">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            aria-hidden={i !== active}
            className={`absolute inset-0 flex flex-col transition-opacity duration-700 ${
              i === active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-no-repeat"
              style={{ backgroundImage: `url('${asset(s.img)}')`, backgroundPosition: s.imgPos }}
              aria-hidden="true"
            />
            <div className="absolute inset-0" style={{ background: s.veil }} aria-hidden="true" />
            <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pb-24 pt-7 md:px-10">
              <SiteHeader overlay dark={s.dark} />
              <div className={`flex flex-1 items-center py-10 ${s.align === "right" ? "justify-end" : ""}`}>
                <div className={`w-full max-w-xl ${s.align === "right" ? "text-right" : ""}`}>
                  <p className={`label-caps ${s.dark ? "text-dz-trigo" : "text-dz-terracota"}`}>{s.tag}</p>
                  <h1
                    className={`mt-6 text-5xl font-medium leading-[1.02] md:text-7xl lg:text-[5.2rem] ${
                      s.dark ? "text-dz-creme" : "text-dz-espinafre"
                    }`}
                  >
                    {s.titulo}
                  </h1>
                  <p
                    className={`mt-7 max-w-lg text-base leading-7 md:text-lg md:leading-8 ${s.align === "right" ? "ml-auto" : ""} ${
                      s.dark ? "text-dz-creme/80" : "text-dz-tinta/80"
                    }`}
                  >
                    {s.sub}
                  </p>
                  <div className={`mt-9 flex ${s.align === "right" ? "justify-end" : ""}`}>
                    <a href="#comprar" className={`group ${s.dark ? BTN.light : BTN.primary}`}>
                      {s.cta}
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute inset-x-0 bottom-6 z-10">
          <Dots onDark={dark} />
        </div>
      </div>

      {/* MOBILE — texto em cima, imagem embaixo (igual ao hero da home) */}
      <div className="md:hidden">
        {SLIDES.map((s, i) => (
          <div key={s.id} className={`${i === active ? "block" : "hidden"} ${s.dark ? "bg-dz-espinafre" : "bg-dz-creme"}`}>
            <div className="mx-auto max-w-7xl px-6 pb-12 pt-6">
              <SiteHeader overlay dark={s.dark} />
              <div className="py-8">
                <p className={`label-caps ${s.dark ? "text-dz-trigo" : "text-dz-terracota"}`}>{s.tag}</p>
                <h1 className={`mt-6 text-5xl font-medium leading-[1.02] ${s.dark ? "text-dz-creme" : "text-dz-espinafre"}`}>
                  {s.titulo}
                </h1>
                <p className={`mt-6 text-base leading-7 ${s.dark ? "text-dz-creme/80" : "text-dz-tinta/80"}`}>{s.sub}</p>
                <div className="mt-8">
                  <a href="#comprar" className={`group w-full ${s.dark ? BTN.light : BTN.primary}`}>
                    {s.cta}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                </div>
              </div>
              <div
                className={`overflow-hidden rounded-3xl border shadow-[var(--shadow-card)] ${
                  s.dark ? "border-dz-creme/20" : "border-dz-linha"
                }`}
              >
                <img src={asset(s.imgMobile)} alt={`Dossenza — ${s.tag}`} className="w-full object-cover" />
              </div>
              <div className="mt-6">
                <Dots onDark={s.dark} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- MARQUEE ---------- */
function Marquee() {
  const items = [...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE];
  return (
    <div className="overflow-hidden border-y border-dz-linha bg-dz-espinafre py-3">
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="label-caps flex items-center gap-8 text-dz-trigo">
            {t} <span className="h-1 w-1 rounded-full bg-dz-trigo/60" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- VITRINE (1 frasco de cada) ---------- */
function Vitrine() {
  return (
    <section className="px-6 py-18 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="label-caps text-dz-terracota">Unidades avulsas</p>
          <h2 className="mt-3 text-4xl font-medium text-dz-espinafre md:text-5xl">
            Comece com <span className="italic text-dz-terracota">uma unidade.</span>
          </h2>
          <p className="mt-5 text-base leading-7 text-dz-tinta/75">
            Prefere experimentar? Leve uma unidade do produto que combina com o seu foco: estômago, intestino ou o conforto nas refeições.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <VitrineCard produto={PRODUTOS.gastro} />
          <VitrineCard produto={PRODUTOS.entero} />
          <VitrineCard produto={PRODUTOS.digest} />
        </div>
      </div>
    </section>
  );
}

function VitrineCard({ produto }: { produto: Produto }) {
  const Icon = produto.id === "gastro" ? Droplets : produto.id === "digest" ? Utensils : Waves;
  const accent = produto.id === "gastro" ? "text-dz-terracota" : produto.id === "digest" ? "text-dz-espinafre" : "text-dz-azeitona";
  const un = produto.unidade?.[0] ?? "frasco";
  const msg = `Oi Dossenza! Quero comprar 1 ${un} de Dossenza ${produto.nome} (R$ ${produto.precos[0].total}).`;
  return (
    <Reveal className="flex flex-col items-center gap-6 rounded-3xl border border-dz-linha bg-white p-6 text-center shadow-[var(--shadow-card)] sm:flex-row sm:text-left md:p-8 lg:flex-col lg:text-center">
      <div className="flex h-40 w-full shrink-0 items-center justify-center sm:w-44 lg:w-full">
        <img src={asset(`/products/${produto.id}-1.webp`)} alt={`Dossenza ${produto.nome}`} className="max-h-40 w-auto max-w-full object-contain" />
      </div>
      <div className="flex-1">
        <div className={`label-caps flex items-center justify-center gap-2 sm:justify-start lg:justify-center ${accent}`}>
          <Icon className="h-4 w-4" aria-hidden="true" /> {produto.focoLabel ?? `Para o ${produto.foco}`}
        </div>
        <h3 className="mt-2 text-2xl font-medium text-dz-espinafre">
          Dossenza <span className={`italic ${accent}`}>{produto.nome}</span>
        </h3>
        <p className="mt-1 text-xs uppercase tracking-[0.12em] text-dz-tinta/55">{produto.apresentacao}</p>
        <div className="mt-4 flex items-baseline justify-center gap-1 sm:justify-start lg:justify-center">
          <span className="text-sm text-dz-tinta/60">R$</span>
          <span className="font-display text-4xl text-dz-espinafre">{produto.precos[0].total}</span>
          <span className="ml-1 text-sm text-dz-tinta/60">/ {un}</span>
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a href={whatsappUrl(msg)} target="_blank" rel="noreferrer" className={`${BTN.primary} min-h-11 flex-1 px-5`}>
            Comprar 1 {un}
          </a>
          <Link to={produto.slug} className={`${BTN.outline} min-h-11 px-5`}>
            Ver detalhes
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------- COMPRAR (seletor de quantidade) ---------- */
function Comprar() {
  return (
    <section id="comprar" className="scroll-mt-20 border-t border-dz-linha bg-dz-areia px-6 py-18 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="label-caps text-dz-terracota">Escolha a quantidade</p>
          <h2 className="mt-3 text-4xl font-medium text-dz-espinafre md:text-5xl">
            Mais unidades, <span className="italic text-dz-terracota">melhor preço.</span>
          </h2>
        </Reveal>
        {/* Kits em cima (mesma largura dos cards de baixo), produtos individuais embaixo */}
        <div className="mx-auto mt-12 grid max-w-[846px] items-start gap-6 lg:grid-cols-2">
          <LojaCard
            tag="Sistema completo"
            accent="text-dz-espinafre"
            nome="Sistema"
            sub="Gastro + Entero"
            imagePrefix="kit"
            meta="1 Gastro + 1 Entero por sistema"
            metaPorQtd={(q) => `${q} Gastro + ${q} Entero`}
            precos={KIT_PRECOS}
            unidade={["sistema", "sistemas"]}
            featured
            alto
          />
          <LojaCard
            tag="Kit cuidado completo"
            accent="text-dz-terracota"
            nome="Cuidado completo"
            sub="Gastro + Entero + Digest"
            imagePrefix="kit3p"
            meta="1 Gastro + 1 Entero + 1 Digest por kit"
            metaPorQtd={(q) => `${q} Gastro + ${q} Entero + ${q} Digest`}
            precos={KIT_PRECOS}
            unidade={["kit", "kits"]}
            badge="Cuidado completo"
            emBreve
            alto
          />
        </div>
        <div className="mt-6 grid items-start gap-6 lg:grid-cols-3">
          <LojaCard
            tag="Para o estômago"
            icon={Droplets}
            accent="text-dz-terracota"
            nome="Gastro"
            imagePrefix="gastro"
            meta={PRODUTOS.gastro.apresentacao}
            precos={PRODUTOS.gastro.precos}
            unidade={["frasco", "frascos"]}
          />
          <LojaCard
            tag="Para o intestino"
            icon={Waves}
            accent="text-dz-azeitona"
            nome="Entero"
            imagePrefix="entero"
            meta={PRODUTOS.entero.apresentacao}
            precos={PRODUTOS.entero.precos}
            unidade={["frasco", "frascos"]}
          />
          <LojaCard
            tag="Para as refeições"
            icon={Utensils}
            accent="text-dz-espinafre"
            nome="Digest"
            imagePrefix="digest"
            meta={PRODUTOS.digest.apresentacao}
            precos={PRODUTOS.digest.precos}
            unidade={["caixa", "caixas"]}
            detalhes="/digest"
          />
        </div>

        <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-dz-tinta/65">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-dz-espinafre" aria-hidden="true" /> Garantia de 7 dias
          </span>
          <span className="inline-flex items-center gap-2">
            <Truck className="h-4 w-4 text-dz-espinafre" aria-hidden="true" /> Entrega para todo o Brasil
          </span>
          <span className="inline-flex items-center gap-2">
            <Check className="h-4 w-4 text-dz-espinafre" aria-hidden="true" /> Fórmula declarada
          </span>
        </div>
      </div>
    </section>
  );
}

function LojaCard({
  tag,
  icon: Icon,
  accent,
  nome,
  sub,
  imagePrefix,
  meta,
  precos,
  unidade,
  featured = false,
  detalhes,
  metaPorQtd,
  badge,
  emBreve = false,
  alto = false,
}: {
  tag: string;
  icon?: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  accent: string;
  nome: string;
  sub?: string;
  imagePrefix: string;
  meta: string;
  precos: Preco[];
  unidade: [string, string];
  featured?: boolean;
  /** Link "Ver detalhes" abaixo do botão de compra. */
  detalhes?: string;
  /** Conteúdo conforme a quantidade escolhida (ex.: "3 Gastro + 3 Entero"). */
  metaPorQtd?: (qtd: string) => string;
  /** Selo no topo do card (padrão "Mais escolhido" quando featured). */
  badge?: string;
  /** Sem preço: botão desativado "Compra disponível em breve". */
  emBreve?: boolean;
  /** Área de imagem mais alta (cards de kit, com vários produtos). */
  alto?: boolean;
}) {
  const [i, setI] = useState(precos.length > 1 ? 1 : 0);
  const p = precos[i];
  const qty = Number(p.qtd);
  const unit1 = parseBRL(precos[0].total);
  const totalNum = parseBRL(p.total);
  const original = unit1 * qty;
  const perUnit = totalNum / qty;
  const label = `${p.qtd} ${qty === 1 ? unidade[0] : unidade[1]}`;
  const msg = `Oi Dossenza! Quero comprar ${label} de Dossenza ${nome} (R$ ${p.total}).`;

  return (
    <div
      className={`relative flex flex-col rounded-3xl border bg-white p-6 shadow-[var(--shadow-card)] md:p-7 ${
        featured ? "border-dz-espinafre ring-4 ring-dz-trigo/35" : badge ? "border-dz-terracota ring-4 ring-dz-terracota/20" : "border-dz-linha"
      }`}
    >
      {(featured || badge) && (
        <span
          className={`label-caps absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 text-[11px] ${
            badge ? "bg-dz-terracota text-dz-creme" : "bg-dz-trigo text-dz-espinafre"
          }`}
        >
          {badge ?? "Mais escolhido"}
        </span>
      )}
      <div className={`label-caps flex items-center gap-2 ${accent}`}>
        {Icon && <Icon className="h-4 w-4" aria-hidden={true} />} {tag}
      </div>

      <div className={`mt-4 flex items-center justify-center ${alto ? "h-52" : "h-40"}`}>
        <img src={asset(`/products/${imagePrefix}-${p.qtd}.webp`)} alt={`Dossenza ${nome} — ${label}`} className={`w-auto max-w-full object-contain ${alto ? "max-h-52" : "max-h-40"}`} />
      </div>

      <h3 className="mt-4 text-2xl font-medium text-dz-espinafre">
        Dossenza <span className={`italic ${accent}`}>{nome}</span>
      </h3>
      {sub && <p className="mt-1 text-sm text-dz-tinta/75">{sub}</p>}
      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-dz-tinta/55">{meta}</p>
      {metaPorQtd && (
        <p className="mt-2 text-sm font-semibold text-dz-espinafre">
          {qty === 1 ? "Leva" : "Levando"} {label}: {metaPorQtd(p.qtd)}
        </p>
      )}

      <div className="mt-5">
        <span className="label-caps text-dz-espinafre/80">Escolha a quantidade</span>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {precos.map((tier, idx) => (
            <button
              key={tier.qtd}
              type="button"
              onClick={() => setI(idx)}
              className={`min-h-10 rounded-full border px-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-dz-trigo ${
                i === idx ? "border-dz-espinafre bg-dz-espinafre text-dz-creme" : "border-dz-linha hover:bg-dz-areia"
              }`}
            >
              {tier.qtd} {Number(tier.qtd) === 1 ? unidade[0] : unidade[1]}
            </button>
          ))}
        </div>
      </div>

      {emBreve ? (
        <div className="my-5 border-y border-dz-linha py-5">
          <p className="font-display text-3xl text-dz-espinafre">Em breve</p>
          <p className="mt-2 text-sm text-dz-tinta/60">Preço e compra disponíveis em breve.</p>
        </div>
      ) : (
      <div className="my-5 border-y border-dz-linha py-5">
        {qty > 1 && <p className="text-sm text-dz-tinta/50 line-through">R$ {fmtBRL(original)}</p>}
        <div className="flex items-baseline gap-1">
          <span className="text-sm text-dz-tinta/60">R$</span>
          <span className="font-display text-5xl text-dz-espinafre">{p.total}</span>
        </div>
        <p className="mt-2 text-sm text-dz-tinta/60">
          R$ {fmtBRL(perUnit)} por {unidade[0]}
        </p>
        {p.economia && <p className={`mt-1 text-xs font-semibold ${accent}`}>{p.economia}</p>}
        {p.frete && (
          <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-dz-espinafre">
            <Truck className="h-3.5 w-3.5" aria-hidden="true" /> {p.frete}
          </p>
        )}
      </div>
      )}

      {emBreve ? (
        <button type="button" disabled className={`mt-auto cursor-not-allowed opacity-70 ${BTN.outline}`}>
          Compra disponível em breve
        </button>
      ) : (
      <a href={whatsappUrl(msg)} target="_blank" rel="noreferrer" className={`mt-auto ${featured ? BTN.primary : BTN.outline}`}>
        Comprar — R$ {p.total}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
      )}
      {detalhes && (
        <Link to={detalhes} className="mt-3 text-center text-sm font-semibold text-dz-espinafre underline underline-offset-4 hover:text-dz-terracota">
          Ver detalhes
        </Link>
      )}
      {!emBreve && <p className="mt-3 text-center text-[11px] text-dz-tinta/50">Compra finalizada pelo WhatsApp</p>}
    </div>
  );
}

/* ---------- DIFERENCIAIS ---------- */
function Diferenciais() {
  return (
    <section className="px-6 py-18 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="label-caps text-dz-terracota">Por que Dossenza</p>
          <h2 className="mt-3 text-4xl font-medium text-dz-espinafre md:text-5xl">A diferença importa.</h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-dz-linha bg-dz-linha md:grid-cols-2">
          {DIFERENCIAIS.map(({ n, t, d }, idx) => (
            <Reveal key={n} delay={((idx % 4) + 1) as 1 | 2 | 3 | 4} className="bg-dz-creme p-8 md:p-10">
              <span className="font-display text-3xl italic text-dz-terracota">{n}</span>
              <h3 className="mt-4 text-2xl font-medium text-dz-espinafre">{t}</h3>
              <p className="mt-2 text-[15px] leading-7 text-dz-tinta/75">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-dz-linha bg-dz-areia px-6 py-18 md:px-10 md:py-24">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <p className="label-caps text-dz-terracota">Perguntas frequentes</p>
          <h2 className="mt-3 text-4xl font-medium text-dz-espinafre md:text-5xl">Tudo que você precisa saber.</h2>
        </Reveal>
        <div className="mt-12 divide-y divide-dz-linha overflow-hidden rounded-3xl border border-dz-linha bg-white">
          {FAQS.map((f, idx) => (
            <Reveal as="details" key={f.q} delay={((idx % 5) + 1) as 1 | 2 | 3 | 4 | 5} className="group p-6 md:p-8">
              <summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-center gap-4 font-display text-lg font-medium text-dz-espinafre md:text-xl [&::-webkit-details-marker]:hidden">
                <span className="min-w-0">{f.q}</span>
                <Plus className="h-5 w-5 shrink-0 text-dz-terracota transition group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="mt-4 text-[16px] leading-relaxed text-dz-tinta/75">{f.a}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA FINAL ---------- */
function CtaFinal() {
  return (
    <section className="relative overflow-hidden bg-dz-terracota px-6 py-14 text-dz-creme md:px-10 md:py-16">
      <img
        src={asset("/brand/simbolo-creme.png")}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-10 w-80 opacity-[0.1] md:w-[30rem]"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-medium md:text-4xl">Ainda com dúvidas?</h2>
          <p className="mt-3 text-base text-dz-creme/85">Fale com o nosso atendimento e escolha o seu foco.</p>
        </div>
        <Link to="/sac" className={`w-full md:w-auto ${BTN.light}`}>
          Falar com o atendimento
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
