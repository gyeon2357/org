const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

/* TEXT ANIMATION */
// tl.to(".intro-box", {
//   background: "",
//   height: "120px",
//   duration: 0.8,
//   delay: 0.1,
// });
tl.to(".line", {
  width: "120px",
    opacity: "1",
  duration: 0.6,
  stagger: 0.15,
});
tl.to(".line-text", {
  opacity: "1",
  duration: 0.25,
  stagger: 0.15,
});

tl.to(".text", {
  y: "0%",
  duration: 0.95,
  stagger: 0.15,
  delay: 0.5,
});
/* SLIDER OPTIONAL */

tl.to(".intro", {
  opacity: "0",
  delay: 0.35,
  duration: 0.6,
  display: "none",
}); /* ,  */

/* HOME PAGE CONTENT ANIMATION */
// tl.fromTo("main", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1");
