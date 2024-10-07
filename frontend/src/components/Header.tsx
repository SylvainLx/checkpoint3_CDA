import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#F7136B] flex flex-col justify-center items-center p-8 gap-4">
      <h1 className="font-bold text-xl text-white">Checkpoint : frontend</h1>
      <Link href="/" rel="preload" className="text-white">Countries</Link>
    </header>
  );
}
