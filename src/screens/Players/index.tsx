import { Header } from "@components/Header";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { HighLight } from "@components/HighLitght";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { Alert, FlatList, TextInput } from "react-native";
import { useState } from "react";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/players/playerAddByGroup";
import { getPlayersByGroupAndTeam } from "@storage/players/getPlayerByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/players/PlayerStorageDTO";
import { useEffect } from "react";
import { useRef } from "react";
import { removePlayerByGroup } from "@storage/players/removePlayerByGroup";
import { removeGroupByName } from "@storage/group/removeGroupByName";

type RouteParams = {
  group: string;
}

export function Players() {
  const [newPlayer, setNewPlayer] = useState('');
  const [team, setTeam] = useState(('Time A'));
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  async function handleNewPlayer() {
    if (newPlayer.trim().length === 0) {
      return Alert.alert('Nova Pessoa', 'Informe o nome da pessoa para adicionar.')
    }

    const newAddPlayer = {
      name: newPlayer,
      team,
    }

    try {
      await playerAddByGroup(newAddPlayer, group);
      await fetchPlayersByTeam();
      setNewPlayer('');

      newPlayerInputRef.current?.blur();

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova Pessoa', error.message);
      } else {
        Alert.alert('Nova Pessoa', 'Não foi possível adicionar');
        console.log(error);
      }
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await removePlayerByGroup(playerName, group);
      await fetchPlayersByTeam();
    } catch (error) {
      Alert.alert('Remover Pessoa', 'Não foi possível remover essa pessoa.');
      console.log(error);
    }
  }

  async function groupRemove() {
    try {
      await removeGroupByName(group);
      navigation.navigate('groups');
    } catch (error) {
      console.log(error);
      Alert.alert('Remover grupo', `Não foi possível remover o grupo ${group}`)
    }
  }

  async function handleGroupRemove() {
    Alert.alert('Remover Turma', `Deseja remover o grupo ${group}?`, [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => { groupRemove() } }
    ])
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await getPlayersByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado.');
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <HighLight title={group} subtitle="adicione a galera e separe os times" />

      <Form>
        <Input
          placeholder="Nome da Pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayer}
          value={newPlayer}
          inputRef={newPlayerInputRef}
          onSubmitEditing={handleNewPlayer}
          returnKeyType="done"
        />

        <ButtonIcon icon="add" onPress={handleNewPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard name={item.name} onRemove={() => handlePlayerRemove(item.name)} />
        )}
        ListEmptyComponent={() => <ListEmpty message="Não há pessoas nesse time." />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
      />

      <Button title="Remover Turma" type="SECONDARY" onPress={handleGroupRemove} />
    </Container>
  );
}