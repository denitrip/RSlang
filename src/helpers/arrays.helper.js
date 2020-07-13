function getWord(randomWords, array) {
  const word = array[Math.floor(Math.random() * 600)];
  if (randomWords.includes(word)) {
    return getWord(randomWords, array);
  }
  return word;
}

export default function getRandomWordsArray(array, wordsCount) {
  const randomWords = [];
  for (let i = 0; i < wordsCount; i += 1) {
    randomWords.push(getWord(randomWords, array));
  }
  return randomWords;
}
