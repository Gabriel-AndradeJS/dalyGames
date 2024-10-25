"use client";
import { getData } from "@/services/getData";
import { GameProps } from "@/utils/types/game";
import { useParams } from "next/navigation";
import React from "react";
import Container from "../container";
import { Input } from "../input";
import { GameCard } from "../GameCard";

export default function SearchComponents() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [games, setGames] = React.useState<GameProps[]>([]);
  const { title } = useParams();

  React.useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const games: GameProps[] = await getData(title);
        setGames(games);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [title]);

  return (
    <>
      <main className="w-full text-black">
        <Container>
          <Input />
          <h1 className="font-bold text-xl mt-8 mb-5">
            Veja oque encontramos na nossa base:
          </h1>
          {loading && <p>Carregando...</p>}
          {!games && <p>Esse jogo não foi encontrado!...</p>}
          <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {games && games.map((item) => (
                <GameCard key={item.id} data={item} />
              ))}
          </section>
        </Container>
      </main>
    </>
  );
}
