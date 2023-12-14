'use client'
import Image from 'next/image';
import EditableImage from '@/components/layout/EditableImage'
import { useState } from 'react';
import { useProfile } from '../UseProfile';

export default function UserForm({user, onSave}) {
    const [userName, setUserName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country || '');
    const [admin, setAdmin] = useState(user?.admin || false);
    const {data: loggedInUserData} = useProfile();

    const userImage = user?.image || null; 
  return (
    <div className='flex gap-4 '>
                <div>
                    <div className='p-2 rounded-lg relative max-w-[120px]'>
                        <EditableImage link={userImage}/>
                    </div>
                </div>
                <form className='grow' onSubmit={ev => onSave(ev, {name:userName, phone, streetAddress, postalCode, city, country, admin})}>
                    <label>First and Last name</label>
                    <input type="text" placeholder='First and Last name' value={userName} onChange={ev => setUserName(ev.target.value)}/>
                    <label>Email</label>
                    <input type="email" value={user.email} disabled={true}/>
                    <label>Phone</label>
                    <input type="tel" placeholder='Phone number' value={phone} onChange={ev => setPhone(ev.target.value)}/>
                    <label>Street Address</label>
                    <input type="text" placeholder='Street Address' value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)}/>
                    <div className='grid grid-cols-2 gap-2'>
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

                    {loggedInUserData.admin && (
                        <div>
                            <label className='p-2 inline-flex items-center gap-2 mb-2' htmlFor='adminCB'>
                                <input value={'1'} checked={admin} onClick={ev => setAdmin(ev.target.checked)}
                                id='adminCB' type="checkbox" className=''/>
                                <span>Admin</span>
                            </label>
                        </div>
                    )}

                    <button type='submit'>
                        Save
                    </button>
                </form>
            </div>
  )
}
