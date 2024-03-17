import { VingtEtUnGameState } from "../../utils/types/vingt-et-un-game-state";
import { initialPlayerState } from "./initial-player-state.type";


export const initialGameState: VingtEtUnGameState = {
    turn: 'Player1',
    player1: initialPlayerState,
    player2: initialPlayerState
}