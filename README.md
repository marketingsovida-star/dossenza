# Dossenza — site

Site institucional + venda (via WhatsApp) da linha digestiva **Dossenza** (Gastro e Entero).
Estrutura espelhada no site da Galli Beauty, adaptada ao Manual de Identidade Visual Dossenza 2026.

## Stack

- Vite 8 + React 19 + TypeScript
- Tailwind CSS v4 (tokens da marca em `src/styles.css`)
- react-router-dom v7 (SPA: `/`, `/gastro`, `/entero`)
- Fontes Google: **Fraunces** (títulos e nomes de produto) e **Manrope** (texto). O wordmark em Big Caslon é imagem (`public/brand/`).

Build estático → qualquer hospedagem (Vercel, Netlify, Cloudflare Pages, Hostinger…). `vercel.json` e `public/_redirects` já fazem o fallback de SPA.

## Rodar

```bash
npm install
npm run dev        # http://localhost:8082
npm run build      # gera dist/
npm run typecheck
```

## Onde mexer

| O quê | Arquivo |
| --- | --- |
| Preços, composição, textos de produto, WhatsApp, domínio | `src/data/produtos.ts` |
| Home (hero, seções, FAQ) | `src/pages/home.tsx` |
| Página de produto (usada por /gastro e /entero) | `src/components/produto-page.tsx` |
| Cards de preço, rodapé, botões, temas de cor por produto | `src/components/dossenza-ui.tsx` |
| Cores / fontes / animações | `src/styles.css` |
| SEO por rota | `src/lib/head.ts` |

## Paleta (MIV)

| Cor | HEX | Papel |
| --- | --- | --- |
| Espinafre | `#173F35` | Base escura |
| Creme | `#F6F0E4` | Base clara |
| Terracota | `#C56A4B` | Marca / GASTRO |
| Azeitona | `#68753D` | ENTERO |
| Trigo | `#D8BE8D` | Acento |
| Pitaya | `#9E2850` | Acento |
| Lilás Corpo | `#B7A5CF` | Acento |

## Assets

`public/brand` (logos tingidos a partir da máscara do logo, símbolo isolado, favicon), `public/products`
(recortes dos frascos, composições 1/3/5 frascos e kits, cards), `public/waves` (ondas do MIV),
`public/photos` (fotos do MIV). Gerados por script (sharp + @imgly/background-removal-node) a partir dos
originais enviados pelo cliente.

## SAC (`/sac`)

Formulário de chamado (e-mail, motivo, nome, CPF, telefone, assunto, descrição, canal de retorno, até 5 anexos).
Sem cabeçalho; rodapé padrão. O envio é plugável em `src/data/produtos.ts`:

- `SAC_FORM_ENDPOINT`: URL de um serviço de formulário (Formspree, Web3Forms…) que aceite POST multipart.
  Com ele preenchido, o chamado (com anexos) vai direto para o serviço.
- Vazio (padrão): o botão abre o app de e-mail do cliente com o chamado preenchido para `SAC_EMAIL` (sem anexos).

## Pendências

- Número do WhatsApp (`WHATSAPP_NUMBER` em `src/data/produtos.ts`) — usado só nos botões "Adquirir".
- E-mail do SAC (`SAC_EMAIL`) e, se quiser receber os chamados sem depender do e-mail do cliente, o `SAC_FORM_ENDPOINT`.
- Domínio final (`BASE_URL`), para canonical/OG.
- Preço do sistema (Gastro + Entero) está como soma simples das faixas; ajustar se houver desconto próprio.
