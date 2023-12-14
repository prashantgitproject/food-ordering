'use client';
import { useProfile } from '@/components/UseProfile'
import UserForm from '@/components/layout/UserForm';
import UserTabs from '@/components/layout/UserTabs'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function EditUserPage(){

const {loading, data} = useProfile()
const {id} = useParams();
const [user, setUser] = useState(null);

useEffect(() => {
    fetch('/api/profile?_id=' + id).then(res => {
        res.json().then(user => {
            setUser(user);
        })
    })
},[])

async function handleSaveButtonClick(ev, data){
    ev.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
        const res = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...data, _id:id}),
        });
        if(res.ok)
         resolve();
        else
         reject();
    });

    await toast.promise(promise, {
        loading: 'Saving user data...',
        success: 'Saved',
        error: 'Error occured while saving data',
    });
}

if(loading){
    return 'Loading user info...'
}

if(!data.admin){
    return 'Not an admin'
}

    return(
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={true}/>
            <div className="mt-8">
                <UserForm user={user} onSave={handleSaveButtonClick}/>
            </div>
        </section>
    )
}