const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

/* TEXT ANIMATION */

tl.to(".line", {
  // width: "120px",
  y: "0",
  opacity: "1",
  delay: 0.25,
  duration: 0.5,
  stagger: 0.15,
});

// tl.to(".line-text", {
//   opacity: "1",
//   duration: 0.1,
//   stagger: 0.125,
// });

tl.fromTo(
  ".text",
  {
    x: 5,
    opacity: 0,
  },
  {
    // delay: 2,
    duration: .625,
    x: 0,
    opacity: 1,
    stagger: {
      from: "start",
      amount: 0.5,
    },
  }
);

// tl.to(".text", {
//   y: "0%",
//   duration: 0.75,
//   stagger: 0.15,
//   delay: 0.15,
// });
/* SLIDER OPTIONAL */

tl.to(".intro", {
  opacity: "0",
  delay: 0.125,
  duration: 0.5,
  display: "none",
}); /* ,  */

/* HOME PAGE CONTENT ANIMATION */
// tl.fromTo("main", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1");
