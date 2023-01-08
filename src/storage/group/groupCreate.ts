import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION } from '../storageConfig';
import { getGroups } from './getGroups';
import { AppError } from '@utils/AppError';

export async function groupCreate(newGroup: string) {
  try {
    const storedGroups = await getGroups();

    const groupAlreadyExists = storedGroups.includes(newGroup);

    if (groupAlreadyExists) {
      throw new AppError('Já existe um grupo cadastrado com esse nome.');
    }

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify([...storedGroups, newGroup]));
  } catch (error) {
    throw error;
  }
}