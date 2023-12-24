"use client"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import ShoppingCart from '@/components/icons/ShoppingCart';
import Bars2 from '@/components/icons/Bars2'

function AuthLinks({status, userName}){
  if(status === 'authenticated'){
    return(
      <>
      <Link href={"/profile"} className="whitespace-nowrap">
        Hello, {userName}
      </Link>
        <button
          onClick={()=> signOut({callbackUrl: '/'})} 
          className="bg-primary text-white px-8 py-2 rounded-full" href={'/register'}>
            Logout
        </button>
      </>
    )
  }
    if(status === 'unauthenticated'){
      return(
        <>
          <Link href={"/login"}>Login</Link>
          <Link className="bg-primary text-white px-8 py-2 rounded-full" href={'/register'}>
            Register
          </Link>
        </>
      )
    }
}

export default function Header() {
  const session = useSession();
  console.log(session);
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const {cartProducts} = useContext(CartContext)
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  if(userName && userName.includes(' ')){
    userName = userName.split(' ')[0];
  }
  if(userName && userName.includes('@')){
    userName = userName.split('@')[0]
  }
  return (
    <>
        <header>
          <div className="flex items-center md:hidden justify-between">
            <Link className='text-primary font-semibold text-2xl' href="/">
              ST PIZZA
            </Link>
            <div className="flex gap-8 items-center">
            <Link className="relative"
              href={'/cart'}>
                <ShoppingCart/>
                <span className="absolute -top-2 -right-4 bg-primary text-white text-xs px-1 py-1 rounded-full leading-3">
                  {cartProducts.length}
                </span> 
            </Link>
            <button onClick={() => setMobileNavOpen(prev => !prev)}
             className="p-1">
              <Bars2/>
            </button>
            </div>
          </div>
          {mobileNavOpen && (
            <div onClick={() => setMobileNavOpen(false)}
             className="mt-2 md:hidden p-4 bg-gray-200 rounded-lg flex flex-col gap-2 text-center">
                <Link href={'/'}>Home</Link>
                <Link href={'/menu'}>Menu</Link>
                <Link href={'/#about'}>About</Link>
                <Link href={'/#contact'}>Contact</Link>
                <AuthLinks status={status} userName={userName}/>
            </div>
          )}

          <div className="hidden md:flex items-center justify-between">
            <nav className="flex gap-8 items-center text-gray-500 font-semibold">
            <Link className='text-primary font-semibold text-2xl' href="/">
              ST PIZZA
            </Link>
              <Link href={'/'}>Home</Link>
              <Link href={'/menu'}>Menu</Link>
              <Link href={'/#about'}>About</Link>
              <Link href={'/#contact'}>Contact</Link>
            </nav>
            <nav className="flex items-center gap-8 text-gray-500 font-semibold">
              <AuthLinks status={status} userName={userName}/>
              <Link className="relative" href={'/cart'}>
                <ShoppingCart/>
                <span className="absolute -top-2 -right-4 bg-primary text-white text-xs px-1 py-1 rounded-full leading-3">
                  {cartProducts.length}
                </span> 
              </Link>
            </nav>
          </div>
      </header> 
    </>
  )
}
