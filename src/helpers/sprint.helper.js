export default function getRandomWord(word, array) {
  const randomWord = word;
  const elNum = Math.floor(Math.random() * array.length);

  randomWord.option = elNum % 2 === 0 ? array[elNum].wordTranslate : word.wordTranslate;

  return randomWord;
}
