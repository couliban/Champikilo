import { Card } from "./card";

export type VingtEtUnPlayerState = {
    cards: Card[],
    hasPlayed: boolean, // Indique si le joueur a déjà joué ou pas
    count: number, // Additionne les valeurs des cartes
}