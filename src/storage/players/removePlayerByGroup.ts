import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLAYER_COLLECTION } from '../storageConfig';
import { AppError } from '@utils/AppError';
import { PlayerStorageDTO } from './PlayerStorageDTO';
import { getPlayersByGroup } from './getPlayersByGroup';

export async function removePlayerByGroup(playerName: string, group: string) {
  try {
    const storedPlayers = await getPlayersByGroup(group);

    const filtered = storedPlayers.filter(({ name }) => name !== playerName);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify(filtered));
  } catch (error) {
    throw error;
  }
}