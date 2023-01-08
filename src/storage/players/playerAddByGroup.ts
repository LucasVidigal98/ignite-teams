import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLAYER_COLLECTION } from '../storageConfig';
import { AppError } from '@utils/AppError';
import { PlayerStorageDTO } from './PlayerStorageDTO';
import { getPlayersByGroup } from './getPlayersByGroup';

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {
    const storedPlayers = await getPlayersByGroup(group);

    const playerAlreadyExists = storedPlayers.filter((player) => player.name === newPlayer.name);

    if (playerAlreadyExists.length > 0) {
      throw new AppError('Essa pessoa já está adicionada em um time aqui.');
    }

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify([...storedPlayers, newPlayer]));
  } catch (error) {
    throw error;
  }
}