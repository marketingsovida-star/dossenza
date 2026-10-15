/* ---------- Dossenza — dados dos produtos, preços e contato ---------- */

// TODO: trocar pelo domínio final quando a hospedagem estiver definida.
export const BASE_URL = "https://dossenza.com.br";

/** Versão dos arquivos de /public — subir quando trocar imagens para furar o cache do navegador. */
const ASSET_VERSION = "4";

/** Caminho de arquivo de /public respeitando a base do Vite ("/dossenza/" no GitHub Pages, "/" em domínio próprio). */
export const asset = (p: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, "")}${p}${p.includes("?") ? "&" : "?"}v=${ASSET_VERSION}`;

// TODO: número do WhatsApp da Dossenza (DDI + DDD + número, só dígitos).
export const WHATSAPP_NUMBER = "5500000000000";
export const WHATSAPP_DISPLAY = "(00) 00000-0000";

export const whatsappUrl = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

/* ---------- SAC (página /sac) ---------- */
// TODO: e-mail que recebe os chamados (usado no fallback por e-mail e no texto da página).
export const SAC_EMAIL = "sac@dossenza.com.br";
// Endpoint de formulário (Formspree, Web3Forms ou similar — aceita POST multipart com anexos).
// Vazio = sem backend: o formulário abre o e-mail do cliente já preenchido (sem anexos).
export const SAC_FORM_ENDPOINT = "";

export type Preco = {
  qtd: "1" | "3" | "5";
  label: string;
  total: string;
  unidade: string;
  economia?: string;
  destaque?: "Mais vendido" | "Melhor escolha";
};

export type ItemComposicao = { nome: string; qtd: string };

export type ProdutoId = "gastro" | "entero";

export type Produto = {
  id: ProdutoId;
  slug: string;
  nome: string;
  /** Cor de expressão do produto no MIV. */
  cor: "terracota" | "azeitona";
  foco: string; // "estômago" | "intestino"
  tagline: string; // "Enzimas digestivas para o estômago."
  descricao: string;
  origem: string; // etimologia (MIV p.10)
  apresentacao: string; // "60 cápsulas vegetais"
  capsula: string;
  modoUso: string;
  beneficios: string[];
  ativosDestaque: { nome: string; beneficio: string }[];
  composicao: ItemComposicao[];
  precos: Preco[];
  image: string;
  imageCutout: string;
  imageAlt: string;
};

export const PRODUTOS: Record<ProdutoId, Produto> = {
  gastro: {
    id: "gastro",
    slug: "/gastro",
    nome: "Gastro",
    cor: "terracota",
    foco: "estômago",
    tagline: "Enzimas digestivas para o estômago.",
    descricao:
      "Pepsina, protease ácida e Olea europaea em cápsulas vegetais: uma fórmula pensada para acompanhar a digestão no estômago, com cada ativo apresentado pelo que é.",
    origem: "Gastro- vem do grego gastér: estômago.",
    apresentacao: "60 cápsulas vegetais",
    capsula: "Cápsulas vegetais",
    modoUso:
      "Ingerir 1 cápsula junto com o almoço e 1 cápsula junto com o jantar, ou conforme orientação profissional.",
    beneficios: ["Apoio à digestão no estômago", "Enzimas em dose declarada", "Cápsulas vegetais"],
    ativosDestaque: [
      { nome: "Pepsina", beneficio: "Enzima que atua na quebra das proteínas no estômago." },
      { nome: "Protease ácida", beneficio: "Protease ativa no pH ácido do estômago." },
      { nome: "Olea europaea", beneficio: "Extrato de oliveira, ativo botânico da fórmula." },
    ],
    composicao: [
      { nome: "Olea europaea", qtd: "100 mg" },
      { nome: "Protease ácida", qtd: "50 mg" },
      { nome: "Pepsina", qtd: "30 mg" },
      { nome: "Excipiente q.s.p.", qtd: "1 dose" },
    ],
    precos: [
      { qtd: "1", label: "1 frasco", total: "139,90", unidade: "R$ 139,90 por frasco" },
      {
        qtd: "3",
        label: "3 frascos",
        total: "314,90",
        unidade: "R$ 104,97 por frasco",
        economia: "Economize R$ 104,80",
        destaque: "Mais vendido",
      },
      {
        qtd: "5",
        label: "5 frascos",
        total: "503,90",
        unidade: "R$ 100,78 por frasco",
        economia: "Economize R$ 195,60",
        destaque: "Melhor escolha",
      },
    ],
    image: "/products/gastro-card.webp",
    imageCutout: "/products/gastro-cutout.webp",
    imageAlt: "Dossenza Gastro — frasco com 60 cápsulas, rótulo creme e ondas terracota",
  },
  entero: {
    id: "entero",
    slug: "/entero",
    nome: "Entero",
    cor: "azeitona",
    foco: "intestino",
    tagline: "Enzimas digestivas para o intestino.",
    descricao:
      "Seis ativos em cápsulas gastrorresistentes, que atravessam o estômago para liberar as enzimas no intestino: actinidina, Cynara cardunculus, lipase, alfa amilase, protease alcalina e alfa galactosidase.",
    origem: "Entero- vem do grego énteron: intestino.",
    apresentacao: "60 cápsulas gastrorresistentes",
    capsula: "Cápsulas gastrorresistentes",
    modoUso:
      "Ingerir 1 cápsula junto com o almoço e 1 cápsula junto com o jantar, ou conforme orientação profissional.",
    beneficios: ["Apoio à digestão no intestino", "Seis enzimas e ativos", "Cápsulas gastrorresistentes"],
    ativosDestaque: [
      { nome: "Actinidina", beneficio: "Enzima do kiwi que atua sobre proteínas." },
      { nome: "Alfa galactosidase", beneficio: "Enzima ligada à digestão de carboidratos de leguminosas." },
      { nome: "Cynara cardunculus", beneficio: "Extrato botânico da família da alcachofra." },
      { nome: "Lipase", beneficio: "Enzima que atua sobre as gorduras." },
      { nome: "Alfa amilase", beneficio: "Enzima que atua sobre os amidos." },
      { nome: "Protease alcalina", beneficio: "Protease ativa no pH do intestino." },
    ],
    composicao: [
      { nome: "Actinidina", qtd: "100 mg" },
      { nome: "Cynara cardunculus", qtd: "100 mg" },
      { nome: "Lipase", qtd: "80 mg" },
      { nome: "Alfa amilase", qtd: "70 mg" },
      { nome: "Protease alcalina", qtd: "50 mg" },
      { nome: "Alfa galactosidase", qtd: "50 mg" },
      { nome: "Excipiente q.s.p.", qtd: "1 dose" },
    ],
    precos: [
      { qtd: "1", label: "1 frasco", total: "184,90", unidade: "R$ 184,90 por frasco" },
      {
        qtd: "3",
        label: "3 frascos",
        total: "416,90",
        unidade: "R$ 138,97 por frasco",
        economia: "Economize R$ 137,80",
        destaque: "Mais vendido",
      },
      {
        qtd: "5",
        label: "5 frascos",
        total: "665,90",
        unidade: "R$ 133,18 por frasco",
        economia: "Economize R$ 258,60",
        destaque: "Melhor escolha",
      },
    ],
    image: "/products/entero-card.webp",
    imageCutout: "/products/entero-cutout.webp",
    imageAlt: "Dossenza Entero — frasco com 60 cápsulas gastrorresistentes, rótulo creme e ondas azeitona",
  },
};

// Sistema completo = Gastro + Entero (preço = soma das faixas individuais)
export const KIT_PRECOS: Preco[] = [
  { qtd: "1", label: "1 sistema", total: "324,80", unidade: "1 Gastro + 1 Entero" },
  {
    qtd: "3",
    label: "3 sistemas",
    total: "731,80",
    unidade: "3 Gastro + 3 Entero",
    economia: "Economize R$ 242,60",
    destaque: "Mais vendido",
  },
  {
    qtd: "5",
    label: "5 sistemas",
    total: "1.169,80",
    unidade: "5 Gastro + 5 Entero",
    economia: "Economize R$ 454,20",
    destaque: "Melhor escolha",
  },
];
