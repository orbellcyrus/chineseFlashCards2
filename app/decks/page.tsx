import DeckSelector from "../ui/decks/deck-selector";
import { getDecks } from "../lib/data";
const decks = await getDecks();
export default async function Account(){
    return (
        <>
        <div className="grid grid-flow-col gap-4">
            {decks.map((deck) => (
                    <DeckSelector
                        key = {deck.id}
                        title = {deck.title}
                        creator = {deck.creator}
                        id = {deck.id}
                    ></DeckSelector>
                ))}
        </div>
        </>
    );
}