import images from './database.js';

// SECTION: image setup -------------------------
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal-img');
const modalTitle = document.querySelector('.modal-title');
const galleryContent = document.querySelector('.gallery-content');

images.forEach((image) => {
  const myDiv = document.createElement('div');
  const mySpan = document.createElement('span');
  const myImg = document.createElement('img');

  myDiv.classList.add('image');
  myDiv.setAttribute('data-item', image.brand);
  myDiv.appendChild(mySpan);

  myImg.setAttribute('src', image.src);
  myImg.setAttribute('alt', image.brand + ' | ' + image.year + ' | ' + image.type);

  mySpan.appendChild(myImg);

  galleryContent.appendChild(myDiv);

  myImg.addEventListener('click', () => {
    modal.classList.add('active');
    modalImg.setAttribute('src', image.big);
    modalTitle.innerText = image.brand + ' | ' + image.year + ' | ' + image.type;
  });
});

modal.addEventListener('click', () => {
  modal.classList.remove('active');
});

// SECTION: filter text setup -------------------------
const filterSort = images.sort((a, b) => (a.brand > b.brand ? 1 : -1));
const filterBrand = Array.from(filterSort.reduce((map, obj) => map.set(obj.brand, obj), new Map()).values());

filterBrand.forEach((filter) => {
  const filterSpan = document.createElement('span');
  const filterContainer = document.querySelector('.filter');

  filterSpan.classList.add('filter-text');
  filterSpan.setAttribute('data-filter', filter.brand);
  filterSpan.innerText = filter.brand;

  filterContainer.appendChild(filterSpan);
});

// SECTION: filter images -------------------------
const filterBtn = document.querySelectorAll('.filter-text');
const filterImg = document.querySelectorAll('.image');

for (let i = 0; i < filterBtn.length; i++) {
  // console.log(filterBtn[i]);
  filterBtn[i].addEventListener('click', function () {
    for (let j = 0; j < filterBtn.length; j++) {
      filterBtn[j].classList.remove('current');
    }
    this.classList.add('current');
    let dataFilter = this.getAttribute('data-filter');
    for (let k = 0; k < filterImg.length; k++) {
      // filterImg[k].classList.remove('active');
      filterImg[k].classList.add('hide');

      if (filterImg[k].getAttribute('data-item') == dataFilter || dataFilter == 'all') {
        // filterImg[k].classList.add('active');
        filterImg[k].classList.remove('hide');
      }
    }
  });
}

// SECTION: menu button -------------------------
const menu = document.querySelector('.menu');
const menuContent = document.querySelector('.menu-content');
const menuBtn = document.querySelector('.menu .menu-btn');

menuBtn.addEventListener('click', () => {
  if (menu.classList.contains('show')) {
    // menu.addEventListener('click', () => {});
    menu.classList.remove('show');
    menuContent.classList.remove('show');
  } else {
    menu.classList.add('show');
    menuContent.classList.add('show');
  }
});
