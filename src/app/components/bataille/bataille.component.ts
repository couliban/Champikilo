import { ChangeDetectionStrategy, Component, OnInit, computed, effect, signal } from '@angular/core';
import { BatailleGameState } from '../../utils/types/bataille-game-state';
import { initialGameState } from './initial-game-state';
import { DeckService } from '../../services/deck-service.service';
import { Card } from '../../utils/types/card';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { Player } from '../../utils/types/player';
import { BataillePlayerState } from '../../utils/types/bataille-player-state';
import { mergeMap } from 'rxjs';
import { GameWinner } from '../../utils/types/game-winner';

@Component({
  selector: 'app-bataille',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
  ],
  templateUrl: './bataille.component.html',
  styleUrl: './bataille.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DeckService
  ],
})
export class BatailleComponent implements OnInit {
  private _gameState = signal<BatailleGameState>({...initialGameState});
  readonly gameState = computed<BatailleGameState>(() => this._gameState());

  readonly winner = computed(() => this.defineWinner());

  constructor(private readonly deckService: DeckService) {}

  ngOnInit(): void {
      this.initParty();
  }

  initParty(): void {

    this.deckService.createDeck().pipe(
      mergeMap((value) => {
        return this.deckService.getCards(value.deck_id, 52);
      })
    ).subscribe((value) => {
      const gs = {...this.gameState()};

      gs.player1.cards = [...value.cards.slice(0, 26)];
      gs.player2.cards = [...value.cards.slice(-26)];
      this._gameState.set({...gs});
    });
  }  

  getCards(deckId: string, count: number): Card[] {
    let cards: Card[] = [];
    this.deckService.getCards(deckId, count).subscribe((value) => {
      cards = value.cards;
    })

    return cards;
  }

  resetGame(): void {
    this._gameState.set({...initialGameState});
    this.initParty();
  }

  play(player: Player): void {
    
    let gs = this.gameState();

    const player_: BataillePlayerState = (player == 'Player1') ? gs.player1 : gs.player2;
    const cardToPlay = player_.cards.shift() as Card;
    player_.cardPlayed = [...player_.cardPlayed, cardToPlay];
    player_.count = player_.cards.length;

    if (player == 'Player1') {
      gs.player1 = player_
    } else {
      gs.player2 = player_
    }

    this._gameState.set({...gs});

    setTimeout(() => {
      this.updateGame();
    }, 2600);

    this.passTurnFrom(player);
  }

  passTurnFrom(player: Player): void {
    this._gameState.update(gs => ({ ...gs, turn: (player == 'Player1') ? 'Player2' : 'Player1' }));
  }

  updateGame(): void {
    const gs = this.gameState();
    if (gs.player1.cardPlayed.length > 0 && gs.player2.cardPlayed.length > 0) {

      if (gs.player1.cardPlayed.length % 2 != 0 && gs.player2.cardPlayed.length % 2 != 0) {
        
        if (this.getCardValue(gs.player1.cardPlayed.slice(-1)[0].value) > this.getCardValue(gs.player2.cardPlayed.slice(-1)[0].value)) {
          gs.player1.cards.push(...gs.player1.cardPlayed,...gs.player2.cardPlayed);
          gs.player2.cardPlayed = [];
          gs.player1.cardPlayed = [];
          gs.player1.count = gs.player1.cards.length;
          gs.player2.count = gs.player2.cards.length;
          gs.hasBataille = false;
        } else if(this.getCardValue(gs.player1.cardPlayed.slice(-1)[0].value) < this.getCardValue(gs.player2.cardPlayed.slice(-1)[0].value)) {
          gs.player2.cards.push(...gs.player2.cardPlayed,...gs.player1.cardPlayed);
          gs.player1.cardPlayed = [];
          gs.player2.cardPlayed = [];
          gs.player2.count = gs.player2.cards.length;
          gs.player1.count = gs.player1.cards.length;
          gs.hasBataille = false;
        } else {
          gs.hasBataille = true;
        }
      }
    }

    this._gameState.set({...gs});
  }

  getCardValue(value: string): number {
    const onePointCards = ["KING","QUEEN", "JACK"];
    if (value == "ACE") value = "14";
    if (value == "KING") value = "13";
    if (value == "QUEEN") value = "12";
    if (value == "JACK") value = "11";
    if(onePointCards.includes(value)) value = "1";
    if(value == "0") value = "10";
    return +value;
  }

  defineWinner(): GameWinner {
    let winner: GameWinner = undefined;
    const gs = this.gameState();

    if (gs.player1.count == 0) {
      winner = 'Player2';
    }
    if (gs.player2.count == 0) {
      winner = 'Player1';
    }

    return winner;
  }

  canPlay(player: Player): boolean {
    return player == this.gameState().turn;
  }

  getImage(index:number, imageUrl: string, player: Player): string {
    const localImage = player == 'Player1' ? '../../../assets/images/Card_back.png' : '../../../assets/images/card-back.png';
    return index % 2 == 0 ? imageUrl : localImage;
  }

}
