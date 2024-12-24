function setup() {
  frameRate(1);
}

window.onload = function () {
  var clock = document.getElementById("clock");
  function pad(num, size) {
    num = String(num);
    return new Array(size + 1 - num.length).join("0") + num;
  }
  
  function displayTime() {
    var now = new Date();

    clock.innerText =
      "2021." +
      "12" +
      "." +
      pad(now.getDate(), 2) +
      ". " +
      pad(now.getHours(), 2) +
      ":" +
      pad(now.getMinutes(), 2) +
      ":" +
      pad(now.getSeconds(), 2);
  }
  setInterval(displayTime, 10);
};
