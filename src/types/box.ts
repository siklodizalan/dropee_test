export interface Box {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
}

export interface StoredBox {
  id: number;
  count: number;
  lastOpened?: Date;
}

export type BoxWithState = Box & StoredBox;

export interface Leaderboard {
  name: string;
  score: number;
}
