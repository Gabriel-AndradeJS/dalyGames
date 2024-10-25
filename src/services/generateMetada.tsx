import { GameProps } from "@/utils/types/game";
import { Metadata } from "next";

  
  export async function generateMetadata(id: string): Promise<Metadata> {
    try {
      const response: GameProps = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/next-api/?api=game&id=${id}`,
        { next: { revalidate: 60 } }
      )
        .then((res) => res.json())
        .catch(() => {
          return {
            title: "DalyGames - Descubra jogos incríveis para se divertir",
          };
        });
        return {
          title: response.title
        }
    } catch (error) {
      return {
        title: "DalyGames - Descubra jogos incríveis para se divertir",
      };
    }
  }