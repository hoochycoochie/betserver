export type BettingDto = {
  cid: string;
  count: number;
  command: string;
  mid?: number;
};

export type ProcessedBettingDto = {
  cid: string;
  idx: number;
  command: string;
  mid?: number;
};

export const BETTING_KEY = 'betting-key';
export const BETTING_SIZE = 'betting-size';
export const NEW_BETTING_JOB_NAME = 'NEW_BETTING_JOB';
export const PROCESS_BETTING_JOB_NAME = 'PROCESS_NEW_BETTING_JOB';
