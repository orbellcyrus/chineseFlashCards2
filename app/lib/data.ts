import postgres from 'postgres';
import type { Deck, Character } from '@/app/lib/types'
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function getCharacters(deckId: number) {
 	const characters = await sql<Character[]>`
        SELECT c.* 
        FROM character_definitions c
        JOIN deck_characters dc
            ON c.id = dc.character_id
        WHERE dc.deck_id = ${deckId}
   `;
	return characters;
}

export async function getDecks(id:string) {
    const  decks = await sql<Deck[]>`
        SELECT 
            decks.id,
            decks.title,
            users.username AS creator
        FROM decks
        JOIN users 
            ON decks.creator_id = users.id
        WHERE decks.creator_id = ${id}
    `;
    return decks;
}

export async function getAllCharacters() {
    const allCharacters = await sql<Character[]>`
        SELECT * FROM character_definitions 
    `;
    return allCharacters;
}


export async function getUsername(id:string) {
    const username = await sql`
        SELECT username FROM users WHERE id = ${id}
    `    
    return username;
}