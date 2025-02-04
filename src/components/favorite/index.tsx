"use client";
import React from "react";
import { FiEdit, FiX } from "react-icons/fi";

export function FavoriteCard() {
  const [input, setInput] = React.useState("");
  const [showInput, setShowInput] = React.useState(false);
  const [games, setGames] = React.useState("");

  React.useEffect(() => {
    document.title = "Meu Perfil - DalyGames sua plataforma de jogos!";
  }, []);

  function handleButton() {
    setShowInput(!showInput);

    if (input !== "") {
      setGames(input);
    }
    setInput("");
  }


  return (
    <div className="w-full bg-gray-900 p-4 h-44 text-white rounded-lg flex justify-between flex-col">
      {showInput ? (
        <div className="flex items-center justify-center gap-3">
          <input
            className="w-full rounded-md h-8 text-black px-2"
            type="text"
            value={input}
            onChange={({ target }) => setInput(target.value)}
          />
          <button onClick={handleButton}>
            <FiX size={24} color="#fff" />
          </button>
        </div>
      ) : (
        <button
          className="self-start hover:scale-110 duration-200 transition-all"
          onClick={handleButton}
        >
          <FiEdit size={24} color="#fff" />
        </button>
      )}

      {games && (
        <div>
            <span className="text-white ">Jogo Favorito:</span>
            <p className="font-bold text-white">{games}</p>
        </div>
      )}

      {!games && (
        <p className="font-bold text-white">Adicionar jogo</p>
      )}
    </div>
  );
}
