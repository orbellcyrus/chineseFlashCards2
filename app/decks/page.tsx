import DeckSelector from "../ui/decks/deck-selector";
import { getDecks } from "../lib/data";
import { auth } from "@/auth";


export default async function Decks(){
    const session = await auth();
    if (!session) {
        return <p>Please sign in.</p>;
    }
    
    const decks = await getDecks(session.user.id);
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