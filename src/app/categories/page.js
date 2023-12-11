"use client"
import { useEffect, useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from '@/components/UseProfile'
import toast from "react-hot-toast";

export default function CategoriesPage(){

    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const {loading:profileLoading, data:profileData} = useProfile();
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(()=>{
        fetchCategories();
    }, [])

    function fetchCategories() {
        fetch('/api/categories').then(res => {
          res.json().then(categories => {
            setCategories(categories);
          });
        });
      }

    async function handleCategorySubmit(ev){
        ev.preventDefault();
        const creationPromise = new Promise(async (resolve, reject)=>{
            const data = {name: categoryName};
            if(editedCategory){
                data._id = editedCategory._id;
            }
            const response = await fetch('/api/categories', {
                method: editedCategory? 'PUT': 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            setCategoryName('')
            fetchCategories();
            setEditedCategory(null);
            if (response.ok)
                resolve();
            else
                reject()
        });
        await toast.promise(creationPromise, {
            loading: editedCategory
                    ? 'Updating category...' 
                    : 'Creating you category..',
            success: editedCategory
                    ? 'Category updated'
                    : 'Category created',
            error: 'Error, sorry...'
        })
    }

    if(profileLoading){
        return 'Loading User Info...'
    }
    if(!profileData.admin){
        return 'Not an Admin'
    }

    return(
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs isAdmin={true}/>
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editedCategory? 'Update category' : 'New Category Name'}
                            {editedCategory && (
                                <>: <b>{editedCategory.name}</b></>
                            )}
                        </label>
                        <input type="text" value={categoryName}
                         onChange={ev => setCategoryName(ev.target.value)}/>
                    </div>
                    <div className="pb-2"> 
                        <button type="submit">
                            {editedCategory? 'Update': 'Create'}
                        </button>
                    </div>
                </div>
                
                
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-500">Edit category:</h2>
                {categories?.length > 0 && categories.map(c => (
                    <>
                    <button onClick={() => {
                        setEditedCategory(c);
                        setCategoryName(c.name)}}
                     className="rounded-lg p-2 px-4 flex gap-1 cursor-pointer mb-1">
                        <span>{c.name}</span>
                    </button>
                    </>
                ))}
            </div>
        </section>
    )
}