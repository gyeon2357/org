const Game_Time = 999;
let score = 0;
let num = -1;
let time = Game_Time;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];

const wordInput = document.querySelector(".word-input");
const wordDisplay = document.querySelector(".word-display");
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector(".button");
const message = document.querySelector(".message");
const printButton = document.querySelector("#download-btn2");
const printButton2 = document.querySelector("#download-btn1");

init();

function init() {
  buttonChange("게임 시작!");
  getWords();
  wordInput.classList.add("disabled");
}

//게임 실행

button.onclick = () => {
  run();
  score = 0;

  wordInput.addEventListener("input", checkMatch);
};

function run() {
  if (isPlaying) {
    return;
  }
  isPlaying = true;
  // time = Game_Time;
  wordInput.focus();
  scoreDisplay.innerText = 0;

  // timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkStatus, 50);
  buttonChange("진행중...");
  wordInput.classList.remove("disabled");
  message.innerHTML = "";
}

function checkStatus() {
  // if (!isPlaying && time === 0) {
  if (score == 9) {
    buttonChange("게임 시작!");
    clearInterval(checkInterval);
    wordInput.value = "";
    wordInput.blur();
    wordInput.classList.add("disabled");
    message.innerHTML = "게임 종료!";

    printButton.style.display = "block";
    printJS({
    printable: "https://gyeon.org/practice/basic/duroo10th/type/assets/print/dr-1.pdf",
    type: "pdf",
    showModal: false,
  });
  }
}

//단어 불러오기
function getWords() {
  axios
    .get("./assets/js/word")
    .then(function (response) {
      response.data.forEach((word) => {
        words.push(word);
        // if (word.length < 120) {
        //   words.push(word);
        // }
      });

      buttonChange("게임 시작!");

      // words = response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

//단어 일치 체크
function checkMatch() {
  if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
    wordInput.value = "";

    message.innerHTML =
      "<img src='../../assets/images/type/sentence-answer.svg'>";

    if (!isPlaying) {
      return;
    }
    score++;
    // time = Game_Time;
    scoreDisplay.innerText = score;
    // const randomIndex = Math.floor(Math.random() * words.length);

    const count = ++num;
    wordDisplay.innerText = words[count];
  }
}

function countDown() {
  time > 0 ? time-- : (isPlaying = false);
  if (!isPlaying) {
    clearInterval(timeInterval);
  }
  timeDisplay.innerText = time;
}

function buttonChange(text) {
  button.innerText = text;
  text === "시작"
    ? button.classList.remove("loading")
    : button.classList.add("loading");
}

printButton.addEventListener("click", () => {
  printJS({
    printable: "https://gyeon.org/practice/basic/duroo10th/type/assets/print/dr-2.pdf",
    type: "pdf",
    showModal: false,
  });
});

printButton2.addEventListener("click", () => {
  printJS({
    printable: "https://gyeon.org/practice/basic/duroo10th/type/assets/print/dr-2.pdf",
    type: "pdf",
    showModal: false,
  });
});

// message
let observer = new MutationObserver((mutations) => {
  setTimeout(function () {
    $(".message").find("img").fadeOut(500);
  }, 700);
});

let option = {
  attributes: true,
  childList: true,
  characterData: true,
};

observer.observe(message, option);

// focus
document.body.focus();

// button
$(".button").one("click", function () {
  $(".word-display").css("opacity", "1");
  $("textarea").css("opacity", "1");
  $("textarea").focus();
  $(this).css("opacity", ".4");
});
