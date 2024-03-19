import { Card } from "./card";

export type BataillePlayerState = {
    cards: Card[],
    cardPlayed: Card[],
    count?: number,
}