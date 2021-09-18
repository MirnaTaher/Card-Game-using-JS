//getting the children of the board which we would later assign the cards to randomly
var board = document.getElementById("board");
let cardChildren = Array.from(board.children);
var congrats = document.getElementById("congrats");
var selectedTrue;
var playAgain = document.getElementById("play-again");

//making an array of urls for the photos, each one repeated twice
//the relative paths is relative to the index.html file not script.js file because we will later equal it to the
// src attribute in the img tag
let arrOfImgs = [
  '<img src="img/images (1).png">',
  '<img src="img/images (2).png">',
  '<img src="img/images (3).png">',
  '<img src="img/images (4).png">',
  '<img src="img/images.png">',
  '<img src="img/images.jpg">',
  '<img src="img/images (1).png">',
  '<img src="img/images (2).png">',
  '<img src="img/images (3).png">',
  '<img src="img/images (4).png">',
  '<img src="img/images.png">',
  '<img src="img/images.jpg">',
];
//making an index using Math.floor(Math.random()*index) to create indexes from 0 to 11 randomly
//each selected element inside the array would be replaced with the number of the corresponding
//cardChildren to be ignored the next round
function shuffle(arrOfImgs) {
  let currentIndex = arrOfImgs.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arrOfImgs[currentIndex], arrOfImgs[randomIndex]] = [
      arrOfImgs[randomIndex],
      arrOfImgs[currentIndex],
    ];
  }

  return arrOfImgs;
}

shuffle(arrOfImgs);
//passing the randomly shuffled array to the array of images that we show in the card game
cardChildren.forEach(function (element, index) {
  element.innerHTML = arrOfImgs[index];
});

//making the opacity = 0 for the picture when it starts (and it has the class selected-false)
var showAndHide = function () {
  for (let i in cardChildren) {
    if (Array.from(cardChildren[i].classList).includes("selected-false")) {
      cardChildren[i].children[0].style.opacity = "0";
    } else if (
      Array.from(cardChildren[i].classList).includes("selected-true")
    ) {
      cardChildren[i].children[0].style.opacity = "1";
    } else if (Array.from(cardChildren[i].classList).includes("done")) {
      cardChildren[i].style.opacity = "0";
    }
  }
};
//this is the start conditions for the game each time
var defaultSelectedFalse = function () {
  for (let i in cardChildren) {
    cardChildren[i].classList.remove("selected-true");
    cardChildren[i].classList.remove("done");
    cardChildren[i].classList.add("selected-false");
    cardChildren[i].children[0].style.opacity = "0";
    cardChildren[i].style.opacity = "1";
  }
};
//we call it first time before the event listener because we want to hide the images when the game starts
showAndHide();

//this returns an array so i need to check the length
var checkIfMatch = function () {
  selectedTrue = Array.from(document.getElementsByClassName("selected-true"));
  //first checks if we selected two images from the game
  if (selectedTrue.length === 2) {
    //want to hide the parent div
    //if the two have the same inner html which we added above, then we remove the class selected-true
    //and add the class done, which has opacity=0 for the parent div (that has a pink background)
    if (selectedTrue[0].innerHTML === selectedTrue[1].innerHTML) {
      for (i = 0; i < 2; i++) {
        selectedTrue[i].classList.remove("selected-true");
        selectedTrue[i].classList.add("done");
      }
    } else {
      for (i = 0; i < 2; i++) {
        selectedTrue[i].classList.remove("selected-true");
        selectedTrue[i].classList.add("selected-false");
      }
    }
  }
};
//if he won the game
var allDone = function () {
  var done = Array.from(document.getElementsByClassName("done"));
  if (done.length === 12) {
    congrats.style.display = "block";
    board.style.display = "none";
  }
};
//what happens when we click on play again
playAgain.addEventListener("click", resetBoard);

function resetBoard() {
  board.style.display = "flex";
  congrats.style.display = "none";
  shuffle(arrOfImgs);
  cardChildren.forEach(function (element, index) {
    element.innerHTML = arrOfImgs[index];
  });
  defaultSelectedFalse();
}

//event listener on the divs holding the pictures
cardChildren.forEach(function (element, index) {
  element.addEventListener("click", function () {
    cardChildren[index].classList.remove("selected-false");
    cardChildren[index].classList.add("selected-true");
    showAndHide();
    checkIfMatch();
    allDone();
  });
});
