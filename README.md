# Bússola de Maratona

## One Piece Catch-up Tracker

Descubra quanto falta para alcançar o anime de **One Piece**.

Informe o episódio em que você parou e receba uma rota personalizada até o
episódio mais recente: distância em episódios, tempo total de exibição, metas
diárias e uma estimativa do capítulo correspondente no mangá.

> Um pequeno Log Pose para transformar a pergunta "quanto falta?" em um plano
> de maratona.

![One Piece Catch-up Tracker](public/one-piece-logo.png)

## Recursos

- Consulta o episódio mais recente disponível por meio da [Jikan API](https://jikan.moe/), com cache de 24 horas e fallback local.
- Calcula automaticamente quantos episódios ainda faltam.
- Converte a distância em horas e dias de exibição, considerando 20 minutos por episódio.
- Sugere metas para assistir 1, 2, 3, 5 ou 10 episódios por dia.
- Estima em qual capítulo do mangá o espectador estaria.
- Identifica quando o espectador já está em dia com o anime.
- Interface responsiva, temática e disponível em português do Brasil.

## Tecnologias

- [Next.js 14](https://nextjs.org/) com App Router
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- API Route do Next.js
- Jikan API para consultar dados de One Piece

## Como executar

### Pré-requisitos

- Node.js 18.17 ou superior
- npm

### Desenvolvimento

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Produção

```bash
npm run build
npm start
```

Para verificar o código com o lint configurado no projeto:

```bash
npm run lint
```

## Como funciona

1. O usuário informa o número do episódio em que parou.
2. A API Route valida a entrada e consulta o episódio mais recente na Jikan API.
3. Se a consulta falhar, o sistema usa um episódio de fallback definido localmente.
4. A aplicação calcula episódios restantes, duração estimada, metas diárias e equivalência no mangá.
5. O resultado é apresentado em um cartaz com a identidade visual da aplicação.

## Estrutura do projeto

```text
app/
  api/progress/route.ts  # Endpoint que valida a entrada e calcula o progresso
  globals.css            # Estilos globais e identidade visual
  layout.tsx             # Layout raiz, metadados e fontes
  page.tsx               # Formulário e apresentação dos resultados
lib/
  onepiece.ts            # Constantes, integração com a Jikan e cálculos
public/
  one-piece-logo.png     # Recurso visual da aplicação
```

## Dados e manutenção

Os principais parâmetros ficam em [lib/onepiece.ts](lib/onepiece.ts):

```ts
export const DEFAULT_LATEST_ANIME_EPISODE = 1176;
export const LATEST_MANGA_CHAPTER = 1191;
export const MINUTES_PER_EPISODE = 20;
```

O episódio do anime é buscado automaticamente na Jikan API. O valor de
`DEFAULT_LATEST_ANIME_EPISODE` funciona como fallback caso a API esteja
indisponível. O capítulo mais recente do mangá ainda é mantido manualmente e
deve ser atualizado quando houver uma nova publicação.

## Sobre a estimativa do mangá

A correspondência entre episódio e capítulo é proporcional, baseada na relação
entre os valores mais recentes. Ela não substitui uma tabela oficial de
adaptação: o ritmo do anime varia entre sagas, com episódios filler e diferentes
quantidades de páginas adaptadas. Use o capítulo exibido como uma referência
para retomar a leitura, não como um número exato.

## Licença e propriedade intelectual

Este é um projeto independente, criado para fins de estudo e uso pessoal.
**One Piece** e seus elementos relacionados pertencem aos respectivos
detentores de direitos. A aplicação não é afiliada à Eiichiro Oda, à Toei
Animation ou a qualquer entidade oficial da franquia.
