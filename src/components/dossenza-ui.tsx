import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck, MessageCircle, Lock, ShoppingBag } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { type Preco, type ProdutoId, asset, whatsappUrl } from "@/data/produtos";

export const NAV = [
  { href: "/#produtos", label: "Produtos" },
  { href: "/#sistema", label: "Sistema" },
  { href: "/#diferenciais", label: "Diferenciais" },
  { href: "/#faq", label: "FAQ" },
];

/* Expressão de cor de cada produto (MIV p.7). Strings completas para o scanner do Tailwind. */
export const THEME: Record<
  ProdutoId,
  {
    bg: string;
    text: string;
    border: string;
    soft: string;
    softText: string;
    btn: string;
    ring: string;
    chip: string;
    check: string;
  }
> = {
  gastro: {
    bg: "bg-dz-terracota",
    text: "text-dz-terracota",
    border: "border-dz-terracota",
    soft: "bg-dz-terracota/10",
    softText: "text-dz-terracota",
    btn: "bg-dz-terracota text-dz-creme hover:bg-[#b25f42]",
    ring: "focus-visible:ring-dz-terracota",
    chip: "border border-dz-terracota/30 bg-dz-terracota/8 text-dz-terracota",
    check: "bg-dz-terracota/12 text-dz-terracota",
  },
  entero: {
    bg: "bg-dz-azeitona",
    text: "text-dz-azeitona",
    border: "border-dz-azeitona",
    soft: "bg-dz-azeitona/10",
    softText: "text-dz-azeitona",
    btn: "bg-dz-azeitona text-dz-creme hover:bg-[#5a6634]",
    ring: "focus-visible:ring-dz-azeitona",
    chip: "border border-dz-azeitona/30 bg-dz-azeitona/8 text-dz-azeitona",
    check: "bg-dz-azeitona/12 text-dz-azeitona",
  },
};

/* ---------- Logo ---------- */
export function Logo({
  variant = "terracota",
  className = "h-7",
}: {
  variant?: "terracota" | "espinafre" | "creme" | "branco";
  className?: string;
}) {
  return <img src={asset(`/brand/logo-${variant}.png`)} alt="Dossenza" className={`${className} w-auto`} draggable={false} />;
}

/* ---------- Botões ---------- */
const BTN_BASE =
  "inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2";
export const BTN = {
  primary: `${BTN_BASE} bg-dz-espinafre text-dz-creme hover:bg-dz-musgo focus-visible:ring-dz-espinafre`,
  outline: `${BTN_BASE} border border-dz-espinafre text-dz-espinafre hover:bg-dz-areia focus-visible:ring-dz-espinafre`,
  light: `${BTN_BASE} bg-dz-creme text-dz-espinafre hover:bg-white focus-visible:ring-dz-creme`,
  lightOutline: `${BTN_BASE} border border-dz-creme/60 text-dz-creme hover:bg-dz-creme/10 focus-visible:ring-dz-creme`,
};

/* ---------- Cabeçalho do site (home, loja e páginas de produto) ----------
   overlay = dentro do banner (sem fundo, logo maior); dark = sobre fundo espinafre.
   O botão da sacola ainda não tem função (como na Galli). */
export function SiteHeader({ overlay = false, dark = false }: { overlay?: boolean; dark?: boolean }) {
  const navText = dark ? "text-dz-creme/85 hover:text-dz-trigo" : "text-dz-espinafre/80 hover:text-dz-terracota";
  return (
    <div className={overlay ? "" : "border-b border-dz-linha bg-dz-creme/92 backdrop-blur"}>
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-6 ${
          overlay ? `border-b pb-5 ${dark ? "border-dz-creme/25" : "border-dz-espinafre/15"}` : "px-6 py-3 md:px-10"
        }`}
      >
        <Link to="/" aria-label="Dossenza — página inicial" className="shrink-0">
          <Logo variant={dark ? "creme" : "terracota"} className={overlay ? "h-7 md:h-9" : "h-6"} />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link key={n.href} to={n.href} className={`text-sm transition-colors ${navText}`}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/loja" className={`${dark ? BTN.light : BTN.primary} min-h-10 px-5`}>
            Loja
          </Link>
          <button
            type="button"
            aria-label="Sacola"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
              dark
                ? "border-dz-creme/60 text-dz-creme hover:bg-dz-creme/10"
                : "border-dz-espinafre text-dz-espinafre hover:bg-dz-areia"
            }`}
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Cabeçalho fixo que aparece ao rolar (home e loja) ---------- */
export function StickyHeader({ visible }: { visible: boolean }) {
  return (
    <div
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <SiteHeader />
    </div>
  );
}

/* ---------- Grade de preços (sem checkout — leva ao WhatsApp) ---------- */
export function PriceCards({
  precos,
  produtoNome,
  imagePrefix,
  accent,
}: {
  precos: Preco[];
  produtoNome: string;
  imagePrefix: string;
  accent?: ProdutoId;
}) {
  const eyebrow = accent ? THEME[accent].text : "text-dz-espinafre";
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {precos.map((p, i) => {
        const featured = !!p.destaque;
        const msg = `Oi Dossenza! Quero adquirir ${p.label} de ${produtoNome}.`;
        return (
          <Reveal
            key={p.qtd}
            delay={((i % 3) + 1) as 1 | 2 | 3}
            className={`relative flex flex-col rounded-3xl border bg-white p-8 shadow-[var(--shadow-card)] ${
              featured ? "border-dz-espinafre ring-4 ring-dz-trigo/35" : "border-dz-linha"
            }`}
          >
            {p.destaque && (
              <span className="label-caps absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-dz-trigo px-4 py-1 text-[11px] text-dz-espinafre">
                {p.destaque}
              </span>
            )}
            <div className="mb-5 flex h-40 items-end justify-center">
              <img
                src={asset(`/products/${imagePrefix}-${p.qtd}.webp`)}
                alt={`${produtoNome} — ${p.label}`}
                loading="lazy"
                className="max-h-40 w-auto max-w-full object-contain"
              />
            </div>
            <p className={`label-caps ${eyebrow}`}>{p.label}</p>
            <p className="mt-1 text-sm text-dz-tinta/60">{p.unidade}</p>
            <div className="my-6 border-y border-dz-linha py-6">
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-dz-tinta/60">R$</span>
                <span className="font-display text-5xl text-dz-espinafre">{p.total}</span>
              </div>
              {p.economia && <p className={`mt-2 text-xs font-semibold ${eyebrow}`}>{p.economia}</p>}
            </div>
            <a
              href={whatsappUrl(msg)}
              target="_blank"
              rel="noreferrer"
              className={`mt-auto ${featured ? BTN.primary : BTN.outline}`}
            >
              Adquirir
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>
        );
      })}
    </div>
  );
}

/* ---------- Selos de confiança ---------- */
export function TrustStrip({ dark = false }: { dark?: boolean }) {
  const itens = [
    { icon: ShieldCheck, label: "Garantia de 7 dias" },
    { icon: Lock, label: "Compra segura" },
    { icon: Truck, label: "Entrega para todo o Brasil" },
    { icon: MessageCircle, label: "Suporte rápido" },
  ];
  return (
    <div className="mx-auto grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
      {itens.map(({ icon: Icon, label }) => (
        <div key={label} className="flex flex-col items-center gap-2 text-center">
          <Icon className={`h-6 w-6 ${dark ? "text-dz-trigo" : "text-dz-espinafre"}`} strokeWidth={1.4} aria-hidden="true" />
          <span className={`text-xs ${dark ? "text-dz-creme/75" : "text-dz-tinta/70"}`}>{label}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------- Rodapé ---------- */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-dz-espinafre text-dz-creme">
      <img
        src={asset("/brand/simbolo-creme.png")}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-16 w-72 opacity-[0.06] md:w-96"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-14 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link to="/" aria-label="Dossenza — página inicial" className="inline-block">
              <Logo variant="creme" className="h-8" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-dz-creme/70">
              O cuidado começa por dentro. Gastro e Entero são suplementos alimentares, não medicamentos, e não
              substituem uma alimentação equilibrada nem acompanhamento profissional.
            </p>
          </div>
          <div>
            <div className="label-caps text-dz-trigo">Navegação</div>
            <ul className="mt-4 space-y-2 text-sm text-dz-creme/75">
              <li>
                <Link to="/" className="transition-colors hover:text-dz-trigo">
                  Página inicial
                </Link>
              </li>
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link to={n.href} className="transition-colors hover:text-dz-trigo">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="label-caps text-dz-trigo">Produtos e ajuda</div>
            <ul className="mt-4 space-y-2 text-sm text-dz-creme/75">
              <li>
                <Link to="/gastro" className="transition-colors hover:text-dz-trigo">
                  Dossenza Gastro
                </Link>
              </li>
              <li>
                <Link to="/entero" className="transition-colors hover:text-dz-trigo">
                  Dossenza Entero
                </Link>
              </li>
              <li>
                <Link to="/loja" className="transition-colors hover:text-dz-trigo">
                  Loja
                </Link>
              </li>
              <li>
                <Link to="/sac" className="transition-colors hover:text-dz-trigo">
                  Atendimento (SAC)
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 grid gap-2 border-t border-dz-creme/15 pt-6 text-center text-xs text-dz-creme/60 md:grid-cols-[1fr_auto] md:text-left">
          <p>© {new Date().getFullYear()} Dossenza. Todos os direitos reservados.</p>
          <p className="md:text-right">
            Desenvolvido por{" "}
            <a
              href="https://suamarcawellness.com.br/"
              target="_blank"
              rel="noreferrer"
              className="text-dz-creme underline underline-offset-4 transition-colors hover:text-dz-trigo"
            >
              SMW
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

