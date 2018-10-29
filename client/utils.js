const localStorageSet = (item, value) => {
  window.localStorage.setItem(item, value);
};

const getImages = () => {
  return JSON.parse(window.localStorage.getItem('images'));
};

const getStartAndEnd = () => {
  return [
    +window.localStorage.getItem('start'),
    +window.localStorage.getItem('end')
  ];
};

module.exports = {
  localStorageSet,
  getImages,
  getStartAndEnd
};
