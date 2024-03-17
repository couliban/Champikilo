import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../../../utils/types/player';
import { VingtEtUnGameState } from '../../../utils/types/vingt-et-un-game-state';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PlayerState } from '../../../utils/types/player-state';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelComponent {
  @Input({required: true}) player!: Player;
  @Input({required: true}) gameState!: VingtEtUnGameState;
  

  @Output() draw = new EventEmitter<Player>();
  @Output()  passTurnFrom = new EventEmitter<Player>();
  @Output()  play = new EventEmitter<Player>();


  constructor() {}

  draw_() {
    this.draw.emit(this.player);
  }

  passTurnFrom_() {
    this.passTurnFrom.emit(this.player);
  }

  play_() {
    this.play.emit(this.player);
  }

  getPlayer(): PlayerState {
    return (this.player == 'Player1') ? this.gameState.player1 : this.gameState.player2;
  }

  getOpponentPlayer(): PlayerState {
    return (this.player == 'Player1') ? this.gameState.player2 : this.gameState.player1;
  }

  canDoSomething(): boolean {
    return this.player == this.gameState.turn && !this.hasPlayed(this.getPlayer());
  }

  canTake(): boolean {
    const player = this.getPlayer();
    const cards = player.cards;
    return cards.length < 6;
  }

  canPassTurn(): boolean {
    const opponentPlayer = this.getOpponentPlayer();
    return !opponentPlayer.hasPlayed;
  }

  canPlay(): boolean {
    const player = this.getPlayer();
    const cards = player.cards;
    return cards.length > 0;
  }

  hasPlayed(player: PlayerState): boolean {
    return player.hasPlayed;
  }

}
