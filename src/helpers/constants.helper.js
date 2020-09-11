import i18n from '@/i18n';

const gitContent = 'https://raw.githubusercontent.com/arcanar7/';
export const application = 'application/json';
export const apiAddress = 'https://rslang-team16.herokuapp.com/';
export const dataSrc = `${gitContent}rslang-data/master/`;
export const pictureSrc = `${gitContent}rslang_data_paintings/master/`;
export const correctSound = `${dataSrc}/files/correct.mp3`;
export const errorSound = `${dataSrc}/files/error.mp3`;
export const errorMessage = i18n.t('constants.errorMessage');
export const loginErrorMessage = i18n.t('constants.loginErrorMessage');
export const wordGroups = {
  learned: 'learned',
  difficult: 'difficult',
  deleted: 'deleted',
};
export const keys = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  enter: 'Enter',
  left: 'ArrowLeft',
  right: 'ArrowRight',
};
export const wordDeletedMessage = i18n.t('constants.wordDeletedMessage');
export const maxRoundStatsCount = 10;
export const todayLearnedString = 'Statistic/todayLearned';
export const videoLink = 'https://www.youtube.com/embed/3-mPN4cvRYY';
