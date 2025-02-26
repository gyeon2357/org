const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

/* TEXT ANIMATION */

tl.to(".line", {
  y: "0",
  opacity: "1",
  delay: 0.15,
  duration: 0.4,
  stagger: 0.1,
});

tl.fromTo(
  ".text",
  {
    x: 5,
    opacity: 0,
  },
  {
    duration: 0.5,
    x: 0,
    opacity: 1,
    stagger: {
      from: "start",
      amount: 0.5,
    },
  }
);

tl.to(".intro", {
  opacity: "0",
  delay: 0.125,
  duration: 0.5,
  display: "none",
});

/* GRID ANIMATION */

// .to(".gallery-container .project::after", {
//   opacity: "1",
//   delay: 0.25,
//   duration: 0.25,
// });



tl.add("start")

  .to(
    ".gallery-container .project > a",
    {
      opacity: "1",
      duration: 0.5,
      stagger: 0.12,
    },
    "start"
  )

  .to(
    ".gallery-container .project > .info-project > div",
    {
      opacity: "1",
      duration: 0.5,
      stagger: 0.03,
    },
    "start"
  );

tl.to(".gallery-container", {
  "--grid-length": "0%",
  delay: 0.5,
  duration: 0.5,
});
