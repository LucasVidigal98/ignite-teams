import { Header } from "@components/Header";
import { Conatiner, Content, Icon } from "./styles";
import { HighLight } from "@components/HighLitght";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

export function NewGroup() {
  return (
    <Conatiner>
      <Header showBackButton />

      <Content>
        <Icon />

        <HighLight title="Nova Turma" subtitle="crie a turma para adicionar pessoas" />

        <Input placeholder="Nome da turma" />

        <Button title="Criar" style={{ marginTop: 20 }} />
      </Content>
    </Conatiner>
  );
}