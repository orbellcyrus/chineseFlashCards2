import { HistoryEntry, Character } from "@/app/lib/types";

type HistorySquaresProps  = {
    charactersState: Character[];
    index: number;
    history: HistoryEntry[];
}


export default function HistorySquares( {index, history, charactersState}:HistorySquaresProps ){
    return(

                <div className="flex gap-2">
                    {charactersState.map((character, index) => {
                        const result = history[index];

                        return (
                        <div
                            key={character.id}
                            className={` rounded ${
                            result
                                ? result.known
                                ? "bg-green-300"
                                : "bg-red-300"
                                : "bg-gray-300"
                            }`}
                        >
                            <p>
                                {character.chinese_character}
                            </p>
                        </div>
                        );
                    })}
                </div>

    );
   
}
