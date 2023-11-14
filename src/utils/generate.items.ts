import { BettingDto } from 'src/types';

export const generateItems = async (
  bettingDto: BettingDto
): Promise<string[]> => {
  try {
    const { count, mid, cid } = bettingDto;
    const result = [];
    for (let idx = 1; idx <= count; idx++) {
      result.push(`${cid}:${mid}:${idx}`);
    }

    return result;
  } catch (error) {
    throw error;
  }
};
