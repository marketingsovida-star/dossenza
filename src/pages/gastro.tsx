import { ProdutoPage } from "@/components/produto-page";
import { PRODUTOS } from "@/data/produtos";

export function GastroPage() {
  return <ProdutoPage produto={PRODUTOS.gastro} />;
}
