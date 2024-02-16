let allimages = [
  "C01.jpg",
  "CC2Q.jpg",
  "D01.jpg",
  "DC2Q.jpg",
  "H01.jpg",
  "HC2Q.jpg",
  "S01.jpg",
  "SC2Q.jpg",
  "CC1J.jpg",
  "CC3K.jpg",
  "DC1J.jpg",
  "DC3K.jpg",
  "HC1J.jpg",
  "HC3K.jpg",
  "SC1J.jpg",
  "SC3K.jpg",
];
const n = 8;
let images = allimages.sort(() => 0.5 - Math.random()).slice(0, n);
let items = [...images, ...images];
function shuffle(a) {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
items = shuffle(items);
console.log(items);

let itemsPath = "img/cards/";
let itemsContainer = document.getElementById("items-container");
let articleItem = document.getElementsByClassName("flip-card");
let flipCardInner = document.getElementsByClassName("flip-card-inner");
let flipCardResult = document.getElementsByClassName("flip-card-back");
let clicked = [];

function createItemArticle() {
  let articleContainer = "";

  for (let i = 0; i < items.length; i++) {
    let itemArticle = `<div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img src='img/back-card.png'>
      </div>
      <div class="flip-card-back">
        <img src='${itemsPath + items[i]}'>
      </div>
    </div>
  </div>`;
    articleContainer += itemArticle;
  }
  itemsContainer.innerHTML = articleContainer;
}

createItemArticle();

let previousItem = "";
let previousValue = "";
let clickNumb = 1;
let timer = 0;
let ifCardIsFliping = false;

for (let i = 0; i < items.length; i++) {
  articleItem[i].addEventListener("click", function () {
    if (ifCardIsFliping) return;

    if (!flipCardInner[i].classList.contains("active")) {
      flipCardInner[i].classList.add("active");

      if (clickNumb === 2) {
        if (previousValue.innerHTML === flipCardResult[i].innerHTML) {
          clicked.push(articleItem[i], previousItem);
        } else {
          ifCardIsFliping = true;
          clearTimeout(timer);
          timer = setTimeout(() => {
            previousItem.classList.remove("active");
            flipCardInner[i].classList.remove("active");
            ifCardIsFliping = false;
          }, 1000);
        }
        clickNumb = 0;
      } else {
        previousItem = flipCardInner[i];
        previousValue = flipCardResult[i];
      }
      clickNumb++;
    }
    if (clicked.length === items.length) {
      document.getElementById("victory").classList.add("show-up");
      clearInterval(countDown);
      reload();
    }
  });
}

let totalSeconds = 60;

let countDown = setInterval(() => {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds - minutes * 60;

  let minElement = `<span>0${minutes}</span>`;
  let secElement =
    totalSeconds <= 20
      ? `<span class="animate">${seconds < 10 ? "0" + seconds : seconds}</span>`
      : `<span>${seconds < 10 ? "0" + seconds : seconds}</span>`;

  if (totalSeconds >= 0) {
    document.getElementById(
      "timer"
    ).innerHTML = `${minElement} : ${secElement}`;
    totalSeconds--;
  } else {
    clearInterval(countDown);
    document.getElementById("game-over").classList.add("show-up");
    document.getElementById("wraper-container").classList.add("disable-click");
    reload();
  }
}, 1000);

function reload() {
  setTimeout(() => {
    location.reload();
  }, 3500);
}
