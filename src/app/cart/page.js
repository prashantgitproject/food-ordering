'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders"
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Trash from '@/components/icons/Trash'
import AddressInputs from "@/components/layout/AddressInputs";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";

export default function CartPage() {
    const {cartProducts, removeCartProduct} = useContext(CartContext);
    const [address, setAddress] = useState({});
    const {data: profileData} = useProfile();

    useEffect(() => {
        if(profileData?.city){
            const {phone, streetAddress, postalCode, city, country} = profileData;
            const addressFromProfile = {phone, streetAddress, postalCode, city, country};
            setAddress(addressFromProfile);
        }
    }, [profileData])

    let subtotal = 0;
    for(const p of cartProducts){
        subtotal +=cartProductPrice(p);
    }

    function handleAddressChange(propName, value){
        setAddress(prevAddress =>  ({...prevAddress, [propName]: value}));
    }

    async function proceedToCheckout(ev){
        ev.preventDefault();

        const promise = new Promise((resolve, reject) => {
            fetch('/api/checkout', {
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({
                    address,
                    cartProducts,
                }),
            }).then(async (response) => {
                if(response.ok){
                    resolve();
                    // window.location = await response.json();
                } else{
                    console.log('No international payments');
                    reject();
                }
            });
        });

        toast.promise(promise, {
            loading: 'Preparing your order...',
            success: 'Redirecting to payment...',
            error: 'Something went wrong... Please try again later.',
        })
    }

  return (
    <section className="mt-8">
        <div className="text-center">
            <SectionHeaders mainHeader={'Cart'}/>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-8">
            <div>
                {cartProducts.length === 0 && (
                    <div>No products in your shopping cart</div>
                )}
                {cartProducts.length > 0 && cartProducts.map((product, index) => (
                    <div key={index}
                     className="flex gap-4 border-b py-4 items-center">
                        <div className="w-24">
                            <img width={240} height={240} src={product.image || '/pizza.png'} alt=""/>
                        </div>
                        <div className="grow">
                            <h3 className="font-semibold">{product.name}</h3>

                            {product.size && (
                            <div className="text-sm">
                              size: <span>{product.size.name}</span>  
                            </div>
                            )}

                            {product.extras?.length > 0 && (
                                <div className="text-sm text-gray-500">
                                    {product.extras.map(extra => (
                                        <div key={extra._id}>
                                            {extra.name} ${extra.price}
                                        </div>
                                    ))}
                                </div>
                            )} 

                        </div>
                        <div className="text-lg font-semibold">
                            ${cartProductPrice(product)}
                        </div>
                        <div className="ml-2">
                            <button onClick={() => removeCartProduct(index)}
                             className="p-2">
                                <Trash/>
                            </button>
                        </div>
                    </div>
                ))}
                <div className="py-2 pr-16 flex justify-end items-center">
                    <div className="text-gray-500">
                        Subtotal: <br/>
                        Delvery: <br />
                        Total:
                    </div>
                    <div className="font-semibold pl-2 text-right">
                        ${subtotal} <br />
                        $5 <br />
                        ${subtotal + 5}
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
                <h2>Checkout</h2>
                <form onSubmit={proceedToCheckout}>
                    <label>Address</label>
                    <AddressInputs addressProps={address}
                     setAddressProps={handleAddressChange}/>
                    <button type="submit">Pay ${subtotal + 5}</button>
                </form>
            </div>
        </div>
    </section>
  )
}
