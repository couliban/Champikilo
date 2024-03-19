import { Player } from "./player";
import { VingtEtUnPlayerState } from "./vingt-et-un-player-state";

export type VingtEtUnGameState = {
  turn: Player,
  player1: VingtEtUnPlayerState;
  player2: VingtEtUnPlayerState;
}