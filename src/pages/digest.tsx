import { ProdutoPage } from "@/components/produto-page";
import { PRODUTOS } from "@/data/produtos";

export function DigestPage() {
  return <ProdutoPage produto={PRODUTOS.digest} />;
}
