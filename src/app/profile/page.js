"use client"
import {useSession} from 'next-auth/react'
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import UserTabs from '@/components/layout/UserTabs'
import EditableImage from '@/components/layout/EditableImage'

export default function ProfilePage() {
    const session = useSession()
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
    const {status} = session;

    useEffect(()=>{
        if(status === 'authenticated'){
            setUserName(session.data.user.name)
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                    setCountry(data.country);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            })
        }
    },[session ,status])

    async function handleProfileInfoUpdate(ev){
        ev.preventDefault();
        const savingPromise = new Promise(async (resolve, reject)=>{
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: userName,
                    phone,
                    streetAddress,
                    postalCode,
                    city,
                    country
                })
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

    if(status === 'loading' || !profileFetched){
        return 'Loading...'
    }

    if(status === 'unauthenticated'){
      return redirect('/login')
    }

    const userImage = session.data.user.image;
  return (
    <section className="mt-8">
        <UserTabs isAdmin={isAdmin}/>
        <div className='max-w-md mx-auto mt-8'>
            <div className='flex gap-4 '>
                <div>
                    <div className='p-2 rounded-lg relative max-w-[120px]'>
                        <EditableImage link={userImage}/>
                    </div>
                </div>
                <form className='grow' onSubmit={handleProfileInfoUpdate}>
                    <label>First and Last name</label>
                    <input type="text" placeholder='First and Last name' value={userName} onChange={ev => setUserName(ev.target.value)}/>
                    <label>Email</label>
                    <input type="email" value={session.data.user.email} disabled={true}/>
                    <label>Phone</label>
                    <input type="tel" placeholder='Phone number' value={phone} onChange={ev => setPhone(ev.target.value)}/>
                    <label>Street Address</label>
                    <input type="text" placeholder='Street Address' value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)}/>
                    <div className='flex gap-2'>
                       <div>
                        <label>Postal code</label>
                        <input type="text" placeholder='Postal Code' value={postalCode} onChange={ev => setPostalCode(ev.target.value)}/>
                       </div>
                       <div>
                        <label>Postal code</label>
                        <input type="text" placeholder='City' value={city} onChange={ev => setCity(ev.target.value)}/>
                       </div>
                        
                    </div>
                    <label>Country</label>
                    <input  type="text" placeholder='Country' value={country} onChange={ev => setCountry(ev.target.value)}/>
                    <button type='submit'>
                        Save
                    </button>
                </form>
            </div>
        </div>
    </section>
  )
}
