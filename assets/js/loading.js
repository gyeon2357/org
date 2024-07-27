const tl = gsap.timeline({defaults: {ease: "power2.out"}});

/* TEXT ANIMATION */
// tl.to(".text", {
//   y: "0%",
//   duration: 1.5,
//   stagger: 0.3,
// });

tl.to(".text", {
  y: "0%",
  duration: 2,
  stagger: 0.2,
});

/* SLIDER OPTIONAL */
// tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });
tl.to(".onload", {
  opacity: "0",
  delay: "0.125",
  duration: 0.6,

  display: "none",
}); /* ,  */

/* HOME PAGE CONTENT ANIMATION */
tl.fromTo("main, footer", {opacity: 0}, {opacity: 1, duration: 0.5});
