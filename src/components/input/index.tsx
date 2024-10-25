"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FiSearch } from "react-icons/fi";

export function Input() {
  const [input, setInput] = React.useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    if (input === "") return;

    router.push(`/game/search/${input}`);
  }

  return (
    <form
      className="w-full bg-slate-200 my-5 flex items-center justify-between gap-2 rounded-lg p-2"
      onSubmit={handleSearch}
    >
      <input
        className="bg-slate-200 outline-none w-11/12"
        type="text"
        placeholder="Procurando algum jogo?..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">
        <FiSearch size={24} color="#ea580c" />
      </button>
    </form>
  );
}
