import CreateDeckForm from "../ui/create/create-deck-form";
import { getAllCharacters } from "../lib/data";
import { Character } from "../lib/types";

export default async function Create(){
    const characters = await getAllCharacters();
    return (
        <>
        <CreateDeckForm characters={ characters }>

        </CreateDeckForm>
        </>
    );
}