const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

/* TEXT ANIMATION */
tl.to(".text", {
  y: "0%",
  duration: 0.95,
  stagger: 0.15,
});
/* SLIDER OPTIONAL */
// tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });
tl.to(".intro", {
  y: "-100%",
  delay: 0.25,
  duration: 0.9,
}); /* ,  */

/* HOME PAGE CONTENT ANIMATION */
// tl.fromTo("main", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1");
