import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Droplets,
  FlaskConical,
  Leaf,
  ListChecks,
  Pill,
  Plus,
  ShieldCheck,
  Stethoscope,
  Truck,
  Waves,
} from "lucide-react";
import { Reveal, RevealImage } from "@/components/reveal";
import { BTN, Footer, Logo, NAV, PriceCards, THEME } from "@/components/dossenza-ui";
import { PRODUTOS, KIT_PRECOS, asset, type Produto } from "@/data/produtos";
import { useHead } from "@/lib/head";

const FAQS = [
  {
    q: "Qual a diferença entre o Gastro e o Entero?",
    a: "Cada um tem um foco. O Gastro reúne enzimas que atuam no estômago (pepsina e protease ácida) com Olea europaea, em cápsulas vegetais. O Entero reúne seis ativos (actinidina, Cynara cardunculus, lipase, alfa-amilase, protease alcalina e alfa-galactosidase) em cápsulas gastrorresistentes, que liberam a fórmula no intestino.",
  },
  {
    q: "Posso usar os dois juntos?",
    a: "Sim. Eles foram pensados como um sistema: o Gastro acompanha a digestão no estômago e o Entero, no intestino. Em caso de dúvida, converse com o seu profissional de saúde.",
  },
  {
    q: "Como devo usar?",
    a: "Gastro e Entero: ingerir 2x ao dia, 1 cápsula junto com o almoço e 1 cápsula junto com o jantar, ou conforme orientação do profissional de saúde. No Entero, não abra nem mastigue a cápsula: o revestimento gastrorresistente leva a fórmula até o intestino.",
  },
  {
    q: "O que são cápsulas gastrorresistentes?",
    a: "São cápsulas com revestimento que resiste à acidez do estômago e se dissolve no intestino. É o que permite ao Entero liberar as enzimas onde elas atuam.",
  },
  {
    q: "Como funciona a garantia?",
    a: "Você tem 7 dias para testar. Se não ficar satisfeito, abra um chamado no nosso SAC e orientamos a devolução.",
  },
  {
    q: "Como funciona a compra?",
    a: "Por enquanto, a compra é feita diretamente com a nossa equipe pelo WhatsApp. É só escolher a opção desejada e clicar em Adquirir.",
  },
  {
    q: "Os produtos substituem acompanhamento médico?",
    a: "Não. Gastro e Entero são suplementos alimentares, não medicamentos. Eles não substituem uma alimentação equilibrada nem o acompanhamento de um profissional de saúde.",
  },
];

const DESCRIPTION =
  "Dossenza Gastro e Entero: enzimas digestivas para o estômago e para o intestino, com cada ativo apresentado pelo que é. O cuidado começa por dentro.";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function HomePage() {
  useHead({
    title: "Dossenza — Gastro & Entero | Enzimas digestivas para o estômago e o intestino",
    description: DESCRIPTION,
    path: "/",
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
          <Hero />
        </div>
        <BenefitStrip />
        <Produtos />
        <ProdutoEntero />
        <Sistema />
        <Fluxo />
        <Diferenciais />
        <Manifesto />
        <FAQ />
        <CtaFinal />
      </main>
      <Footer />
    </div>
  );
}

/* ---------- STICKY HEADER ---------- */
function StickyHeader({ visible }: { visible: boolean }) {
  return (
    <div
      className={`fixed inset-x-0 top-0 z-40 border-b border-dz-linha bg-dz-creme/92 backdrop-blur transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-10">
        <a href="#inicio" aria-label="Voltar ao início">
          <Logo variant="terracota" className="h-6" />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href.replace("/", "")} className="text-sm text-dz-tinta/75 transition-colors hover:text-dz-espinafre">
              {n.label}
            </a>
          ))}
        </nav>
        <a href="#produtos" className={`${BTN.primary} min-h-10 px-5`}>
          Ver produtos
        </a>
      </div>
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-dz-creme md:flex md:min-h-svh md:flex-col">
      {/* Foto-banner (frascos à direita); no mobile a foto aparece abaixo do texto.
          A seção ocupa exatamente uma tela (min-h-svh). A foto é 16:9; quando a janela é mais larga
          que isso o cover corta um pouco na vertical — o "right 80%" joga esse corte para o alto
          (parede), e não para os frascos, que ficam na parte de baixo da foto. */}
      <div
        className="absolute inset-0 hidden bg-cover bg-no-repeat md:block md:bg-[position:right_80%]"
        style={{ backgroundImage: `url('${asset("/waves/hero-banner.webp")}')` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 hidden md:block"
        style={{ background: "linear-gradient(90deg, rgba(246,240,228,0.97) 0%, rgba(246,240,228,0.9) 30%, rgba(246,240,228,0.45) 48%, rgba(246,240,228,0) 62%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pb-14 pt-6 md:px-10 md:pb-24 md:pt-7">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-6 border-b border-dz-espinafre/15 pb-5">
          <Logo variant="terracota" className="h-7 md:h-9" />
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href.replace("/", "")} className="text-sm text-dz-espinafre/80 transition-colors hover:text-dz-terracota">
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#produtos" className={`${BTN.primary} hidden min-h-10 px-5 md:inline-flex`}>
            Ver produtos
          </a>
        </div>

        <div className="flex flex-1 items-center py-8 md:py-10">
          <Reveal immediate className="w-full max-w-xl">
            <p className="label-caps text-dz-terracota">Dossenza · Cuidado digestivo</p>
            <h1 className="mt-6 text-5xl font-medium leading-[1.02] text-dz-espinafre md:text-7xl lg:text-[5.2rem]">
              O cuidado começa <span className="italic text-dz-terracota">por dentro.</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-dz-tinta/80 md:text-lg md:leading-8">
              Gastro para o estômago, Entero para o intestino. Enzimas digestivas em duas fórmulas claras, com cada
              ativo apresentado pelo que é.
            </p>
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a href="#produtos" className={`group w-full sm:w-auto ${BTN.primary}`}>
                Conhecer os produtos
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a href="#sistema" className={`w-full sm:w-auto ${BTN.outline}`}>
                Ver o sistema completo
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-dz-espinafre/70">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Garantia de 7 dias
              </span>
              <span className="flex items-center gap-2">
                <Truck className="h-4 w-4" aria-hidden="true" /> Entrega para todo o Brasil
              </span>
            </div>
          </Reveal>
        </div>

        <div className="overflow-hidden rounded-3xl border border-dz-linha shadow-[var(--shadow-card)] md:hidden">
          <img
            src={asset("/waves/hero-banner.webp")}
            alt="Frascos Dossenza Gastro e Entero sobre pedra, com ondas da marca ao fundo"
            className="w-full object-cover"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- BENEFIT STRIP ---------- */
function BenefitStrip() {
  const items = [
    { icon: FlaskConical, label: "Enzimas digestivas" },
    { icon: ListChecks, label: "Fórmula declarada" },
    { icon: Pill, label: "60 cápsulas" },
    { icon: Leaf, label: "Ativos botânicos" },
    { icon: Stethoscope, label: "Origem médica" },
    { icon: ShieldCheck, label: "7 dias de garantia" },
  ];
  return (
    <section aria-label="Características dos produtos Dossenza" className="border-y border-dz-linha bg-dz-areia">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-6 py-10 md:grid-cols-6 md:gap-y-0 md:px-10">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-3 text-center">
            <Icon className="h-8 w-8 text-dz-espinafre" strokeWidth={1.3} aria-hidden="true" />
            <span className="text-sm font-medium text-dz-espinafre">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- PRODUTOS ---------- */
function Produtos() {
  return (
    <section id="produtos" className="scroll-mt-20 px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid gap-6 border-b border-dz-linha pb-7 md:grid-cols-[1fr_2fr] md:items-end">
          <p className="label-caps text-dz-terracota">Os produtos</p>
          <h2 className="max-w-3xl text-4xl font-medium leading-tight text-dz-espinafre md:text-5xl">
            Cada foco digestivo, <span className="italic text-dz-terracota">apresentado pelo que é.</span>
          </h2>
        </Reveal>
        <div className="mt-14">
          <ProdutoRow produto={PRODUTOS.gastro} dark={false} />
        </div>
      </div>
    </section>
  );
}

/* ---------- PRODUTO ENTERO (seção escura em espinafre) ---------- */
function ProdutoEntero() {
  return (
    <section className="relative overflow-hidden bg-dz-espinafre px-6 py-20 md:px-10 md:py-28">
      <img
        src={asset("/brand/simbolo-creme.png")}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-10 w-[26rem] opacity-[0.05] md:w-[34rem]"
      />
      <div className="relative mx-auto max-w-7xl">
        <ProdutoRow produto={PRODUTOS.entero} dark />
      </div>
    </section>
  );
}

function ProdutoRow({ produto, dark }: { produto: Produto; dark: boolean }) {
  const t = THEME[produto.id];
  const FocoIcon = produto.id === "gastro" ? Droplets : Waves;
  const c = dark
    ? {
        eyebrow: "text-dz-trigo",
        title: "text-dz-creme",
        accent: "text-dz-trigo",
        body: "text-dz-creme/75",
        chip: "border border-dz-creme/20 bg-dz-creme/8 text-dz-creme",
        bulletBox: "bg-dz-azeitona text-dz-creme",
        line: "border-dz-creme/15",
        meta: "text-dz-creme/70",
        divider: "bg-dz-creme/25",
        imgBorder: "border-dz-azeitona/50",
        btn: `${BTN.light}`,
      }
    : {
        eyebrow: t.text,
        title: "text-dz-espinafre",
        accent: t.text,
        body: "text-dz-tinta/80",
        chip: t.chip,
        bulletBox: t.check,
        line: "border-dz-linha",
        meta: "text-dz-tinta/70",
        divider: "bg-dz-linha",
        imgBorder: "border-dz-linha",
        btn: `${BTN.primary.replace("bg-dz-espinafre text-dz-creme hover:bg-dz-musgo focus-visible:ring-dz-espinafre", "")} ${t.btn} ${t.ring}`,
      };
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal>
        <Link to={produto.slug} className={`block overflow-hidden rounded-3xl border ${c.imgBorder} shadow-[var(--shadow-card)]`}>
          <RevealImage
            src={asset(produto.image)}
            alt={produto.imageAlt}
            loading="lazy"
            wrapperClassName="w-full"
            className="aspect-[5/4] w-full object-cover"
          />
        </Link>
      </Reveal>

      <Reveal delay={2}>
        <div className={`label-caps flex items-center gap-2 ${c.eyebrow}`}>
          <FocoIcon className="h-4 w-4" aria-hidden="true" /> Para o {produto.foco}
        </div>
        <h3 className={`mt-4 text-4xl font-medium md:text-5xl ${c.title}`}>
          Dossenza <span className={`italic ${c.accent}`}>{produto.nome}</span>
        </h3>
        <p className={`mt-2 font-display text-xl ${c.body}`}>{produto.tagline}</p>
        <p className={`mt-4 max-w-xl text-base leading-7 md:text-lg ${c.body}`}>{produto.descricao}</p>

        <ul className="mt-7 space-y-3">
          {produto.beneficios.map((b) => (
            <li key={b} className={`flex items-center gap-3 text-base ${c.title}`}>
              <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${c.bulletBox}`}>
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-2">
          {produto.ativosDestaque.map((a) => (
            <span key={a.nome} className={`rounded-full px-3 py-1 text-xs font-medium ${c.chip}`}>
              {a.nome}
            </span>
          ))}
        </div>

        <div className={`mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-5 text-sm ${c.line} ${c.meta}`}>
          <span>{produto.apresentacao}</span>
          <span className={`h-3 w-px ${c.divider}`} aria-hidden="true" />
          <span>{produto.origem}</span>
        </div>

        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Link to={produto.slug} className={`w-full sm:w-auto ${c.btn}`}>
            Adquirir
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <span className={`text-sm ${c.meta}`}>
            A partir de <strong className={c.title}>R$ {produto.precos[0].total}</strong>
          </span>
        </div>
      </Reveal>
    </div>
  );
}

/* ---------- SISTEMA (Gastro + Entero) ---------- */
function Sistema() {
  return (
    <section id="sistema" className="scroll-mt-20 border-b border-dz-linha bg-dz-areia px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-dz-linha shadow-[var(--shadow-card)]">
              <RevealImage
                src={asset("/photos/sistema.webp")}
                alt="Frascos Dossenza Gastro e Entero sobre uma mesa, com ondas da marca ao fundo"
                loading="lazy"
                wrapperClassName="w-full"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={2}>
            <p className="label-caps text-dz-terracota">Sistema completo · Gastro + Entero</p>
            <h2 className="mt-3 text-4xl font-medium text-dz-espinafre md:text-5xl">
              Um sistema. <span className="italic text-dz-terracota">Dois nomes.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-dz-tinta/80 md:text-lg">
              A digestão é um caminho: começa no estômago e segue para o intestino. Gastro e Entero foram pensados para
              acompanhar cada etapa, e juntos têm preços especiais nos combos de 3 e 5.
            </p>
            <ul className="mt-6 space-y-2">
              {["1 Dossenza Gastro (60 cápsulas vegetais)", "1 Dossenza Entero (60 cápsulas gastrorresistentes)", "Do estômago ao intestino, em um só cuidado"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-base text-dz-tinta">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-dz-espinafre text-dz-creme">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-14">
          <PriceCards precos={KIT_PRECOS} produtoNome="Sistema Dossenza (Gastro + Entero)" imagePrefix="kit" />
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-dz-tinta/55">
            Valores de referência. A compra é finalizada com nossa equipe pelo WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- FLUXO (do estômago ao intestino) ---------- */
function Fluxo() {
  const passos = [
    {
      icon: Droplets,
      tag: "Estômago · Gastro",
      titulo: "Onde a digestão começa",
      desc: "Gastro- vem do grego gastér: estômago. Pepsina e protease ácida são enzimas ativas no meio ácido do estômago, o primeiro passo da digestão das proteínas.",
      cor: "bg-dz-terracota",
    },
    {
      icon: Waves,
      tag: "Intestino · Entero",
      titulo: "Onde ela se completa",
      desc: "Entero- vem do grego énteron: intestino. Cápsulas gastrorresistentes atravessam o estômago e liberam seis enzimas e ativos no intestino, onde eles atuam.",
      cor: "bg-dz-azeitona",
    },
  ];
  return (
    <section id="fluxo" className="relative overflow-hidden bg-dz-espinafre px-6 py-20 text-dz-creme md:px-10 md:py-28">
      <img
        src={asset("/brand/simbolo-creme.png")}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-16 w-80 opacity-[0.05] md:w-[30rem]"
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="label-caps text-dz-trigo">O fluxo</p>
          <h2 className="mt-3 text-4xl font-medium md:text-5xl">Do estômago ao intestino.</h2>
          <p className="mt-5 text-base leading-7 text-dz-creme/75 md:text-lg">
            Duas curvas abertas evocam o movimento do interior. Duas fórmulas acompanham esse caminho.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {passos.map(({ icon: Icon, tag, titulo, desc, cor }, i) => (
            <Reveal key={tag} delay={(i + 1) as 1 | 2} className="rounded-3xl border border-dz-creme/15 bg-dz-creme/5 p-8 md:p-12">
              <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${cor} text-dz-creme`}>
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="label-caps mt-6 text-dz-trigo">{tag}</p>
              <h3 className="mt-2 text-2xl font-medium text-dz-creme">{titulo}</h3>
              <p className="mt-3 max-w-md text-base leading-7 text-dz-creme/75">{desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- DIFERENCIAIS ---------- */
function Diferenciais() {
  const itens = [
    { n: "01", t: "Você sabe o que escolhe", d: "Ativos e quantidades apresentados de forma clara, no rótulo e no site, para uma escolha consciente." },
    { n: "02", t: "Um foco por fórmula", d: "Gastro para o estômago, Entero para o intestino. Cada produto é apresentado pelo que é, sem promessas genéricas." },
    { n: "03", t: "Essência é clareza", d: "Dossenza une Dosso, sobrenome da Dra. Lidiana, a essenza, essência em italiano. Aqui, essência é clareza, não simplificação." },
    { n: "04", t: "Origem médica", d: "A marca nasce da especialidade da Dra. Lidiana Dosso, a médica do intestino, e amplia esse ponto de partida para uma linha digestiva." },
  ];
  return (
    <section id="diferenciais" className="scroll-mt-20 px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="label-caps text-dz-terracota">Por que Dossenza</p>
          <h2 className="mt-3 text-4xl font-medium text-dz-espinafre md:text-5xl">A diferença importa.</h2>
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-dz-linha bg-dz-linha md:grid-cols-2">
          {itens.map(({ n, t, d }, i) => (
            <Reveal key={n} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="bg-dz-creme p-8 md:p-10">
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

/* ---------- MANIFESTO (foto do MIV p.9) ---------- */
function Manifesto() {
  return (
    <section className="relative overflow-hidden bg-dz-areia">
      <div className="mx-auto grid max-w-7xl items-stretch md:grid-cols-2">
        <Reveal className="relative min-h-[320px] md:min-h-[560px]">
          <img
            src={asset("/photos/manifesto.webp")}
            alt="Mulher de linho claro em um pátio ensolarado"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-[28%_center]"
          />
        </Reveal>
        <Reveal delay={2} className="flex flex-col justify-center px-6 py-16 md:px-14 md:py-24">
          <p className="label-caps text-dz-terracota">Manifesto</p>
          <h2 className="mt-4 text-4xl font-medium leading-tight text-dz-espinafre md:text-5xl">
            O intestino é parte. <br />
            <span className="italic text-dz-terracota">O essencial é você.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-dz-tinta/80 md:text-lg">
            Cuidar da digestão não é um fim em si. É um gesto a favor do seu dia, da sua energia e da sua presença.
            Por isso cada fórmula Dossenza é clara sobre o que é, e sobre o que faz.
          </p>
          <div className="mt-8">
            <a href="#produtos" className={BTN.primary}>
              Começar por dentro
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  return (
    <section id="faq" className="scroll-mt-20 px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <p className="label-caps text-dz-terracota">Perguntas frequentes</p>
          <h2 className="mt-3 text-4xl font-medium text-dz-espinafre md:text-5xl">Tudo que você precisa saber.</h2>
        </Reveal>
        <div className="mt-12 divide-y divide-dz-linha overflow-hidden rounded-3xl border border-dz-linha bg-white">
          {FAQS.map((f, i) => (
            <Reveal as="details" key={f.q} delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5} className="group p-6 md:p-8">
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
    <section className="relative overflow-hidden bg-dz-terracota px-6 py-16 text-dz-creme md:px-10 md:py-20">
      <img
        src={asset("/brand/simbolo-creme.png")}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-10 w-80 opacity-[0.1] md:w-[30rem]"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="label-caps text-dz-creme/80">Atendimento</p>
          <h2 className="mt-3 text-3xl font-medium md:text-4xl">Precisa de ajuda? Fale com a gente.</h2>
          <p className="mt-3 max-w-lg text-base text-dz-creme/85">
            Dúvidas sobre pedido, entrega, troca ou produto: abra um chamado e nosso time responde pelo canal que
            você escolher.
          </p>
        </div>
        <Link to="/sac" className={`w-full md:w-auto ${BTN.light}`}>
          Abrir chamado no SAC
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
