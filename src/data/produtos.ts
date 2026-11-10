/* ---------- Dossenza — dados dos produtos, preços e contato ---------- */

// TODO: trocar pelo domínio final quando a hospedagem estiver definida.
export const BASE_URL = "https://dossenza.com.br";

/** Versão dos arquivos de /public — subir quando trocar imagens para furar o cache do navegador. */
const ASSET_VERSION = "8";

/** Caminho de arquivo de /public respeitando a base do Vite ("/dossenza/" no GitHub Pages, "/" em domínio próprio). */
export const asset = (p: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, "")}${p}${p.includes("?") ? "&" : "?"}v=${ASSET_VERSION}`;

// TODO: número do WhatsApp da Dossenza (DDI + DDD + número, só dígitos).
export const WHATSAPP_NUMBER = "5500000000000";
export const WHATSAPP_DISPLAY = "(00) 00000-0000";

export const whatsappUrl = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

/** Link de compra da oferta: checkout da Payt quando cadastrado, senão WhatsApp com a mensagem pronta. */
export const compraUrl = (preco: Preco, msg: string) => preco.checkout ?? whatsappUrl(msg);

/* ---------- SAC (página /sac) ---------- */
// TODO: e-mail que recebe os chamados (usado no fallback por e-mail e no texto da página).
export const SAC_EMAIL = "sac@dossenza.com.br";
// Endpoint de formulário (Formspree, Web3Forms ou similar — aceita POST multipart com anexos).
// Vazio = sem backend: o formulário abre o e-mail do cliente já preenchido (sem anexos).
export const SAC_FORM_ENDPOINT = "";

/* ---------- Pharma (página /pharma e seção Pharma) ---------- */
// TODO: e-mail que recebe as solicitações de manipulação (fallback sem backend).
export const PHARMA_EMAIL = "pharma@dossenza.com.br";
// Endpoint de formulário (Formspree, Web3Forms ou similar — aceita POST multipart com a receita anexada).
// Vazio = sem backend: o modal abre o e-mail do cliente já preenchido (a receita é anexada à mão).
export const PHARMA_FORM_ENDPOINT = "";
export const PHARMA_OPCOES = ["Sua fórmula prescrita", "Sua fórmula personalizada", "Orçamento de manipulação"];

/* Backend central Pharma (Supabase compartilhado por todas as marcas — ver repo pharma-backend).
   Com URL e chave preenchidas, o formulário grava pedidos/rascunhos no banco e o /admin funciona;
   vazio = fallback por e-mail (PHARMA_FORM_ENDPOINT / mailto). */
export const PHARMA_SUPABASE_URL = "https://ewxxdtickxiqkjqthodq.supabase.co";
export const PHARMA_SUPABASE_ANON_KEY = "sb_publishable_mTGFgjFGZ3b26MRejMc0rg_zCaQ14vl";
/** Identificador desta marca no backend central (= marcas.slug). */
export const PHARMA_MARCA = "dossenza";

export type Preco = {
  /** Quantidade da oferta, igual ao kit do MurALL (ex.: "1", "2", "3", "4", "5"). */
  qtd: string;
  label: string;
  total: string;
  unidade: string;
  economia?: string;
  destaque?: "Mais vendido" | "Melhor escolha";
  /** Ex.: "Frete grátis" (mostrado no card de preço). */
  frete?: string;
  /** Checkout da Payt desta oferta. Só preencher se o preço na Payt for igual a `total`. */
  checkout?: string;
};

export type ItemComposicao = { nome: string; qtd: string };

export type ProdutoId = "gastro" | "entero" | "digest";

export type Produto = {
  id: ProdutoId;
  slug: string;
  nome: string;
  /** Cor de expressão do produto no MIV. */
  cor: "terracota" | "azeitona" | "espinafre";
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
  /** Ativos em destaque na linha do topo da página (padrão: composição sem excipientes). */
  ativosLinha?: string[];
  /** Rótulo do topo da página (padrão: "Para o {foco}"). */
  focoLabel?: string;
  /** Título da tabela de composição (padrão: "O que há em cada cápsula."). */
  composicaoTitulo?: string;
  /** Unidade de venda no singular/plural (padrão: frasco/frascos). */
  unidade?: [string, string];
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
      {
        qtd: "1",
        label: "1 frasco",
        total: "139,90",
        unidade: "R$ 139,90 por frasco",
        checkout: "https://checkout.payt.com.br/cdd74dff03e31b39cfc336417d586443",
      },
      {
        qtd: "3",
        label: "3 frascos",
        total: "379,90",
        unidade: "R$ 126,63 por frasco",
        economia: "Economize R$ 39,80",
        destaque: "Mais vendido",
        frete: "Frete grátis",
        checkout: "https://checkout.payt.com.br/29a9f6efaffd3c604a752ae9097f9219",
      },
      {
        qtd: "5",
        label: "5 frascos",
        total: "589,90",
        unidade: "R$ 117,98 por frasco",
        economia: "Economize R$ 109,60",
        destaque: "Melhor escolha",
        frete: "Frete grátis",
        checkout: "https://checkout.payt.com.br/7d37b1e28cc6d243e327135870e53a89",
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
      "Ingerir 1 cápsula antes do almoço e 1 cápsula antes do jantar, ou conforme orientação profissional.",
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
      {
        qtd: "1",
        label: "1 frasco",
        total: "189,90",
        unidade: "R$ 189,90 por frasco",
        checkout: "https://checkout.payt.com.br/3941f6efccee15425281c0fbf05a2475",
      },
      {
        qtd: "3",
        label: "3 frascos",
        total: "539,90",
        unidade: "R$ 179,97 por frasco",
        economia: "Economize R$ 29,80",
        destaque: "Mais vendido",
        frete: "Frete grátis",
        checkout: "https://checkout.payt.com.br/b4dd56974416f81c5048d36199d07439",
      },
      {
        qtd: "5",
        label: "5 frascos",
        total: "849,90",
        unidade: "R$ 169,98 por frasco",
        economia: "Economize R$ 99,60",
        destaque: "Melhor escolha",
        frete: "Frete grátis",
        checkout: "https://checkout.payt.com.br/b6cd95d53810282d6a734fbb073e9479",
      },
    ],
    image: "/products/entero-card.webp",
    imageCutout: "/products/entero-cutout.webp",
    imageAlt: "Dossenza Entero — frasco com 60 cápsulas gastrorresistentes, rótulo creme e ondas azeitona",
  },
  digest: {
    id: "digest",
    slug: "/digest",
    nome: "Digest",
    cor: "espinafre",
    foco: "conforto digestivo",
    focoLabel: "Para acompanhar as refeições",
    ativosLinha: ["Alcachofra", "Espinheira santa", "Gengibre"],
    tagline: "Blend de extratos botânicos para o conforto digestivo.",
    descricao:
      "Um shot com oito tinturas botânicas, entre elas alcachofra, espinheira santa e gengibre, para acompanhar o almoço e o jantar. Sabor abacaxi.",
    origem: "Digest: o cuidado com a digestão, no momento da refeição.",
    apresentacao: "Shot 150 ml · 30 doses",
    capsula: "Shot líquido",
    modoUso:
      "Ingerir 1 shot durante as refeições, 2x ao dia: almoço e jantar. Conservar ao abrigo da luz, calor e umidade. Não exceder a recomendação diária de consumo indicada na embalagem.",
    beneficios: ["Conforto digestivo", "Extratos botânicos", "Sabor abacaxi"],
    ativosDestaque: [
      { nome: "Alcachofra", beneficio: "Planta tradicionalmente associada à digestão de refeições mais pesadas." },
      { nome: "Espinheira santa", beneficio: "Planta brasileira tradicionalmente usada no cuidado com o estômago." },
      { nome: "Gengibre", beneficio: "Raiz de uso tradicional no conforto digestivo." },
      { nome: "Camomila", beneficio: "Flor de uso tradicional, conhecida pelo efeito calmante." },
    ],
    composicao: [
      { nome: "Tintura de alecrim", qtd: "0,12 ml" },
      { nome: "Tintura de alcachofra", qtd: "0,12 ml" },
      { nome: "Tintura de alcaçuz", qtd: "0,12 ml" },
      { nome: "Tintura de camomila", qtd: "0,12 ml" },
      { nome: "Tintura de dente-de-leão", qtd: "0,12 ml" },
      { nome: "Tintura de espinheira santa", qtd: "0,12 ml" },
      { nome: "Tintura de gengibre", qtd: "0,12 ml" },
      { nome: "Tintura de guaçatonga", qtd: "0,12 ml" },
      { nome: "Sabor abacaxi", qtd: "q.s." },
      { nome: "Solução shot q.s.p.", qtd: "5 ml" },
    ],
    composicaoTitulo: "O que há em cada shot.",
    unidade: ["caixa", "caixas"],
    precos: [
      { qtd: "1", label: "1 caixa", total: "179,90", unidade: "R$ 179,90 por caixa", checkout: "https://checkout.payt.com.br/2944d10af098324c7b70294afd1da5e2" },
      {
        qtd: "3",
        label: "3 caixas",
        total: "489,90",
        checkout: "https://checkout.payt.com.br/a72a9d570e49d6bd5896596330d7f6ee",
        unidade: "R$ 163,30 por caixa",
        economia: "Economize R$ 49,80",
        destaque: "Mais vendido",
        frete: "Frete grátis",
      },
      {
        qtd: "5",
        label: "5 caixas",
        total: "769,90",
        checkout: "https://checkout.payt.com.br/51f993d243a0d38e4669ac0bc3f8df05",
        unidade: "R$ 153,98 por caixa",
        economia: "Economize R$ 129,60",
        destaque: "Melhor escolha",
        frete: "Frete grátis",
      },
    ],
    image: "/products/digest-1.webp",
    imageCutout: "/products/digest-1.webp",
    imageAlt: "Dossenza Digest — caixa com 30 doses de shot 150 ml, rótulo creme e ondas terracota",
  },
};

// Preços e quantidades = MurALL (fonte oficial); links = checkouts já cadastrados na Payt.
// Sistema Essencial = "Kit Gastrointestinal" no MurALL e na Payt (Gastro + Entero, kits de 1, 2 e 4).
export const KIT_PRECOS: Preco[] = [
  {
    qtd: "1",
    label: "1 sistema",
    total: "329,90",
    unidade: "1 Gastro + 1 Entero",
    checkout: "https://checkout.payt.com.br/8c1d2a7aae65830ace0cf3c93a3b4817",
  },
  {
    qtd: "2",
    label: "2 sistemas",
    total: "619,80",
    unidade: "2 Gastro + 2 Entero",
    economia: "Economize R$ 40,00",
    destaque: "Mais vendido",
    frete: "Frete grátis",
    checkout: "https://checkout.payt.com.br/330fbc6c60f6925f8e8419c97e254e6c",
  },
  {
    qtd: "4",
    label: "4 sistemas",
    total: "1.189,90",
    unidade: "4 Gastro + 4 Entero",
    economia: "Economize R$ 129,70",
    destaque: "Melhor escolha",
    frete: "Frete grátis",
    checkout: "https://checkout.payt.com.br/1a167de8bba4eb951cbc111830816011",
  },
];

// Sistema Completo = Gastro + Entero + Digest (kits de 1, 3 e 5).
export const COMPLETO_PRECOS: Preco[] = [
  {
    qtd: "1",
    label: "1 sistema",
    total: "479,90",
    unidade: "1 Gastro + 1 Entero + 1 Digest",
    checkout: "https://checkout.payt.com.br/c5137bee9aba34b22aa2d9eecde2277b",
  },
  {
    qtd: "3",
    label: "3 sistemas",
    total: "1.349,90",
    unidade: "3 Gastro + 3 Entero + 3 Digest",
    economia: "Economize R$ 89,80",
    destaque: "Mais vendido",
    frete: "Frete grátis",
    checkout: "https://checkout.payt.com.br/29d61ac6e4d3ca883625c528ab9f5dd6",
  },
  {
    qtd: "5",
    label: "5 sistemas",
    total: "2.099,90",
    unidade: "5 Gastro + 5 Entero + 5 Digest",
    economia: "Economize R$ 299,60",
    destaque: "Melhor escolha",
    frete: "Frete grátis",
    checkout: "https://checkout.payt.com.br/4dffe574c7f80f34d45fe15e85b5d371",
  },
];
