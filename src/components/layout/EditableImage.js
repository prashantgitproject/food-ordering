import Image from "next/image";

export default function EditableImage({link}){

    async function handleFileChange(ev){
        const files = ev.target.files;
        if(files?.length === 1){
            const data = new FormData;
            data.set('file', files[0]);
            await fetch('/api/upload', {
                method: 'POST',
                body: data
            })
        }
    }

    return(
        <>
        {link && (
            <Image className='rounded-lg h-full w-full mb-1' src={link} alt='Avatar' width={250} height={250}/>
        )}
        {!link && (
            <div className="bg-gray-200 p-4 text-gray-500 rounded-lg mb-1 text-center">
                No image
            </div>
        )}
        <label>
            <input type="file" className='hidden' onChange={handleFileChange}/>
            <span className='block text-center rounded-lg border border-gray-300 p-2 cursor-pointer'>
                Edit
            </span>
        </label>
        </>
    )
}