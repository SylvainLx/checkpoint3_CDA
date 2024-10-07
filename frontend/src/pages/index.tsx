import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-4xl p-8 text-center">Hello, wilder !</h1>
      <div className="flex justify-center">
        <Link href="/countries" className="bg-[#F7136B] text-white p-4 rounded-lg">
          List of countries
        </Link>
      </div>
    </>
  )
}
