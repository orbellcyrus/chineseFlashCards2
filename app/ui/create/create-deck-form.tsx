
import { createDeck } from "@/app/lib/actions";
import { Character } from "@/app/lib/types";
import { auth } from "@/auth";

type FormProps = {
    characters: Character[];
}
export default async function CreateDeckForm({characters}:FormProps){
    const session = await auth();
    if(!session){
        return(
            <p>
                not logged in
            </p>
        )
            
        
    }
    const id = session.user.id;
    return(
        <form action={createDeck}>
            <div className=" flex flex-col bg-gray-900 text-gray-200 p-2 gap-2 rounded-xl">
                <label className="flex justify-center">
                    Name your deck
                </label>
                <input 
                    type="text"
                    name="title"
                    required
                    placeholder="Deck title"
                    className="border-2 border-white rounded-xl p-2"
                />

                <input
                    type="hidden"
                    name="creator_id"
                    value={id}
                />

                {characters.map((character) => (
                    <label key={character.id}>
                    <input
                        type="checkbox"
                        name="characterIds"
                        value={character.id}
                    />

                    {character.chinese_character}
                    {" - "}
                    {character.english}
                    </label>
                ))}
                
                <button 
                    type="submit"
                    className="bg-gray border-2 rounded-xl p-2 hover:bg-green-200 hover:text-black"
                    >
                    Create Deck
                </button>

                

                
            </div>
            
        </form>
    );
}