export default {
  deleteBold(str) {
    return str.replace(/<b>|<\/b>/g, '');
  },
  deleteItalic(str) {
    return str.replace(/<i>|<\/i>/g, '');
  },
  deleteWord(str) {
    const start = str.indexOf('<');
    const finish = str.lastIndexOf('>') + 1;
    return `${str.slice(0, start)}[...]${str.slice(finish)}`;
  },
  toDate(value) {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(value).toLocaleString('en-US', options);
  },
  knowStats(array) {
    let know = 0;
    array.forEach((item) => {
      if (item.know) {
        know += 1;
      }
    });
    return know;
  },
  dontKnowStats(array) {
    let iDontKnow = 0;
    array.forEach((item) => {
      if (!item.know) {
        iDontKnow += 1;
      }
    });
    return iDontKnow;
  },
};
