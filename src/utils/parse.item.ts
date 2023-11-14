import { ProcessedBettingDto } from 'src/types';

export const parseItem = async (item: string): Promise<ProcessedBettingDto> => {
  try {
    const [cid, mid, idx] = item.split(':');

    return {
      cid,
      mid: parseInt(mid),
      command: 'processed',
      idx: parseInt(idx)
    };
  } catch (error) {
    throw error;
  }
};
