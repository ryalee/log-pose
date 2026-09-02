"use client";

import { FormEvent, useState } from "react";
import type { ProgressResult } from "@/lib/onepiece";
import Image from "next/image";

type FetchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: ProgressResult };

export default function Home() {
  const [episodeInput, setEpisodeInput] = useState("");
  const [state, setState] = useState<FetchState>({ status: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = Number(episodeInput);
    if (!episodeInput || Number.isNaN(parsed)) {
      setState({
        status: "error",
        message: "Digite um número de episódio válido.",
      });
      return;
    }

    setState({ status: "loading" });

    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentEpisode: parsed }),
      });

      const data = await response.json();

      if (!response.ok) {
        setState({
          status: "error",
          message: data.error ?? "Algo deu errado.",
        });
        return;
      }

      setState({ status: "success", data });
    } catch {
      setState({
        status: "error",
        message:
          "Não foi possível calcular agora. Confira sua conexão e tente de novo.",
      });
    }
  }

  return (
    <main className="waves relative min-h-screen overflow-hidden px-4 py-14 sm:py-20">
      <div className="flex justify-between w-full px-12 opacity-20 absolute ">
        <Image
          src="/one-piece-logo.png"
          alt="One Piece"
          width={300}
          height={300}
          // className="h-auto w-64 sm:w-80 absolute opacity-20 ml-130"
          
        />

        <Image
          src="/one-piece-logo.png"
          alt="One Piece"
          width={300}
          height={300}
          // className="h-auto w-64 sm:w-80 absolute opacity-20 ml-130"
        />
      </div>
      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        <h1 className="font-pirate mt-3 text-5xl leading-none text-straw-400 drop-shadow-[0_3px_0_rgba(0,0,0,0.4)] sm:text-6xl">
          Até onde falta velejar?
        </h1>
        <p className="font-body mt-5 max-w-md text-balance text-sm text-parchment-200/80 sm:text-base">
          Diga em que episódio de One Piece você parou. Nosso Log Pose irá
          calcular a distância até o episódio mais recente exibido em episódios,
          horas e dias e ainda mostra a que altura do mangá isso equivale.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 flex w-full max-w-sm flex-col items-center gap-3 sm:flex-row sm:gap-0"
        >
          <div className="flex w-full items-center overflow-hidden rounded-sm border-2 border-straw-500/60 bg-sea-900/70 shadow-lg backdrop-blur-sm focus-within:border-straw-400">
            <label htmlFor="episode" className="sr-only">
              Episódio atual
            </label>
            <span className="font-display pl-4 text-sm text-parchment-300/60">
              EP.
            </span>
            <input
              id="episode"
              name="episode"
              type="number"
              inputMode="numeric"
              min={0}
              placeholder="ex: 1050"
              value={episodeInput}
              onChange={(event) => setEpisodeInput(event.target.value)}
              className="w-full bg-transparent px-3 py-3 font-display text-lg text-parchment-100 outline-none placeholder:text-parchment-300/30"
            />
          </div>
          <button
            type="submit"
            disabled={state.status === "loading"}
            className="font-display w-full shrink-0 bg-vest-500 px-6 py-3 text-sm font-bold tracking-wide text-parchment-100 transition-colors hover:bg-vest-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {state.status === "loading" ? "Traçando rota…" : "Calcular"}
          </button>
        </form>

        {state.status === "error" && (
          <p className="mt-4 text-sm text-vest-500">{state.message}</p>
        )}

        {state.status === "success" && <ResultPoster data={state.data} />}
      </div>
    </main>
  );
}

function ResultPoster({ data }: { data: ProgressResult }) {
  if (data.isCaughtUp) {
    return (
      <div className="mt-10 w-full rounded-sm border-2 border-straw-500/70 bg-parchment-100 px-6 py-8 text-ink shadow-poster">
        <p className="font-pirate text-3xl text-vest-600">Você está em dia!</p>
        <p className="font-body mt-3 text-sm text-ink/70">
          Seu episódio ({data.currentEpisode}) já alcançou o mais recente
          exibido (ep. {data.latestEpisode}). Só falta esperar a próxima semana
          chegar até a costa.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 w-full animate-[fadeIn_0.4s_ease-out] rounded-sm border-2 border-straw-500/70 bg-parchment-100 text-ink shadow-poster">
      <div className="border-b-2 border-dashed border-ink/20 px-6 py-6 sm:px-10 sm:py-8">
        <p className="font-display text-xs tracking-widest text-vest-600">
          FALTAM
        </p>
        <p className="font-pirate text-outline-ink text-7xl leading-none text-straw-600 sm:text-8xl">
          {data.remainingEpisodes}
        </p>
        <p className="font-display text-sm text-ink/70">
          episódio{data.remainingEpisodes === 1 ? "" : "s"} até o episódio{" "}
          {data.latestEpisode}, o mais recente exibido
        </p>
      </div>

      <div className="grid gap-6 px-6 py-6 sm:grid-cols-2 sm:px-10 sm:py-8">
        <div>
          <h2 className="font-display text-xs tracking-widest text-vest-600">
            TEMPO DE TELA
          </h2>
          <p className="font-body mt-2 text-sm leading-relaxed text-ink/80">
            Isso dá aproximadamente{" "}
            <strong className="text-ink">
              {formatHours(data.totalHours)} horas
            </strong>{" "}
            de exibição — ou seja,{" "}
            <strong className="text-ink">
              {formatDays(data.totalDays)} dias
            </strong>{" "}
            maratonando sem parar, considerando 20 minutos por episódio (já
            descontando abertura e encerramento).
          </p>
        </div>

        <div>
          <h2 className="font-display text-xs tracking-widest text-vest-600">
            NO MANGÁ, VOCÊ ESTARIA EM…
          </h2>
          <p className="font-body mt-2 text-sm leading-relaxed text-ink/80">
            Aproximadamente o{" "}
            <strong className="text-ink">
              capítulo {data.mangaChapterEquivalent}
            </strong>
            , que fica{" "}
            <strong className="text-ink">
              {data.mangaChaptersAhead} capítulos
            </strong>{" "}
            atrás do mais recente publicado (cap. {data.latestMangaChapter}).
            Estimativa proporcional — a correspondência real varia por saga.
          </p>
        </div>
      </div>

      <div className="border-t-2 border-dashed border-ink/20 px-6 py-6 sm:px-10 sm:py-8">
        <h2 className="font-display text-xs tracking-widest text-vest-600">
          METAS DIÁRIAS
        </h2>
        <ul className="font-body mt-3 grid gap-2 text-sm text-ink/80 sm:grid-cols-2">
          {data.dailyGoals.map((goal) => (
            <li
              key={goal.episodesPerDay}
              className="flex items-baseline justify-between gap-3 border-b border-ink/10 pb-2"
            >
              <span>
                {goal.episodesPerDay} episódio
                {goal.episodesPerDay === 1 ? "" : "s"}
                /dia
              </span>
              <span className="font-display font-bold text-vest-600">
                {goal.days} {goal.days === 1 ? "dia" : "dias"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function formatHours(hours: number): string {
  return hours.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
}

function formatDays(days: number): string {
  return days.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
}
