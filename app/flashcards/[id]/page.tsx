import { getCharacters }  from "@/app/lib/data"
import FlashCardController from "@/app/ui/flashcards/flashcard-controller";


export default async function Flashcards(props: {params: Promise<{ id:string }>}) {
    const params = await props.params;
    const id = params.id
    const characters = await getCharacters(Number(id));
    
    
    return (
    <>
    <div className="flex flex-col items-center ">
      <FlashCardController characters={characters}>

      </FlashCardController>

      
    </div>
        
    </>
    
  );
}