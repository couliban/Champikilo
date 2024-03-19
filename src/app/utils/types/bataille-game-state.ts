import { BataillePlayerState } from "./bataille-player-state";
import { Player } from "./player";

export type BatailleGameState = {
    hasBataille: boolean,
    turn: Player
    player1: BataillePlayerState,
    player2: BataillePlayerState
}