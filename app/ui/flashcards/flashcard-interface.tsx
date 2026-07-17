'use client'

import { useState } from "react"
import { Character, HistoryEntry } from "@/app/lib/types";
import PopUp from "./pop-up";



type FlashcardInterfaceProps = {
  characters: Character[];
};

export default function FlashcardInterface({characters,}:FlashcardInterfaceProps){
    const [side, setSide] = useState<keyof Character>("english");
    const [index, setIndex] = useState(0);
    const [charactersState, setCharactersState] = useState<Character[]>(characters)
    const length = charactersState.length;
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [done, setDone] = useState(false);
    
    
    function handleCard() {
        if (side === "english") {
            setSide("pronunciation");
        } else if (side === "pronunciation") {
            setSide("chinese_character");
        } else {
            setSide("english");
        }
    }

    function handlePrevious(){
        if(index === 0){
            return;
            
        }else{
            setIndex(index-1);
            setHistory(prev => prev.slice(0, -1));
        }
    }

    function handleCorrect(){
        console.log(index);
        setHistory(prev => [
                ...prev,
                {
                    characterId: charactersState[index].id,
                    known: true,
                    indexOfCharacter: index
                },
            ]);
        if(index === length - 1){
            setDone(!done);
            return;
        }else{
            setIndex(index+1);
            
        }
    }

    function handleIncorrect(){
        console.log(index);
        setHistory(prev => [
                ...prev,
                {
                    characterId: charactersState[index].id,
                    known: false,
                    indexOfCharacter: index
                },
        ]);
        if(index === length - 1){
            setDone(true);
            return;
        }else{
            setIndex(index+1);
        }
    }

    function restart(){
        setCharactersState(prev =>
        prev.filter(character => {
            const result = history.find(
                h => h.characterId === character.id
            );

            return result ? !result.known : true;
        })
        );
        setIndex(0);
        setDone(false);
        setHistory([])
    }

    function restartAll(){
        setCharactersState(characters);
        setIndex(0);
        setDone(false);
        setHistory([])
    }

  
                   
    return(
        <div className="flex flex-col font-sans bg-white rounded-xl text-black p-2 ">
            {done && <PopUp 
                handleRestart={restart}
                handleRestartAll={restartAll}
                >
                    <div className="flex gap-2 text-2xl">
                        {history.map((entry) => (
                            <div
                                key={entry.characterId}
                                className={`rounded flex justify-center ${
                                    entry.known ? "bg-green-500" : "bg-red-500"
                                }`}
                                >
                                <button className="p-1">
                                    {charactersState[entry.indexOfCharacter]["chinese_character"]}
                                </button>
                            </div>
                        ))}
                    </div>

                </PopUp>}
            <div className="flex">
                <p>
                    {`Index: ${index+1}/${length}`+ ""}
                </p>

                <div className="flex gap-2">
                    {history.map((entry) => (
                        <div
                            key={entry.characterId}
                            className={`w-6 h-6 rounded flex justify-center ${
                                entry.known ? "bg-green-500" : "bg-red-500"
                            }`}
                            >
                            <p>
                                {charactersState[entry.indexOfCharacter]["chinese_character"]}
                            </p>
                        </div>
                    ))}
                </div>
            </div>


            <button
                className="rounded-xl hover:bg-gray-300 p-2"
                onClick={handleCard}
            >
                {charactersState[index][side]}
            </button>
            <div>
                <button 
                    className="rounded-xl bg-yellow-200 hover:bg-yellow-300 p-2"
                    onClick={handlePrevious}
                >
                    Previous  
                </button>
                
                <button 
                    className="rounded-xl bg-green-200 hover:bg-green-300 p-2"
                    onClick={handleCorrect}
                >
                    Correct  
                </button>

                <button 
                    className="rounded-xl bg-red-200 hover:bg-red-300 p-2"
                    onClick={handleIncorrect}
                >
                    Incorrect  
                </button>

            </div>
            
        </div>
          
    )
    
    
}   