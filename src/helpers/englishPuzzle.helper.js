import paintings from '@/data/paintings.data';
import { application, pictureSrc, apiAddress } from '@/helpers/constants.helper';

export function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function checkIsSentenceInArray(array, id) {
  return !!array.find((item) => item.id === id);
}

export class CurrentRoundStats {
  constructor(lvl, page, arr) {
    this.lvl = lvl;
    this.page = page;
    this.arr = arr;
    this.date = Date.now();
  }
}

export function getPicture(level, round) {
  const id = `${level}_${round}`;
  const painting = paintings.find((item) => item.id === id);
  const imageSrc = `${pictureSrc}${painting.imageSrc}`;
  const cutSrc = `${pictureSrc}${painting.cutSrc}`;
  const description = `${painting.author} - ${painting.name} (${painting.year})`;
  return { imageSrc, description, cutSrc };
}

export async function getWordsByLevelAndRound({ level, round, sentencePerRound }) {
  const group = level - 1;
  const page = round - 1;
  let words;
  const response = await fetch(
    `${apiAddress}words?group=${group}&page=${page}&wordsPerExampleSentenceLTE=10&wordsPerPage=${sentencePerRound}`,
    {
      method: 'GET',
      withCredentials: true,
      headers: { Accept: application, 'Content-Type': application },
    },
  );
  if (response.ok) {
    words = await response.json();
  } else {
    throw new Error('Something went wrong');
  }
  return words;
}
