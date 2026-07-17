"use client"

import Link from "next/link";
import { Star } from "lucide-react"
import { useState } from "react";
import type { Deck } from '@/app/lib/types'

type DeckSelectorProps = Deck;


export default function DeckSelector({title, creator, id}:Deck){
    const [fillStar, setFillStar] = useState(false);
    function handleStar(){
        setFillStar(!fillStar);
    }
    return(
        <>
            <div className="bg-gray-900 p-2 rounded-xl border border-white h-auto ">
                <div className="flex flex-row justify-between">
                    <h1>
                        {title}
                    </h1>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleStar();
                        }}   
                    >
                            <Star 
                                className="text-yellow-400  hover:scale-110"
                                fill= {`${fillStar && "currentColor"}`}
                            />
                    </button>
                </div>
                
                <ul>
                    
                    <li>
                        creator: {creator}
                    </li>
                    <li>
                        last played: 
                    </li>
                    <li>
                        last_accuracy:
                    </li>
                    
                </ul>
                <Link href={`flashcards/${id}`} className=" text-green-200 hover:scale:110 hover:text-green-400">
                        Play
                </Link>
    
            </div>
            
        </>
    );
}