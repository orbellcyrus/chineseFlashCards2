import { Suspense } from 'react';
import { signOut } from '@/auth';
import UserCard from '../ui/account/user-card';
import UserCardSkeleton from '../ui/account/user-card-skeleton';
export default async function AccountPage() {
    return(
        <>
            
            <Suspense fallback={<UserCardSkeleton></UserCardSkeleton>}>
                <UserCard></UserCard>
            </Suspense>
            
            <form
                    action={async () => {
                        'use server';
                        await signOut({ redirectTo: '/' });
                    }}
                >
                    <button type='submit'>
                        Sign Out
                    </button>
                </form>

        </>
        
    );
}