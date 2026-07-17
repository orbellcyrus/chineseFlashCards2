import FlashcardInterface from "@/app/ui/flashcards/flashcard-interface";

import { getCharacters }  from "@/app/lib/data"


export default async function Flashcards(props: {params: Promise<{ id:string }>}) {
    //const cards = [{side1: 'ni', side2:'you', side3:'你'},{side1: 'wo', side2: 'I', side3: '我'},{side1:'ta', side2:'he/she', side3:'他/她'}];
    const characters = await getCharacters();
    console.log(characters);
    const params = await props.params;
    const id = params.id
    return (
    <>
    <div className="flex flex-col items-center ">
      <FlashcardInterface characters={characters}>

      </FlashcardInterface>
    </div>
        
    </>
    
  );
}