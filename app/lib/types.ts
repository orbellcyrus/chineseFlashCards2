//Character is the type for the chinese characters and their definitions which is used for each flashcard
export type Character = {
    id: number;
    english: string;
    pronunciation: string;
    chinese_character: string;
};

export type Deck = {
    id : number;
    title : string;
    creator : number;
}

export type HistoryEntry = {
  characterId: number;
  known: boolean;
  indexOfCharacter: number;
};

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
};