import { ProdutoPage } from "@/components/produto-page";
import { PRODUTOS } from "@/data/produtos";

export function EnteroPage() {
  return <ProdutoPage produto={PRODUTOS.entero} />;
}
