import { BatailleGameState } from "../../utils/types/bataille-game-state";
import { initialPlayerState } from "./initial-player-state";

export const initialGameState: BatailleGameState = {
    hasBataille: false,
    turn: "Player1",
    player1: {...initialPlayerState},
    player2: {...initialPlayerState}
}