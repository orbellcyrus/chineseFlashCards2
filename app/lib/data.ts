import postgres from 'postgres';
import type { Deck, Character } from '@/app/lib/types'
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function getCharacters() {
 	const charcters = await sql<Character[]>`
     SELECT * FROM character_definitions
   `;
	return charcters;
}

export async function getDecks() {
    const  decks = await sql<Deck[]>`
        SELECT 
            decks.id,
            decks.title,
            users.username AS creator
        FROM decks
        JOIN users 
            ON decks.creator_id = users.id
    `;
    return decks;
}

