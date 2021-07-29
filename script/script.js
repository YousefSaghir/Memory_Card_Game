const duration = 1000;
let numScore = 100;
let attempts = 0;
document.querySelector(".num-score").innerHTML = numScore;
const containerGame = document.querySelector(".container-cards");

const windowHeight =
  window.innerHeight - document.querySelector(".header-info").offsetHeight;

const cards = Array.from(document.querySelectorAll(".card"));
// cards.forEach((card,index )=> card.setAttribute('style',`transition-delay: ${duration * index}`));
// function generate random numbers no-repeat

const GenerateRandomNumbers = (max) => {
  let orderNumbers = new Set();
  for (let i = 1; ; i++) {
    let random = Math.floor(Math.random() * max + 1);
    orderNumbers.add(random);

    if (orderNumbers.size == max) {
      break;
    }
  }
  return orderNumbers;
};

const grn = [...GenerateRandomNumbers(cards.length)];
cards.map((card, index) => {
  card.setAttribute(
    "style",
    `order : ${grn[index]}; transition-delay: ${duration + index * 25}ms`
  );
});

document.querySelector(".start").addEventListener("click", function () {
  this.parentElement.remove();
  const user = prompt("write Your Name");
  document.querySelector(".username").innerText =
    user.toLocaleUpperCase() || "UNKNOW";
  document.querySelector(".username-win").innerText =
    user.toLocaleUpperCase() || "UNKNOW";

  setTimeout(() => {
    cards.forEach((card) => card.classList.remove("open-second"));
   
    setTimeout(()=>document.querySelector('.girare-le-carte').play(),duration)
  }, duration * 1.5);
});
document.querySelector(".replay").addEventListener("click", function () {
  location.reload();
});



containerGame.style.height = `${windowHeight}px`;
window.addEventListener("resize", () => {
  const windowHeight =
    window.innerHeight - document.querySelector(".header-info").offsetHeight;

  containerGame.style.height = `${windowHeight}px`;
});

cards.forEach((card) => {
  card.addEventListener("click", function () {
    // add click event
    this.style.transitionDelay = "0s";

    // add class flipped
    this.classList.add("flipped");
    // check class flipped
    const hasClassFlipped = cards.filter((card) =>
      card.classList.contains("flipped")
    );

    // check if the length's hasClassFlipped has 2
    if (hasClassFlipped.length == 2) {
      // add class stop of contanier cards
      containerGame.classList.add("stop");
      // remove class stop of contanier cards after 1 second
      setTimeout(() => {
        containerGame.classList.remove("stop");
      }, duration);

      //  function check if the tow picture are same
      checkSame(hasClassFlipped);
    }
    // search in cards who has the class are the same
    const haswind = cards.filter((card) =>
      card.classList.contains("are-the-same")
    );
    //  check if the length agual the length cars
    if (haswind.length == cards.length) {
      // add class stop of contanier cards
      containerGame.classList.add("stop");
      setTimeout(() => {
        document
          .querySelector(".win")
          .setAttribute("style", "height:100%; visibility: visible");
      }, duration);
const perffect = `congratulations you are win :)`;
const medium = `compliments you are win :)`;
const normal = `game over :|`;
document
          .querySelector(".you-win").innerText = `${numScore >= 70 ? perffect : numScore > 55 ? normal : medium}`;
document
          .querySelector(".your-score-complate").innerText = `your score : ${numScore }%`;
document
          .querySelector(".you-tried").innerText = `your made : ${attempts } attempts `;
          document.querySelector('.game-complate').play(); 
    }
    if (numScore == 15) {
      console.log("game over");
    }
  });
});

// function for the check if the two cards opened they are same
const checkSame = (hasClassFlipped) => {
  // check if the two cards opened they are same
  if (
    hasClassFlipped[0].firstElementChild.dataset.lang ==
    hasClassFlipped[1].firstElementChild.dataset.lang
  ) {
    hasClassFlipped[0].classList.remove("flipped");
    hasClassFlipped[1].classList.remove("flipped");
    hasClassFlipped[0].classList.add("are-the-same");
    hasClassFlipped[1].classList.add("are-the-same");
    document.querySelector('.carte-giuste').play();
    attempts ++;
  } else {
    setTimeout(() => {
      hasClassFlipped[0].classList.remove("flipped");
      hasClassFlipped[1].classList.remove("flipped");
      document.querySelector('.carte-non-giuste').play();
    }, duration);
    attempts ++;
    numScore -= 3;
    document.querySelector(".num-score").innerHTML = numScore;
  }
};
