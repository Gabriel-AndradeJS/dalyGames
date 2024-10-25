"use client";
import { getDataId } from "@/services/getDataId";
import { GameProps } from "@/utils/types/game";
import { redirect, useParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import Container from "../container";
import { Label } from "../label";
import getGameSorted from "@/services/getGameSorted";
import { GameCard } from "../GameCard";
import { generateMetadata } from "@/services/generateMetada";

export default function GameComponent() {
  const [game, setGame] = React.useState<GameProps | undefined>();
  const [sortedGame, setSortedGame] = React.useState<GameProps>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const { id }: any = useParams();

  React.useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result: GameProps = await getDataId(id);
        const recommendedGame: GameProps = await getGameSorted();
        setSortedGame(recommendedGame);
        const { title } = await generateMetadata(id);
        setGame(result);
        document.title = title;
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);
  if (loading) return <p>Carregando...</p>;
  if (!game) {
    redirect("/");
  }
  return (
    <main className="w-full text-black">
      <div className="bg-black h-80 sm:h-96 w-full relative">
        <Image
          className="object-cover w-full h-80 sm:h-96 opacity-75"
          src={game.image_url}
          alt={game.title}
          priority
          quality={100}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
        />
      </div>
      <Container>
        <h1 className="font-bold text-xl my-4">{game.title}</h1>
        <p>{game.description}</p>

        <h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>
        <div className="flex gap-2 flex-wrap">
          {game.platforms.map((item) => (
            <Label name={item} key={item} />
          ))}
        </div>

        <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
        <div className="flex gap-2 flex-wrap">
          {game.categories.map((item) => (
            <Label name={item} key={item} />
          ))}
        </div>

        <p className="mt-7 mb-2">
          <strong>Data de lançamento</strong> {game.release}
        </p>

        <h2 className="font-bold text-lg mt-7 mb-2">Jogos recomendados:</h2>
        <div className="flex">
          <div className="flex-grow">
            {sortedGame && <GameCard data={sortedGame} />}
          </div>
        </div>
      </Container>
    </main>
  );
}
