$(document).ready(function () {
  // $("#name").focus();
  // $("#name").tabIndex = 0;
  setTimeout(function () {
    $("#name").focus();
  }, 10);
  $("#backg").attr("loop", "true");
});

console.log(document.activeElement);

// var backg = document.getElementById("backg");
// if (typeof backg.loop == "boolean") {
//   // loop supported
//   backg.loop = true;
// } else {
//   // loop property not supported
//   backg.on(
//     "ended",
//     function () {
//       this.currentTime = 0;
//       this.play();
//     },
//     false
//   );
// }
// backg.play();

// input txt
function printName() {
  const name = document.getElementById("name").value;
  document.getElementById("result").innerText = name;
}

// enter
var input = document.getElementById("name");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("print-btn").click();
  }
});
