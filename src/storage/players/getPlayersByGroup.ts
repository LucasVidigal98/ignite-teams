import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLAYER_COLLECTION } from '../storageConfig';
import { AppError } from '@utils/AppError';
import { PlayerStorageDTO } from './PlayerStorageDTO';

export async function getPlayersByGroup(group: string) {
  try {
    const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);

    const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : [];

    return players;
  } catch (error) {
    throw error;
  }
}