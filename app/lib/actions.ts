'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' }); 



export async function createDeck(formData:FormData) {
    const title = formData.get("title");
    const creator_id = formData.get("creator_id");
    const characterIds = formData.getAll("characterIds");
    if (
        typeof title !== "string" ||
        typeof creator_id !== "string"
    ) {
        throw new Error("Invalid form data.");
    }
    
    
        const [deck] = await sql<{ id: number }[]>`
        INSERT INTO decks (title, creator_id)
        VALUES (${title}, ${creator_id})
        RETURNING id
        `;

        for (const characterId of characterIds) {
            await sql`
                INSERT INTO deck_characters (deck_id, character_id)
                VALUES (${deck.id}, ${Number(characterId)})
            `;
        }
        revalidatePath("/account")
        redirect(`/flashcards/${deck.id}`);
    
}   

export async function deleteDeck(formData: FormData) {
    const deckId = formData.get("deckId");

    if (typeof deckId !== "string") {
        throw new Error("Invalid deck ID");
    }

    await sql`
        DELETE FROM decks
        WHERE id = ${Number(deckId)}
    `;

    revalidatePath("/decks");
    redirect("/decks");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signup(formData:FormData) {
  const username = formData.get("username");
  const password = formData.get("password");
  const email    = formData.get("email")
  

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof email !== "string"
  ){
    throw new Error("Invalid form.");
  }
  const existing = await sql`
    SELECT id
    FROM users
    WHERE username = ${username} OR email = ${email}
  `;

  if(existing.length > 0){
    throw new Error("Username or Email already exists")
  }
  const hashedPassword = await bcrypt.hash(password,12);

  await sql`
    INSERT INTO users (username, password,email)
    VALUES (${username}, ${hashedPassword}, ${email})
  `

  redirect("/login");
}