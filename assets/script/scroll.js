var items = gsap.utils.toArray(".gallery-container .project");
var texts = gsap.utils.toArray(
  ".gallery-container .project > .info-project > div"
);

// items.forEach((item) => {
//   gsap.to(item, {
//     autoAlpha: 0,
//     scrollTrigger: {
//       trigger: item,
//       start: "bottom center+=150",
//       scrub: true,
//       end: "+=600",
//       opacity: 0,
//     },
//   });
// });

ScrollTrigger.matchMedia({
  "(min-width: 600px)": function () {
    items.forEach((item) => {
      gsap.to(item, {
        autoAlpha: 0.5,
        y: -5,
        scrollTrigger: {
          trigger: item,
          start: "bottom center+=25",
          scrub: true,
          end: "+=1000",
        },
      });
    });
    texts.forEach((text) => {
      gsap.to(text, {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: text,
          start: "top 100%",
          scrub: true,
          end: "bottom bottom",
        },
      });
    });
  },
  "(max-width: 599px)": function () {
    items.forEach((item) => {
      gsap.to(item, {
        autoAlpha: 0.5,
        y: -5,
        scrollTrigger: {
          trigger: item,
          start: "bottom center+=120",
          scrub: true,
          end: "bottom center",
        },
      });
    });

    texts.forEach((text) => {
      // gsap.to(text, {
      //   autoAlpha: 1,
      //   scrollTrigger: {
      //     trigger: text,
      //     start: "top 110%",
      //     scrub: true,
      //     end: "bottom bottom",
      //   },
      // });
    });
  },
});
