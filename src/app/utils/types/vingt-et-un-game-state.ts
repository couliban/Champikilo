import { Player } from "./player";
import { PlayerState } from "./player-state";

export type VingtEtUnGameState = {
  turn: Player,
  player1: PlayerState;
  player2: PlayerState;
}