import { useState } from "react";
import EditableImage from "./EditableImage";
import MenuItemPriceProps from '@/components/layout/MenuItemPriceProps'

export default function MenuItemForm({onSubmit, menuItem}){
    const [name, setName] = useState(menuItem?.name || '')
    const [description, setDescription] = useState(menuItem?.description || '')
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '')
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);

    const image = '/pizza.png';
    return(
        <form onSubmit={ev => onSubmit(ev, {name, description, basePrice, sizes, extraIngredientPrices})} className="mt-8 max-w-md mx-auto">
            <div className="grid items-start gap-4"
                    style={{gridTemplateColumns: '.3fr .7fr'}}>
                <div>
                    <EditableImage link={image}/>
                </div>
                <div className="grow">
                    <label>Item name</label>
                    <input value={name} onChange={ev => setName(ev.target.value)} type="text" />
                    <label>Description</label>
                    <input value={description} onChange={ev => setDescription(ev.target.value)} type="text" />
                    <label>Base price</label>
                    <input value={basePrice} onChange={ev => setBasePrice(ev.target.value)} type="text" />
                    <MenuItemPriceProps name={'Sizes'} addLabel={'Add item size'} props={sizes} setProps={setSizes}/>
                    <MenuItemPriceProps name={'Extra Ingredients'} addLabel={'Add ingredients prices'} props={extraIngredientPrices} setProps={setExtraIngredientPrices}/>
                    <button type="submit">Save</button>
                </div>
            </div>
        </form>
    );
}