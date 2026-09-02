// Mantenha fallbacks válidos (maiores que 0) para o cálculo funcionar!
export const DEFAULT_LATEST_ANIME_EPISODE = 1176;
export const LATEST_MANGA_CHAPTER = 1191; 
export const MINUTES_PER_EPISODE = 20; 

export type DailyGoal = {
  episodesPerDay: number;
  days: number;
};

export type ProgressResult = {
  currentEpisode: number;
  latestEpisode: number;
  remainingEpisodes: number;
  isCaughtUp: boolean;
  totalMinutes: number;
  totalHours: number;
  totalDays: number;
  dailyGoals: DailyGoal[];
  mangaChapterEquivalent: number;
  mangaChaptersAhead: number;
  latestMangaChapter: number;
};

const PACE_OPTIONS = [1, 2, 3, 5, 10];

/**
 * Busca o episódio mais recente exibido via Jikan API
 */
export async function fetchLatestAnimeEpisode(): Promise<number> {
  try {
    // Busca a lista mais recente de episódios de One Piece
    const response = await fetch("https://api.jikan.moe/v4/anime/21/episodes", {
      next: { revalidate: 86400 }, // Cache de 24 horas no Next.js
    });

    if (!response.ok) {
      throw new Error("Falha na resposta da API");
    }

    const json = await response.json();
    
    // Pega o número do episódio mais recente no topo do array
    const latestFromApi = json.data?.[0]?.mal_id;

    if (typeof latestFromApi === "number" && latestFromApi > 0) {
      return latestFromApi;
    }

    return DEFAULT_LATEST_ANIME_EPISODE;
  } catch (error) {
    console.error("Erro ao buscar episódio na API. Usando fallback:", error);
    return DEFAULT_LATEST_ANIME_EPISODE;
  }
}

function estimateMangaChapter(episode: number, latestEpisode: number): number {
  const ratio = LATEST_MANGA_CHAPTER / (latestEpisode || 1);
  return Math.max(1, Math.round(episode * ratio));
}

export function calculateProgress(
  currentEpisode: number,
  latestEpisode: number = DEFAULT_LATEST_ANIME_EPISODE
): ProgressResult {
  const remainingEpisodes = Math.max(latestEpisode - currentEpisode, 0);
  const isCaughtUp = currentEpisode >= latestEpisode;

  const totalMinutes = remainingEpisodes * MINUTES_PER_EPISODE;
  const totalHours = totalMinutes / 60;
  const totalDays = totalHours / 24;

  const dailyGoals: DailyGoal[] = PACE_OPTIONS.map((episodesPerDay) => ({
    episodesPerDay,
    days: remainingEpisodes === 0 ? 0 : Math.ceil(remainingEpisodes / episodesPerDay),
  }));

  const mangaChapterEquivalent = estimateMangaChapter(currentEpisode, latestEpisode);
  const mangaChaptersAhead = Math.max(LATEST_MANGA_CHAPTER - mangaChapterEquivalent, 0);

  return {
    currentEpisode,
    latestEpisode,
    remainingEpisodes,
    isCaughtUp,
    totalMinutes,
    totalHours,
    totalDays,
    dailyGoals,
    mangaChapterEquivalent,
    mangaChaptersAhead,
    latestMangaChapter: LATEST_MANGA_CHAPTER,
  };
}