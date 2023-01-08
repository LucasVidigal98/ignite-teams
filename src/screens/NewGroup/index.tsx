import { Header } from "@components/Header";
import { Conatiner, Content, Icon } from "./styles";
import { HighLight } from "@components/HighLitght";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export function NewGroup() {
  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  function handleNew() {
    navigation.navigate('players', { group });
  }

  return (
    <Conatiner>
      <Header showBackButton />

      <Content>
        <Icon />

        <HighLight title="Nova Turma" subtitle="crie a turma para adicionar pessoas" />

        <Input placeholder="Nome da turma" onChangeText={setGroup} />

        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Conatiner>
  );
}