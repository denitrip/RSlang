export default function getRandomWord(word, array) {
  const randomWord = array[Math.floor(Math.random() * 100)];
  if (randomWord.word === word.word) {
    return getRandomWord(word, array);
  }
  return randomWord;
}
