'use client'

import { useState } from "react"
import  {Next, Previous, CardButton } from '@/app/ui/flashcards/buttons'
import clsx from 'clsx';

type Card = {
    side1:string,
    side2:string,
    side3:string
}

type FlashcardInterfaceProps = {
  cards: Card[];
};

export default function FlashcardInterface({cards,}:FlashcardInterfaceProps){
    const [index, setIndex] = useState(0);
    function handleNext() {
        if(index>cards.length-1){
            return;
        }
        setIndex(index + 1);
    }
    function handlePrevious(){
        if(index<1){
            return;
        }
        setIndex(index - 1);
    }

    const [side, setSide] = useState<keyof Card>("side1");
    
    function handleCard(){
        if(side=="side3"){
            setSide("side1");
        }else if(side=="side1"){
            setSide("side2");   
        }else{
            setSide("side3");
        }
    }

    const [hasPrevious, handleHasPrevious] = useState(false)

    function handleHasNext(){
        hasPrevious ? handleHasPrevious(false) : handleHasPrevious(true);
    }
    

    return(
        <div className="font-sans">

            <h1>
                {index}
            </h1>

                <Previous onClick={handlePrevious}>
                    previous
                </Previous>

                <Next onClick={handleNext}>
                    next
                </Next>
        </div>
          
    )
    
    
}   