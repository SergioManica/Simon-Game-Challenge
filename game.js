// @ts-check
const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

function nextSequence() {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // @ts-ignore
  // fadeOut() e fadeIn() são metodos de animação do Jquery
  $("#" + randomChosenColour)
    .fadeOut()
    .fadeIn();
  //console.log(randomChosenColour);
  playSound(randomChosenColour);
  level++;
  // Estou usando o if para não dar erro de tipaagem do typeScript, pois o valor o elemento html pode ser nulo.
  const title = document.querySelector("h1");
  if (title) {
    title.innerHTML = `level ${level}`;
  }
}

function playSound(name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColourElement) {
  currentColourElement.classList.add("pressed");
  // setTimeout utiliza uma função de callback como primeiro parametro e o tempo em milisegundos como segundo parametro
  setTimeout(() => {
    currentColourElement.classList.remove("pressed");
  }, 100);
}

// querySelectorAll seleciona todos os elementos e os coloca dentro de um array, neste caso só atribuio array a variavel "array".
const array = document.querySelectorAll(".btn");
//addEventListener usa o evento como primeiro parametro e uma função de callback como segundo parametro
array.forEach((element) => {
  element.addEventListener("click", function () {
    const userChosenColour = this.id;
    //console.log(userChosenColour)
    playSound(userChosenColour);
    animatePress(this);
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern[userClickedPattern.length - 1])
    checkAnswer(userClickedPattern.length - 1, userChosenColour);
  });
});

document.addEventListener("keydown", function () {
  if (level === 0) {
    nextSequence();
  }
});

function checkAnswer(currentIndexPattern, pressedButton) {
  if (pressedButton === gamePattern[currentIndexPattern]) {
    console.log("Success");
    const isLastItem = currentIndexPattern === gamePattern.length - 1;
    if (isLastItem) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    console.log("wrong");
    const audio = new Audio(`sounds/wrong.mp3`);
    audio.play();
    const body = document.querySelector("body");
    if (body) {
      body.classList.add("game-over");
      setTimeout(function () {
        body.classList.remove("game-over");
      }, 200);
    }
    const title = document.querySelector("h1");
    if (title) {
      title.innerHTML = "Game Over, Press Any Key to Restart";
    }
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
