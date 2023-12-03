"use client"
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import {useProfile} from '@/components/UseProfile'

export default function CategoriesPage(){

    const {loading:profileLoading, data:profileData} = useProfile();

    if(profileLoading){
        return 'Loading User Info...'
    }
    if(!profileData.admin){
        return 'Not an Admin'
    }

    return(
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs isAdmin={true}/>
            categories
        </section>
    )
}