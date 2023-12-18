
export default function AddToCartButton({hasSizeOrExtras, onClick, basePrice}) {
  return (
    <button onClick={onClick}
    className="mt-4 bg-primary text-white rounded-full px-8 py-2"
    type="buton">
        {hasSizeOrExtras ? (
            <span>Add to cart (from ${basePrice})</span>
        ) : (
            <span>Add to cart ${basePrice}</span> 
        )}
        
    </button>
  )
}
