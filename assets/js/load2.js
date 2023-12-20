gsap.registerPlugin(TextPlugin);

const tl = gsap.timeline({defaults: {ease: "power2.out"}});

tl.to(".loadtext", {
  text: "gyeon.org, <br/>Portfolio Website",
  delay: "1",
  duration: 3,
});

tl.to(".onload", {
  y: "-100%",
  delay: "0.5",

  duration: 0.5,
  display: "none",
});

tl.fromTo("main, footer", {opacity: 0}, {opacity: 1, duration: 0.25});
