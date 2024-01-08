import Image from "next/image";
import Right from "../icons/Right";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero md:mt-4">
        <div className="py-8 md:py-12">
            <h1 className="text-4xl font-semibold">Everything <br /> is better <br /> with a&nbsp;<span className="text-primary">Pizza</span></h1>
            <p className="my-6 text-gray-500 text-sm">Pizza is a missing piece that makes everyday complete, a simple yet delicious joy in life</p>
            <div className="flex gap-4 text-sm">
                <button className="flex justify-center bg-primary uppercase items-center gap-2 text-white px-4 py-2 rounded-full">
                    <Link href={'/menu'} className="flex justify-center gap-2 items-center">
                        Order Now
                        <Right/>
                    </Link>
                </button>
                <button className="items-center flex border-0 gap-2 py-2 text-gray-600 font-semibold">
                    Learn More
                    <Right/>
                </button>
            </div>
        </div>
        <div className="relative hidden md:block">
            <Image src={"/pizza.png"} layout="fill" objectFit="contain" alt="pizza"/>    
        </div>
    </section>
  )
}
