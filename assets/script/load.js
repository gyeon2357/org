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

tl.add("close")
  .to(
    ".card",
    {
      y: "-5%",
      opacity: "0",
      duration: 0.8,
      delay: 1.75,
    },
    "close"
  )

  .to(
    ".loading",
    {
      y: "-100%",
      duration: 0.6,
      delay: 2,
      display: "none",
    },
    "close"
  );

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
