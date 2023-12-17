import Hero from "@/components/layout/Hero"
import HomeMenu from "@/components/layout/HomeMenu"
import SectionHeaders from "@/components/layout/SectionHeaders"

export default function Home() {
  return (
    <> 
      <Hero/>
      <HomeMenu/>
      <section className="text-center my-16" id="about">
        <SectionHeaders 
          subHeader={"Our Story"} 
          mainHeader={"About Us"}/>
        <div className="max-w-md text-gray-500 mx-auto mt-4 flex flex-col gap-4">
        <p >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit illo molestias alias architecto facilis sunt prae. Suscipit illo molestias alias architecto 
        </p>
        <p >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit illo molestias alias architecto facilis sunt prae. Suscipit illo molestias alias architecto facilis sunt prae.Suscipit illo molestias alias architecto facilis sunt prae.
        </p>
        <p >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit illo molestias alias architect
        </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={'Don\'t hesitate'}
          mainHeader={'Contact Us'}
        />
        <div className="my-8">
          <a className="text-4xl text-gray-500 underline" href="tel:+91-7089445478">+91 7089445478</a>
        </div>
      </section>
    </>
  )
}
