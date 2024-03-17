import { Observable } from "rxjs";
import { CreateDeckResponse } from "../types/create-deck-response";
import { SuffleCardsResponse } from "../types/shuffle-cards-response";
import { GetCardsResponse } from "../types/get-cards-response";

export interface Deck {
    createDeck(): Observable<CreateDeckResponse>; // Créer un nouveau jeu de carte
    getCards( deckId: string, count: number ): Observable<GetCardsResponse>; // piocher des cartes
    shuffleDeck(deckId: string): Observable<SuffleCardsResponse>; // Battre le jeu de carte
}