import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLAYER_COLLECTION } from '../storageConfig';
import { AppError } from '@utils/AppError';
import { PlayerStorageDTO } from './PlayerStorageDTO';
import { getPlayersByGroup } from './getPlayersByGroup';

export async function getPlayersByGroupAndTeam(group: string, team: string) {
  try {
    const storedPlayers = await getPlayersByGroup(group);

    const playersByTeam = storedPlayers.filter(({ team: t }) => t === team);

    return playersByTeam;
  } catch (error) {
    throw error;
  }
}