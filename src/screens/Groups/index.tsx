import { Header } from '@components/Header';
import { Container } from './styles';
import { HighLight } from '@components/HighLitght';
import { GroupCard } from '@components/GroupCard';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getGroups } from '@storage/group/getGroups';
import { useEffect } from 'react';
import { useCallback } from 'react';

export default function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new');
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group })
  }

  async function fecthGroups() {
    try {
      const storedGroups = await getGroups();

      setGroups(storedGroups);
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(useCallback(() => {
    fecthGroups();
  }, []));

  return (
    <Container>
      <Header />

      <HighLight title='Turmas' subtitle='jogue com a sua turma' />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => <ListEmpty message='Que tal cadastrar a primeira turma?' />}
      />

      <Button
        title='Criar nova turma'
        onPress={handleNewGroup}
      />

    </Container>
  );
}