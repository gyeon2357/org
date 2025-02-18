var Swiper = new Swiper(".room__swiper", {
  // Optional parameters
  loop: true,
  effect: "fade",

  autoplay: {
    delay: 3000,
  },

  disableOnInteraction: false,
  speed: 750,
  keyboardControl: true,

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
