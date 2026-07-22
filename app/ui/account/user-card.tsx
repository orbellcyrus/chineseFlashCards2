import { auth } from '@/auth';
import { getUsername } from '@/app/lib/data';
export default async function UserCard() {

    const session = await auth();
    if (!session) {
        return <p>Please sign in.</p>;
    }
    
    const username = await getUsername(session.user?.id);
    console.log(username[0]["username"]);
    return(
        <div className='w-20 h-20 bg-white text-black'>
            <h1>Welcome {username[0]["username"]} </h1>
        </div>
        
    );
}