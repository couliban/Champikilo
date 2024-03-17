import { Injectable } from '@angular/core';
import { Deck } from '../utils/interfaces/deck.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateDeckResponse } from '../utils/types/create-deck-response';
import { GetCardsResponse } from '../utils/types/get-cards-response';
import { SuffleCardsResponse } from '../utils/types/shuffle-cards-response';

@Injectable({
  providedIn: 'root'
})
export class DeckService implements Deck {
  
  private deckURL: string = "https://deckofcardsapi.com/api/deck";

  constructor(private readonly http: HttpClient) {}

  createDeck(): Observable<CreateDeckResponse> {
    return this.http.get<CreateDeckResponse>(`${this.deckURL}/new/shuffle/?deck_count=1`, { headers: { Accept: 'application/json' } }) ;
  }

  getCards(deckId: string, count: number): Observable<GetCardsResponse> {
    return this.http.get<GetCardsResponse>(`${this.deckURL}/${deckId}/draw/?count=${count}`, { headers: { Accept: 'application/json' } });
  }

  shuffleDeck(deckId: string): Observable<SuffleCardsResponse> {
    return this.http.get<SuffleCardsResponse>(`${this.deckURL}/${deckId}/shuffle/?remaining=true`, { headers: { Accept: 'application/json' } });
  }




}
