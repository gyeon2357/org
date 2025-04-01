const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

/* TEXT ANIMATION */

tl.fromTo(
  ".split",
  {
    x: 5,
    opacity: 0,
  },
  {
    delay: 0.25,
    duration: 0.5,
    x: 0,
    opacity: 1,
    stagger: {
      from: "start",
      amount: 0.5,
    },
  }
);

tl.to(".i-project", {
  y: "0",
  opacity: "1",
  delay: 0.15,
  duration: 0.4,
  stagger: 0.1,
});

// tl.add("hidden")
//   .to(
//     ".card",
//     {
//       y: "-5%",
//       opacity: "0",
//       duration: 0.8,
//       delay: 1.65,
//     },
//     "hidden"
//   )

//   .to(
//     ".loading",
//     {
//       // y: "-20%",
//       opacity: "0",
//       duration: 0.6,
//       delay: 1.8,
//       display: "none",
//     },
//     "hidden"
//   );

// tl.add("visible")
//   .to(
//     ".alert",
//     {
//       delay: 5,
//       display: "none",
//     },
//     "visible"
//   )
//   .to(
//     ".card-btn",
//     {
//       delay: 5,
//       display: "none",
//     },
//     "visible"
//   )
//   .to(
//     ".card-ct",
//     {
//       delay: 5,
//       display: "none",
//     },
//     "visible"
//   )

//   .to(
//     ".card",
//     {
//       delay: 5,
//       opacity: "1",
//     },
//     "visible"
//   )

//   .to(
//     ".loading",
//     {
//       delay: 5,
//       opacity: "1",
//       onComplete: screensaver,
//     },
//     "visible"
//   );

//screensaver
function screensaver() {
  var timer;
  var $screensaver = $(".loading");

  function resetTimer() {
    clearTimeout(timer);

    $screensaver.removeClass("is-visible");
    timer = setTimeout(function () {
      $screensaver.addClass("is-visible");
    }, 1000 * 30);
  }
  $(document).on("mousemove keypress click scroll resize", resetTimer);
  resetTimer();
}

//keyup to skip
$(document).on("keyup", "body", function (j) {
  if (j.which == 32) $(".loading").fadeOut();
});

/* GRID ANIMATION */

// tl.add("start")
// .to(
//   ".nav",
//   {
//     opacity: 1,
//     duration: 0.5,
//   },
//   "start"
// );
// .to(
//   ".gallery-container .project > a",
//   {
//     opacity: "1",
//     duration: 0.5,
//     delay: 0.5,
//     stagger: 0.12,
//   },
//   "start"
// )

// .to(
//   ".gallery-container .project > .info-project > div",
//   {
//     opacity: "1",
//     duration: 0.5,
//           delay: 0.5,
//     stagger: 0.03,
//   },
//   "start"
// );

// tl.to(".gallery-container", {
//   "--grid-length": "0%",
//   delay: 0.5,
//   duration: 0.5,
// });
