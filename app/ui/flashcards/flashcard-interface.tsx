import { Character } from "@/app/lib/types";
import { noto } from "@/app/ui/fonts";
type FlashcardInterfaceProps = {
    onClickCard: ()=> void;
    onClickPrevious: ()=> void;
    onClickCorrect: ()=> void;
    onClickIncorrect: ()=> void;
    charactersState: Character[];
    index: number;
    side: keyof Character;

}
export default function FlashcardInterface({onClickCard,onClickPrevious,onClickCorrect,onClickIncorrect,charactersState,index,side}:FlashcardInterfaceProps){
    return(

        <div> 
            <div className="flex flex-row  ">
                <button 
                    className = { `rounded-xl p-2 rounded-xl 
                         ${index ===0 ? "bg-gray-200 text-gray-500" : "bg-yellow-200 hover:bg-yellow-300"}`}
                    onClick={onClickPrevious}
                >
                    Previous  
                </button>

                <button
                    className= {`rounded-xl bg-blue-100 hover:bg-blue-300 p-2  w-40 text-2xl ${noto.className}`}
                    onClick={onClickCard}
                >
                    {charactersState[index][side]}
                </button>
                
                <div className="flex flex-col ">
                    <button 
                        className="rounded-xl bg-green-200 hover:bg-green-300 p-2"
                        onClick={onClickCorrect}
                    >
                        Correct  
                    </button>

                    <button 
                        className="rounded-xl bg-red-200 hover:bg-red-300 p-2"
                        onClick={onClickIncorrect}
                    >
                        Incorrect  
                    </button>
                </div>
                

             </div>
        </div>
       
    );
}