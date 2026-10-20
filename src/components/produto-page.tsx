import { Check, Droplets, Waves } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SiteHeader, PriceCards, TrustStrip, Footer, THEME } from "@/components/dossenza-ui";
import { type Produto, BASE_URL } from "@/data/produtos";
import { useHead } from "@/lib/head";

export function ProdutoPage({ produto }: { produto: Produto }) {
  const t = THEME[produto.id];
  const FocoIcon = produto.id === "gastro" ? Droplets : Waves;
  const precoMin = produto.precos[0].total.replace(".", "").replace(",", ".");

  useHead({
    title: `Dossenza ${produto.nome} — ${produto.tagline.replace(/\.$/, "")} | Dossenza`,
    description: produto.descricao,
    path: produto.slug,
    ogType: "product",
    ogImage: produto.image,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `Dossenza ${produto.nome}`,
      description: produto.descricao,
      image: `${BASE_URL}${produto.image}`,
      brand: { "@type": "Brand", name: "Dossenza" },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "BRL",
        lowPrice: precoMin,
        offerCount: produto.precos.length,
        availability: "https://schema.org/InStock",
        url: `${BASE_URL}${produto.slug}`,
      },
    },
  });

  return (
    <div className="min-h-screen bg-dz-creme text-dz-tinta">
      <header className="sticky top-0 z-40">
        <SiteHeader />
      </header>
      <main>
        {/* VENDA — título/descritivo centralizado (padrão das páginas da Galli) */}
        <section id="precos" className="px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <Reveal immediate className="mx-auto max-w-2xl text-center">
              <div className={`label-caps flex items-center justify-center gap-2 ${t.text}`}>
                <FocoIcon className="h-4 w-4" aria-hidden="true" /> Para o {produto.foco}
              </div>
              <h1 className="mt-3 text-4xl font-medium text-dz-espinafre md:text-5xl">
                Dossenza <span className={`italic ${t.text}`}>{produto.nome}</span>
              </h1>
              <p className="mt-3 font-display text-xl text-dz-tinta/80 md:text-2xl">{produto.tagline}</p>
              <p className="label-caps mt-4 text-dz-tinta/55">
                {produto.apresentacao} ·{" "}
                {produto.composicao
                  .filter((c) => !/cápsulas|excipiente/i.test(c.nome))
                  .map((c) => c.nome)
                  .join(" · ")}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {produto.beneficios.map((b) => (
                  <span
                    key={b}
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${t.chip}`}
                  >
                    <Check className="h-3.5 w-3.5" aria-hidden="true" /> {b}
                  </span>
                ))}
              </div>
            </Reveal>
            <div className="mt-10">
              <PriceCards precos={produto.precos} produtoNome={`Dossenza ${produto.nome}`} imagePrefix={produto.id} accent={produto.id} />
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-dz-tinta/55">
              Valores de referência. A compra é finalizada com nossa equipe pelo WhatsApp.
            </p>
            <div className="mt-12">
              <TrustStrip />
            </div>
          </div>
        </section>

        {/* MODO DE USO + COMPOSIÇÃO */}
        <section className="border-t border-dz-linha bg-dz-areia px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <Reveal>
              <p className={`label-caps ${t.text}`}>Modo de uso</p>
              <h2 className="mt-3 text-3xl font-medium text-dz-espinafre md:text-4xl">Simples na sua rotina.</h2>
              <p className="mt-5 max-w-md text-base leading-7 text-dz-tinta/80">{produto.modoUso}</p>
              <p className="mt-6 max-w-md text-xs leading-6 text-dz-tinta/55">
                Composição e modo de uso conforme o rótulo. Este produto é um suplemento alimentar e não substitui uma
                alimentação equilibrada nem acompanhamento profissional.
              </p>
              <div className="mt-8 rounded-2xl border border-dz-linha bg-dz-creme p-5">
                <p className={`label-caps ${t.text}`}>Origem do nome</p>
                <p className="mt-2 font-display text-xl text-dz-espinafre">{produto.origem}</p>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <p className={`label-caps ${t.text}`}>Composição</p>
              <h2 className="mt-3 text-3xl font-medium text-dz-espinafre md:text-4xl">O que há em cada cápsula.</h2>
              <div className="mt-7 overflow-hidden rounded-2xl border border-dz-linha bg-white">
                <div className={`label-caps grid grid-cols-[1fr_auto] px-5 py-3 text-[11px] text-dz-creme ${t.bg}`}>
                  <span>Ativo</span>
                  <span>Quantidade</span>
                </div>
                {produto.composicao.map((item, i) => (
                  <div
                    key={item.nome}
                    className={`grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-3 text-[15px] text-dz-tinta ${
                      i > 0 ? "border-t border-dz-linha" : ""
                    }`}
                  >
                    <span>{item.nome}</span>
                    <span className="text-dz-tinta/70">{item.qtd}</span>
                  </div>
                ))}
              </div>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {produto.ativosDestaque.map((a) => (
                  <li key={a.nome} className="rounded-2xl border border-dz-linha bg-dz-creme p-4">
                    <p className={`text-sm font-semibold ${t.text}`}>{a.nome}</p>
                    <p className="mt-1 text-sm leading-6 text-dz-tinta/70">{a.beneficio}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
