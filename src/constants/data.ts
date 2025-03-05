import greenBox from "../assets/greenMisteryBox.gif";
import pinkBox from "../assets/pinkMisteryBox.gif";
import yellowBox from "../assets/yellowMisteryBox.gif";
import { Box, Leaderboard } from "../types/box";

export const boxData: Box[] = [
  {
    id: 1,
    image: greenBox,
    title: "Free Box",
    description:
      "Get a surprise boost—completely free! Don't miss out on premium rewards.",
    price: 0,
  },
  {
    id: 2,
    image: pinkBox,
    title: "Name 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper, neque ut rhoncus volutpat.",
    price: 0.99,
  },
  {
    id: 3,
    image: yellowBox,
    title: "Name 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper, neque ut rhoncus volutpat.",
    price: 1.99,
  },
];

export const DailyLeaderboard: Leaderboard[] = [
  { name: "John Doe", score: 1293 },
  { name: "John Doe", score: 268 },
  { name: "John Doe", score: 66 },
  { name: "John Doe", score: 66 },
  { name: "John Doe", score: 22 },
  { name: "John Doe", score: 15 },
  { name: "John Doe", score: 12 },
  { name: "John Doe", score: 10 },
  { name: "John Doe", score: 8 },
];

export const WeeklyLeaderboard: Leaderboard[] = [
  { name: "John Doe", score: 12930 },
  { name: "John Doe", score: 9268 },
  { name: "John Doe", score: 6066 },
  { name: "John Doe", score: 6066 },
  { name: "John Doe", score: 4022 },
  { name: "John Doe", score: 3015 },
  { name: "John Doe", score: 2012 },
  { name: "John Doe", score: 1510 },
  { name: "John Doe", score: 1405 },
  { name: "John Doe", score: 1302 },
  { name: "John Doe", score: 1201 },
  { name: "John Doe", score: 1100 },
  { name: "John Doe", score: 1000 },
  { name: "John Doe", score: 900 },
  { name: "John Doe", score: 850 },
  { name: "John Doe", score: 800 },
];
