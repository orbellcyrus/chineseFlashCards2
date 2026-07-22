'use client'
import { useState } from "react"
import { Character, HistoryEntry } from "@/app/lib/types";
import PopUp from "./pop-up";
import FlashcardInterface from "./flashcard-interface";
import HistorySquares from "./history-squares";

type FlashCardControllerProps = {
  characters: Character[];
};

export default function FlashCardController({characters,}:FlashCardControllerProps){
    const [side, setSide] = useState<keyof Character>("english");
    const [index, setIndex] = useState(0);
    const [charactersState, setCharactersState] = useState<Character[]>(characters)
    const length = charactersState.length;
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [done, setDone] = useState(false);
    const [hasIncorrects, setHasIncorrects] = useState(false);
       
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
        setHasIncorrects(true);
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

    function handleRestart() {
        const remaining = charactersState.filter(character => {
            const result = history.find(
            h => h.characterId === character.id
            );

            return result ? !result.known : true;
        });

        setCharactersState(remaining);
        //extra check
        if (remaining.length === 0) {
            handleRestartAll();
        } else {
            setHasIncorrects(false);
            setIndex(0);
            setDone(false);
            setHistory([]);
        }
    }

    function handleRestartAll(){
        setCharactersState(characters);
        setHasIncorrects(false);
        setIndex(0);
        setDone(false);
        setHistory([])
    }
                  
    return(
        <div className="flex flex-col font-sans bg-white rounded-xl text-black p-2">
            <p>
                {`Index: ${index+1}/${length}`+ ""}
            </p>

            {done && <PopUp 
                hasIncorrects = {hasIncorrects}
                onClickRestart={handleRestart}
                onClickRestartAll={handleRestartAll}
                >
                <HistorySquares 
                    charactersState={charactersState} 
                    index={index} 
                    history={history} 
                    >
                </HistorySquares>

            </PopUp>}

            <HistorySquares 
                charactersState={charactersState} 
                index={index} 
                history={history} >
            </HistorySquares>

            <FlashcardInterface 
                onClickCard={handleCard} 
                onClickPrevious={handlePrevious} 
                onClickCorrect={handleCorrect} 
                onClickIncorrect={handleIncorrect} 
                charactersState={charactersState} 
                index={index} 
                side={side}  
                >
            </FlashcardInterface>
        </div>     
    )
}   