const tl = gsap.timeline({defaults: {ease: "power2.out"}});

/* TEXT ANIMATION */
tl.to(".text", {
  y: "0%",
  duration: 1.5,
  stagger: 0.3,
});
/* SLIDER OPTIONAL */
// tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });
tl.to(".onload", {
  y: "-100%",
  delay: "0.5",
  duration: 1,

  display: "none",
}); /* ,  */

/* HOME PAGE CONTENT ANIMATION */
tl.fromTo("main, footer", {opacity: 0}, {opacity: 1, duration: 0.5});