import { RotateCcw, ArrowLeft, ListMinus} from "lucide-react";
import Link from "next/link";
type PopUpProps ={
    handleRestart: () => void;
    handleRestartAll: () => void;
    children: React.ReactNode
}

export default function PopUp({handleRestart, handleRestartAll, children }:PopUpProps){
    return(
        <div className="fixed inset-0 z-50 bg-black/50 flex flex-row items-center justify-center">
            <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-2">

                {children}
                <div className="flex flex-row gap-2">
                    <div >
                        <Link className="flex flex-row justify-center items-center rounded-xl bg-red-300 hover:bg-red-400 p-2"
                        href = "/decks">
                        <ArrowLeft></ArrowLeft>
                            Back To Decks
                        </Link>
            
                    </div>
                    
                    <div className="flex flex-row justify-center items-center rounded-xl bg-yellow-300 hover:bg-yellow-400 p-2">
                        <RotateCcw></RotateCcw>
                        <button onClick={handleRestartAll}>
                            restart all
                        </button>
                    </div>
                    
                    <div className="flex flex-row justify-center items-center rounded-xl bg-green-300 hover:bg-green-400 p-2">
                        <RotateCcw></RotateCcw>
                        <button onClick={handleRestart}> 
                            restart with incorrects
                        </button> 
                    </div>
                </div>
                
                
            </div>
        </div>
    );
}