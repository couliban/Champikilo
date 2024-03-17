import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Player } from '../../../utils/types/player';
import { VingtEtUnGameState } from '../../../utils/types/vingt-et-un-game-state';
import { Card } from '../../../utils/types/card';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent {
  @Input({required: true}) player!: Player;
  @Input({required: true}) gameState!: VingtEtUnGameState;

  constructor() {}
  
  getCards(): Card[] {
    return (this.player == 'Player1') ? this.gameState.player1.cards : this.gameState.player2.cards;
  }
}
