import { Observable } from "rxjs";
import { CreateDeckResponse } from "../types/create-deck-response";
import { SuffleCardsResponse } from "../types/shuffle-cards-response";
import { GetCardsResponse } from "../types/get-cards-response";

export interface Deck {
    createDeck(): Promise<CreateDeckResponse>; // Créer un nouveau jeu de carte
    getCards( deckId: string, count: number ): Promise<GetCardsResponse>; // piocher des cartes
    shuffleDeck(deckId: string): Promise<SuffleCardsResponse>; // Battre le jeu de carte
}