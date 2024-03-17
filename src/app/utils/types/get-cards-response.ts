import { Card } from "./card"
import { CreateDeckResponse } from "./create-deck-response";

export type GetCardsResponse = Omit<CreateDeckResponse, "decki_id"> & {
    cards: Card[],
};