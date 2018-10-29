const { localStorageSet, getImages, getStartAndEnd } = require('./utils');

document.addEventListener('DOMContentLoaded', () => {
  buildHTML();
});

const clickImage = image => {
  const modal = document.getElementById('modal');
  while (modal.firstChild) {
    modal.removeChild(modal.firstChild);
  }
  const img = document.createElement('img');
  img.src = `https://farm${image.farm}.staticflickr.com/${image.server}/${
    image.id
  }_${image.secret}_z.jpg`;
  modal.appendChild(img);
  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'close-button';
  button.className = 'btn-btn-light';
  button.innerText = 'Close';
  button.onclick = () => clickClose();
  modal.appendChild(button);
  modal.style.visibility = 'visible';
};

const buildHTML = async () => {
  try {
    let response = await fetch('api/');
    let data = await response.json();
    localStorageSet('images', JSON.stringify(data));
    localStorageSet('start', '0');
    localStorageSet('end', 10);
    let [start, end] = getStartAndEnd();
    const ulDiv = document.getElementById('ul');
    ulDiv.style.textAlign = 'center';
    const allImages = getImages();
    let images = allImages.photos.photo.slice(start, end);
    images.forEach(image => {
      const img = document.createElement('img');
      img.className = 'carousel-image';
      img.src = `https://farm${image.farm}.staticflickr.com/${image.server}/${
        image.id
      }_${image.secret}_s.jpg`;
      img.onclick = () => clickImage(image);
      ulDiv.appendChild(img);
    });
  } catch (e) {
    console.error('Error displaying photos', e.message);
  }
};

const nextButtonClick = () => {
  let [oldStart, oldEnd] = getStartAndEnd();
  if (oldStart === 30) {
    nextButton.style.visibility = 'hidden';
  }
  const prevButton = document.getElementById('prev-button');
  prevButton.style.visibility = 'visible';
  const ulDiv = document.getElementById('ul');
  while (ulDiv.firstChild) {
    ulDiv.removeChild(ulDiv.firstChild);
  }
  localStorageSet('start', `${oldStart + 10}`);
  localStorageSet('end', `${oldEnd + 10}`);
  const allImages = getImages();
  let [start, end] = getStartAndEnd();
  let images = allImages.photos.photo.slice(start, end);
  images.forEach(image => {
    let img = document.createElement('img');
    img.className = 'carousel-image';
    img.src = `https://farm${image.farm}.staticflickr.com/${image.server}/${
      image.id
    }_${image.secret}_s.jpg`;
    img.onclick = () => clickImage(image);
    ulDiv.appendChild(img);
  });
};

const prevButtonClick = () => {
  let [oldStart, oldEnd] = getStartAndEnd();
  if (oldStart === 10) {
    prevButton.style.visibility = 'hidden';
  }
  nextButton.style.visibility = 'visible';
  const ulDiv = document.getElementById('ul');
  while (ulDiv.firstChild) {
    ulDiv.removeChild(ulDiv.firstChild);
  }
  localStorageSet('start', `${oldStart - 10}`);
  localStorageSet('end', `${oldEnd - 10}`);
  const allImages = getImages();
  let [start, end] = getStartAndEnd();
  let images = allImages.photos.photo.slice(start, end);
  images.forEach(image => {
    let img = document.createElement('img');
    img.className = 'carousel-image';
    img.src = `https://farm${image.farm}.staticflickr.com/${image.server}/${
      image.id
    }_${image.secret}_s.jpg`;
    img.onclick = () => clickImage(image);
    ulDiv.appendChild(img);
  });
};

const clickClose = () => {
  const modal = document.getElementById('modal');
  modal.style.visibility = 'hidden';
};

const nextButton = document.getElementById('next-button');
nextButton.onclick = () => nextButtonClick();

const prevButton = document.getElementById('prev-button');
prevButton.onclick = () => prevButtonClick();
