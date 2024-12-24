var swiper = new Swiper(".mySwiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  fadeEffect: { crossFade: true },
  virtualTranslate: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: true,
  },
  speed: 2500,
  slidersPerView: 1,
  effect: "fade",
});
