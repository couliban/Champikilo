import { Injectable } from '@angular/core';
import { Deck } from '../utils/interfaces/deck.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { CreateDeckResponse } from '../utils/types/create-deck-response';
import { GetCardsResponse } from '../utils/types/get-cards-response';
import { SuffleCardsResponse } from '../utils/types/shuffle-cards-response';

@Injectable({
  providedIn: 'root'
})
export class DeckService implements Deck {
  
  private deckURL: string = "https://deckofcardsapi.com/api/deck";

  constructor(private readonly http: HttpClient) {}

  createDeck(): Promise<CreateDeckResponse> {
    return firstValueFrom(
      this.http.get<CreateDeckResponse>(`${this.deckURL}/new/shuffle/?deck_count=1`, { headers: { Accept: 'application/json' } })
    ) 
  }

  getCards(deckId: string, count: number): Promise<GetCardsResponse> {
    return firstValueFrom(
      this.http.get<GetCardsResponse>(`${this.deckURL}/${deckId}/draw/?count=${count}`, { headers: { Accept: 'application/json' } })
    )
  }

  shuffleDeck(deckId: string): Promise<SuffleCardsResponse> {
    return firstValueFrom(
      this.http.get<SuffleCardsResponse>(`${this.deckURL}/${deckId}/shuffle/?remaining=true`, { headers: { Accept: 'application/json' } })
    )
  }




}
