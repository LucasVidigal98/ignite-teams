import { Contanier, SubTilte, Tilte } from "./styles";

type Props = {
  title: string;
  subtitle: string;
}

export function HighLight({ title, subtitle }: Props) {
  return (
    <Contanier>
      <Tilte>{title}</Tilte>

      <SubTilte>{subtitle}</SubTilte>
    </Contanier>
  );
}