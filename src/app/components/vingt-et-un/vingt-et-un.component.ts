import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, computed, signal } from '@angular/core';
import { DeckService } from '../../services/deck-service.service';
import { DeckCards } from '../../utils/types/deck';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { VingtEtUnGameState } from '../../utils/types/vingt-et-un-game-state';
import { Player } from '../../utils/types/player';
import { ViewComponent } from './view/view.component';
import { PanelComponent } from './panel/panel.component';
import { GameWinner } from '../../utils/types/game-winner';
import { initialGameState } from './initial-game-state.type';
import { PlayerState } from '../../utils/types/player-state';

@Component({
  selector: 'app-vingt-et-un',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    ViewComponent,
    PanelComponent
  ],
  providers: [
    DeckService
  ],
  templateUrl: './vingt-et-un.component.html',
  styleUrl: './vingt-et-un.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VingtEtUnComponent implements OnInit {
  private _gameState: WritableSignal<VingtEtUnGameState> = signal<VingtEtUnGameState>({...initialGameState});
  readonly gameState = computed<VingtEtUnGameState>(() => this._gameState());

  deck: DeckCards = { deckId: '', remaining: 0 };
  readonly winner = computed(() => this.defineWinner());

  constructor(private readonly deckService: DeckService) { }

  ngOnInit(): void {
    this.getNewDeck();
  }

  getNewDeck(): void {
    this.deckService.createDeck().subscribe((value) => {
      this.deck = {
        deckId: value.deck_id,
        remaining: value.remaining
      }
    });
  }

  getCard(player: Player): void {
    this.deckService.getCards(this.deck.deckId, 1).subscribe((value) => {
      
      this._gameState.set({
        ...this.gameState(),
        player1: {
          ...this.gameState().player1,
          cards: (player == 'Player1')
            ? [...this.gameState().player1.cards, ...value.cards]
            : this.gameState().player1.cards
        },
        player2: {
          ...this.gameState().player2,
          cards: (player == 'Player2')
            ? [...this.gameState().player2.cards, ...value.cards]
            : this.gameState().player2.cards
        }
      });
    });

    this.passTurnFrom(player);
  }
  
  getOpponentPlayer(): PlayerState {
    return (this.gameState().turn == 'Player1') ? this.gameState().player2 : this.gameState().player1;
  }

  canPassTurn(): boolean {
    const opponentPlayer = this.getOpponentPlayer();
    return !opponentPlayer.hasPlayed;
  }

  passTurnFrom(player: Player): void {
    if (this.canPassTurn()) {
      this._gameState.update(gs => ({ ...gs, turn: (player == 'Player1') ? 'Player2' : 'Player1' }));
    }
  }

  play(player: Player): void {
    const gs = this.gameState();
    const player_ = (player == 'Player1') ? gs.player1 : gs.player2;
    player_.count = player_.cards.reduce((acc, c) => acc + this.getCardValue(c.value), 0);
    player_.hasPlayed = true;
    if (player == "Player1") {
      gs.player1 = player_;
    } else {
      gs.player2 = player_;
    }
    this._gameState.set({...gs});

    this.passTurnFrom(player);
  }

  getCardValue(value: string): number {
    const onePointCards = ["KING","QUEEN", "JACK"];
    if (value == "ACE") value = "11";
    if(onePointCards.includes(value)) value = "1";
    if(value == "0") value = "10";
    return +value;
  }

  canDoSomething(player: Player): boolean {
    return player == this.gameState().turn;
  }

  canTake(player: Player): boolean {
    const cards = (player == 'Player1') ? this.gameState().player1.cards : this.gameState().player2.cards;
    return cards.length < 6;
  }

  canPlay(player: Player): boolean {
    const cards = (player == 'Player1') ? this.gameState().player1.cards : this.gameState().player2.cards;
    return cards.length > 0;
  }

  defineWinner(): GameWinner {
    let winner: GameWinner;
    const game = this.gameState();
    const player1 = game.player1.count;
    const player2 = game.player2.count;

    if (player1 >0 && player2 >0) {
      if (player1 <= 21 &&  player2 <= 21) {
        winner = (player1 > player2) ? 'Player1' : 'Player2';
      } else if (player1 > 21) {
        winner = 'Player2';
      } else if (player2 > 21) {
        winner = 'Player1';
      } else if ((player1 == player2) || (player1 > 21 &&  player2 > 21)) {
        winner ='Draw';
      }
    }

    return winner;
  }

  resetGame() {
    this._gameState.set({...initialGameState})
  }


}
