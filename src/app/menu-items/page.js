'use client'
import Right from "@/components/icons/Right";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from '@/components/UseProfile'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MenuItemsPage(){

const [menuItems, setMenuItems] = useState([])
const {loading, data} = useProfile();

useEffect(()=>{
    fetch('/api/menu-items').then(res =>{
        res.json().then(menuItems => {
            setMenuItems(menuItems);

        });
    });
}, [])


if(loading){
    return 'Loading user info...'
}

if(!data.admin){
    return 'Not an admin.'
}

const image = '/pizza.png';

    return(
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true}/>
            <div className="mt-8">
                <Link className="button"
                 href={'/menu-items/new'}>
                    <span>Create new menu item</span>
                    <Right/>
                </Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-8">Edit menu items</h2>
                <div className="grid grid-cols-3 gap-2">
                    {menuItems?.length > 0 && menuItems.map(item => (
                        <Link href={'/menu-items/edit/' + item._id}
                         className="bg-gray-200 p-4 rounded-lg">
                            <div className="relative">
                                <Image className="rounded-md"
                                 src={''} alt="" width={200} height={200}/>
                            </div>
                            <div className="text-center">
                            {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}