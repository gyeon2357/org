var taja = [
  "출생신고",
  "모든 아동",
  "난민아동",
  "이주아동",
  "보편적출생신고제도",
  "기본권",
  "출생 후 즉시 등록",
  "정체성",
  "아동권리의 시작점",
  "생일",
];

var tajaContents = document.getElementById("tajaContents");

// 기존에 있던 newObj 를 setConstructor 로 변경했습니다.
var setConstructor = [];

// setInterval 의 시간으로 사용할 상수입니다.
const DOWNTIME = 2500;

// 생명 변수
var life = 10;
var lifeDiv = document.getElementById("life");
// lifeDiv.innerHTML = "생명: " + life;

// 점수 변수
var score = 0;
var scoreDiv = document.getElementById("score");
scoreDiv.innerHTML = score + " / 10";

// taja배열의 index 값에 대한 변수
var idx = 0;

// 버튼
const printButton = document.querySelector("#download");
printButton.addEventListener("click", () => {
  printJS({
    printable: "https://gyeon.org/practice/basic/duroo10th/type/assets/print/dr-1.pdf",
    type: "pdf",
    showModal: false,
    // style: `@page { margin: 0mm; size: 80m 80m; } @media print { body { margin: 0mm; width: 80mm; height: 80mm } }`,
  });
});

// 화면에 일정 간격으로 그려주는 메서드입니다.
function drawTaja() {
  var randomPick = 0;
  var temp = null;

  // 랜덤으로 taja배열을 섞어주기 위한 for문
  for (let i = 0; i < taja.length; i++) {
    randomPick = Math.round(Math.random() * (taja.length - 1));
    temp = taja[randomPick];
    taja[randomPick] = taja[i];
    taja[i] = temp;
  }

  // 일정한 간격으로 setConstructor 배열에 객체를 넣어주었습니다.
  var drawInterval = setInterval(function () {
    setConstructor.push(
      new TajaConstructor({
        tajaContent: taja[idx++],
      })
    );
    // 화면에 모든 단어가 뿌려지면 더이상 객체를 생성해서 setConstructor 배열에 담지 않습니다.
    if (setConstructor.length === taja.length) {
      clearInterval(drawInterval);
    }
  }, DOWNTIME);
}

// 생성자 메서드입니다.
function TajaConstructor(obj) {
  // 받아온 taja배열의 내용을 담아넣은 변수입니다.
  this.tajaContent = obj.tajaContent;

  this.leftWidth = Math.round(Math.random() * 1200);
  this.tajaDiv = document.createElement("div");
  this.tajaDiv.classList.add("tajaWord");
  this.tajaDiv.style.position = "absolute";
  this.tajaDiv.innerHTML = this.tajaContent;

  tajaContents.appendChild(this.tajaDiv);
  // random으로 정한 left가 범위 바깥으로 나가지 않게 위한 설정입니다.
  if (this.leftWidth + this.tajaDiv.offsetWidth >= tajaContents.offsetWidth) {
    this.tajaDiv.style.left = this.leftWidth - this.tajaDiv.offsetWidth + "px";
  } else {
    this.tajaDiv.style.left = this.leftWidth + "px";
  }

  // switch-case 문을 이용하여 난수를 발생시켜 랜덤하게 기능이 발생하도록 하였습니다.
  switch (Math.round(Math.random() * 4)) {
    case 0:
      easyDown(this.tajaDiv);
      break;
    case 1:
      speedDown(this.tajaDiv);
      break;
    case 2:
      zigzagDown(this.tajaDiv);
      break;
    case 3:
      rightDown(this.tajaDiv);
      break;
    case 4:
      leftDown(this.tajaDiv);
      break;
  }

  // 이부분은 입력한 단어를 enter 키를 입력하였을 때, 화면에 뿌려져있는 단어와 일치한다면
  // 해당 단어의 div를 제거 해주기 위한 설정입니다.
  TajaConstructor.prototype.destroyTaja = function () {
    tajaContents.removeChild(this.tajaDiv);
  };
}

// 느리게 내려오기
function easyDown(tajaArg) {
  // 받아온 this.tajaDiv를 이용합니다.
  var topVal = 0;
  setInterval(function () {
    tajaArg.style.top = topVal + "px";

    // 글자의 범위가 경계 바깥으로 나갔을 경우 제거
    if (topVal + tajaArg.offsetHeight >= tajaContents.offsetHeight) {
      if (tajaContents.contains(tajaArg)) {
        tajaContents.removeChild(tajaArg);
        life--;
        // lifeDiv.innerHTML = "생명: " + life;

        // 목숨을 모두 잃었을 때 - 실패
        if (life === 0) {
          // alert("5개의 생명을 모두 사용하셨습니다.");
          // alert("총 " + score + "점을 획득하였습니다.");
          // location.reload();
        }

        // life가 남은상태로 게임이 끝났을 경우 - 성공
        if (setConstructor.length === taja.length) {
          // 화면에 단어가 다 뿌려진 이후
          if (!tajaContents.hasChildNodes()) {
            // 뿌려진 단어가 화면에 존재하지 않을 경우

            // alert("👏👏 성공했습니다!");
            printJS({
              printable:
                "https://gyeon.org/practice/basic/duroo10th/type/assets/print/dr-1.pdf",
              type: "pdf",
              showModal: false,
            });
            printButton.style.display = "block";

            // location.reload();
          }
        }
      }
    }
    topVal += 15;
  }, DOWNTIME * 2);
}

// 빠르게 내려오기 , easyDown()메서드와는 setInteval()의 시간으로 설정한 부분만 다릅니다.
function speedDown(tajaArg) {
  var topVal = 15;
  setInterval(function () {
    tajaArg.style.top = topVal + "px";

    // 글자의 범위가 경계 바깥으로 나갔을 경우 제거
    if (topVal + tajaArg.offsetHeight >= tajaContents.offsetHeight) {
      if (tajaContents.contains(tajaArg)) {
        tajaContents.removeChild(tajaArg);
        life--;
        // lifeDiv.innerHTML = "생명: " + life;

        // 목숨을 모두 잃었을 때 - 실패
        if (life === 0) {
          // alert("5개의 생명을 모두 사용하셨습니다.");
          // alert("총 " + score + "점을 획득하였습니다.");
          // location.reload();
        }

        // life가 남은상태로 게임이 끝났을 경우 - 성공
        if (setConstructor.length === taja.length) {
          // 화면에 단어가 다 뿌려진 이후
          if (!tajaContents.hasChildNodes()) {
            // 뿌려진 단어가 화면에 존재하지 않을 경우

            // alert("👏👏 성공했습니다!");
            printJS({
              printable:
                "https://gyeon.org/practice/basic/duroo10th/type/assets/print/dr-1.pdf",
              type: "pdf",
              showModal: false,
            });
            printButton.style.display = "block";
            // alert("총 " + score + "점을 획득하였습니다.");
            // location.reload();
          }
        }
      }
    }
    topVal += 15;
  }, DOWNTIME / 2);
}

// 지그재그로 내려오기
function zigzagDown(tajaArg) {
  var topVal = 15;
  var direction = 0;
  var zigzagVal = 15;
  var count = 0;

  setInterval(function () {
    tajaArg.style.top = topVal + "px";

    direction = tajaArg.offsetLeft + zigzagVal;
    tajaArg.style.left = direction + "px";
    count++;
    // 글자가 왼쪽 벽에 붙었을 경우 반대방향으로 바꿔 줌
    if (tajaArg.offsetLeft <= 0) {
      tajaArg.style.left = 0 + "px";
      zigzagVal = -zigzagVal;
      count = 0;
      // 글자가 오른쪽 벽에 붙었을 경우 반대방향으로 바꿔 줌
    } else if (
      tajaArg.offsetLeft + tajaArg.offsetWidth >=
      tajaContents.offsetWidth
    ) {
      tajaArg.style.left =
        tajaContents.offsetWidth - (tajaArg.offsetWidth + 50) + "px";
      zigzagVal = -zigzagVal;
      count = 0;
      // 글자가 3번 이동하였으면 반대방향으로 바꿔 줌
    } else if (count === 3) {
      zigzagVal = -zigzagVal;
      count = 0;
    }

    // 글자의 범위가 경계 바깥으로 나갔을 경우 제거
    if (topVal + tajaArg.offsetHeight >= tajaContents.offsetHeight) {
      if (tajaContents.contains(tajaArg)) {
        tajaContents.removeChild(tajaArg);
        life--;
        // lifeDiv.innerHTML = "생명: " + life;

        // 목숨을 모두 잃었을 때 - 실패
        if (life === 0) {
          // alert("5개의 생명을 모두 사용하셨습니다.");
          // alert("총 " + score + "점을 획득하였습니다.");
          // location.reload();
        }

        // life가 남은상태로 게임이 끝났을 경우 - 성공
        if (setConstructor.length === taja.length) {
          // 화면에 단어가 다 뿌려진 이후
          if (!tajaContents.hasChildNodes()) {
            // 뿌려진 단어가 화면에 존재하지 않을 경우

            // alert("👏👏 성공했습니다!");
            printJS({
              printable:
                "https://gyeon.org/practice/basic/duroo10th/type/assets/print/dr-1.pdf",
              type: "pdf",
              showModal: false,
            });
            printButton.style.display = "block";
            // alert("총 " + score + "점을 획득하였습니다.");
            // location.reload();
          }
        }
      }
    }
    topVal += 15;
  }, DOWNTIME);
}

// 오른쪽 사선으로 내려오기
function rightDown(tajaArg) {
  var topVal = 15;
  var direction = 0;
  var leftVal = 30;

  setInterval(function () {
    tajaArg.style.top = topVal + "px";

    direction = tajaArg.offsetLeft + leftVal;
    tajaArg.style.left = direction + "px";

    // 글자가 오른쪽 벽에 붙었을 경우 왼쪽으로 이동
    if (tajaArg.offsetLeft + tajaArg.offsetWidth >= tajaContents.offsetWidth) {
      tajaArg.style.left =
        tajaContents.offsetWidth - (tajaArg.offsetWidth + 50) + "px";
      leftVal = -leftVal;
    }

    // 글자의 범위가 경계 바깥으로 나갔을 경우 제거
    if (topVal + tajaArg.offsetHeight >= tajaContents.offsetHeight) {
      if (tajaContents.contains(tajaArg)) {
        tajaContents.removeChild(tajaArg);
        life--;
        // lifeDiv.innerHTML = "생명: " + life;

        // 목숨을 모두 잃었을 때 - 실패
        if (life === 0) {
          // alert("5개의 생명을 모두 사용하셨습니다.");
          // alert("총 " + score + "점을 획득하였습니다.");
          // location.reload();
        }

        // life가 남은상태로 게임이 끝났을 경우 - 성공
        if (setConstructor.length === taja.length) {
          // 화면에 단어가 다 뿌려진 이후
          if (!tajaContents.hasChildNodes()) {
            // 뿌려진 단어가 화면에 존재하지 않을 경우

            // alert("👏👏 성공했습니다!");
            printJS({
              printable:
                "https://gyeon.org/practice/basic/duroo10th/type/assets/print/dr-1.pdf",
              type: "pdf",
              showModal: false,
            });
            printButton.style.display = "block";
            // alert("총 " + score + "점을 획득하였습니다.");
            // location.reload();
          }
        }
      }
    }
    topVal += 15;
  }, DOWNTIME);
}

// 왼쪽으로 내려가기
function leftDown(tajaArg) {
  var topVal = 15;
  var direction = 0;
  var rightVal = -30;

  setInterval(function () {
    tajaArg.style.top = topVal + "px";

    direction = tajaArg.offsetLeft + rightVal;
    tajaArg.style.left = direction + "px";

    // 글자가 왼족 벽에 붙었을 경우 오른쪽으로 이동
    if (tajaArg.offsetLeft <= 0) {
      tajaArg.style.left = 0 + "px";
      rightVal = -rightVal;
    }

    // 글자의 범위가 경계 바깥으로 나갔을 경우 제거
    if (topVal + tajaArg.offsetHeight >= tajaContents.offsetHeight) {
      if (tajaContents.contains(tajaArg)) {
        tajaContents.removeChild(tajaArg);
        life--;
        // lifeDiv.innerHTML = "생명: " + life;

        // 목숨을 모두 잃었을 때 - 실패
        if (life === 0) {
          // alert("5개의 생명을 모두 사용하셨습니다.");
          // alert("총 " + score + "점을 획득하였습니다.");
          // location.reload();
        }

        // life가 남은상태로 게임이 끝났을 경우 - 성공
        if (setConstructor.length === taja.length) {
          // 화면에 단어가 다 뿌려진 이후
          if (!tajaContents.hasChildNodes()) {
            // 뿌려진 단어가 화면에 존재하지 않을 경우

            // alert("👏👏 성공했습니다!");
            printJS({
              printable:
                "https://gyeon.org/practice/basic/duroo10th/type/assets/print/dr-1.pdf",
              type: "pdf",
              showModal: false,
            });
            printButton.style.display = "block";
            // alert("총 " + score + "점을 획득하였습니다.");
            // location.reload();
          }
        }
      }
    }
    topVal += 15;
  }, DOWNTIME);
}

var tajaText = document.getElementById("tajaText");
tajaText.addEventListener("keydown", function (e) {
  // enter 눌렀을 때
  if (e.keyCode === 13) {
    for (let i = 0; i < setConstructor.length; i++) {
      // 타자 친 단어와 화면의 단어가 일치했을 때
      if (tajaText.value === setConstructor[i].tajaContent) {
        // 해당 단어 출력
        // const innerTyping = document.getElementById("typing-text");
        // innerTyping.after('<p>setConstructor[i].tajaContent</p>');
        $("#typing-text").append(
          "<p class='word'>" + setConstructor[i].tajaContent + "</p> "
        );

        // 해당 단어 제거
        setConstructor[i].destroyTaja();

        score += 1;
        scoreDiv.innerHTML = score + " / 10";

        // 더이상 화면에 뿌려질 단어가 없고
        // life를 다 소진하지않고 clear 했을 경우
        if (setConstructor.length === taja.length) {
          if (!tajaContents.hasChildNodes()) {
            // alert("총 " + score + "점을 획득하였습니다.");
            // location.reload();

            // alert("👏👏 성공했습니다!");
            printJS({
              printable:
                "https://gyeon.org/practice/basic/duroo10th/type/assets/print/dr-1.pdf",
              type: "pdf",
              showModal: false,
            });
            printButton.style.display = "block";
          }
        }
      }
    }

    // enter 눌렀을 때 input 창 초기화
    tajaText.value = "";
  }
});

drawTaja();

// var clickCnt = 0;
// var tajaBtn = document.getElementById("tajaBtn");
// tajaBtn.addEventListener("click", function () {
//   if (clickCnt === 0) {
//     drawTaja();
//   }
//   clickCnt++;
// });
