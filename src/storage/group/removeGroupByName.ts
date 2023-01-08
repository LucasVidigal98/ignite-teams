import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '../storageConfig';
import { getGroups } from './getGroups';
import { AppError } from '@utils/AppError';

export async function removeGroupByName(group: string) {
  try {
    const storedGroups = await getGroups();
    const groups = storedGroups.filter((g) => g !== group);

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${group}`);

  } catch (error) {
    throw error;
  }
}