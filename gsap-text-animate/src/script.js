gsap.registerPlugin(ScrollTrigger);

const split = new SplitText(".text-container", { linesClass: "text-animate" });
const tl = gsap.timeline({defaults: {duration: 1.2, ease: "power2.inOut"}});
tl
.from(split.lines, {
  y: "50px",
  opacity: 0,
  stagger: 0.05, 
  delay: 1,
})
.from('button', {
  y: "5px",
  opacity: 0,
  duration: 0.6,
});
