
export default function MenuItemTile({onAddToCart, ...item}) {
    const {name, description, basePrice, sizes, extraIngredientPrices} = item;
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
        <div className="text-center">
            <img className="max-h-auto max-h-24 block mx-auto" src="/pizza.png" alt="pizza" />
        </div>
        <h4 className="font-semibold text-xl my-3">{name}</h4>
        <p className="text-gray-500 text-sm line-clamp-3">
            {description}  
        </p>
        <button onClick={onAddToCart}
        className="mt-4 bg-primary text-white rounded-full px-8 py-2"
        type="buton">
            {(sizes?.length > 0 || extraIngredientPrices?.length > 0) ? (
                <span>Add to cart (from ${basePrice})</span>
            ) : (
                <span>Add to cart ${basePrice}</span> 
            )}
            
        </button>
    </div>
  );
}
