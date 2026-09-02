import { NextResponse } from "next/server";
import { fetchLatestAnimeEpisode, calculateProgress } from "@/lib/onepiece";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { currentEpisode } = body;

    if (
      typeof currentEpisode !== "number" ||
      isNaN(currentEpisode) ||
      currentEpisode < 0
    ) {
      return NextResponse.json(
        { error: "Número de episódio inválido." },
        { status: 400 }
      );
    }

    // 1. Busca o episódio semanal atual na API externa
    const latestEpisode = await fetchLatestAnimeEpisode();

    // 2. Executa a lógica de cálculo com o episódio obtido
    const result = calculateProgress(currentEpisode, latestEpisode);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno ao processar o progresso." },
      { status: 500 }
    );
  }
}