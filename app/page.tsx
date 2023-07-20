"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main>
      <button
        onClick={() => router.push("/stdtable")}
        className="border border-gray-100 rounded mt-8 ml-4 p-2"
      >
        standard table
      </button>
    </main>
  );
}
