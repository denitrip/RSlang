import { application, apiAddress } from '@/helpers/constants.helper';

export default async function getWordsByLevelAndRound(group, page) {
  let words;
  const response = await fetch(`${apiAddress}words?group=${group}&page=${page}`, {
    method: 'GET',
    withCredentials: true,
    headers: { Accept: application, 'Content-Type': application },
  });
  if (response.ok) {
    words = await response.json();
  } else {
    throw new Error('Something went wrong');
  }
  return words;
}
