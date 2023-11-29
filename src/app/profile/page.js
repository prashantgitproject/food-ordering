"use client"
import {useSession} from 'next-auth/react'
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
    const session = useSession()
    const [userName, setUserName] = useState('');
    const {status} = session;

    useEffect(()=>{
        if(status === 'authenticated'){
            setUserName(session.data.user.name)
        }
    },[session ,status])

    async function handleProfileInfoUpdate(ev){
        ev.preventDefault();
        const savingPromise = new Promise(async (resolve, reject)=>{
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name: userName})
            });
            if(response.ok)
                resolve()
            else
                reject()
        })

        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Error'
        })
    }

    if(status === 'loading'){
        return 'Loading...'
    }

    if(status === 'unauthenticated'){
      return redirect('/login')
    }

    async function handleFileChange(ev){
        const files = ev.target.files;
        if(files?.length === 1){
            const data = new FormData;
            data.set('file', files[0]);
            await fetch('/api/upload', {
                method: 'POST',
                body: data
            })
        }
    }

    const userImage = session.data.user.image;
  return (
    <section className="mt-8">
        <h1 className="text-primary text-4xl text-center mb-4">
            Profile
        </h1> 
        <div className='max-w-md mx-auto'>
            <div className='flex gap-4 items-center'>
                <div>
                    <div className='p-2 rounded-lg relative max-w-[120px]'>
                        <Image className='rounded-lg h-full w-full mb-1' src={userImage} alt='Avatar' width={250} height={250}/>
                        <label>
                            <input type="file" className='hidden' onChange={handleFileChange}/>
                            <span className='block text-center rounded-lg border border-gray-300 p-2 cursor-pointer'>
                                Edit
                            </span>
                        </label>
                    </div>
                </div>
                <form className='grow' onSubmit={handleProfileInfoUpdate}>
                    <input type="text" placeholder='First and Last name' value={userName} onChange={ev => setUserName(ev.target.value)}/>
                    <input type="email" value={session.data.user.email} disabled={true}/>
                    <button type='submit'>
                        Save
                    </button>
                </form>
            </div>
        </div>
    </section>
  )
}
