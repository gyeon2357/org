$(function () {
  // mobile menu scroll func
  window.onscroll = function () {
    mobileMenuSwitchFunction();
  };

  function mobileMenuSwitchFunction() {
    if (
      document.body.scrollTop > window.innerHeight / 1.6 ||
      document.documentElement.scrollTop > window.innerHeight / 1.6
    ) {
      $(".mobile__header__navigator").addClass("toggle_bg");
    } else {
      $(".mobile__header__navigator").removeClass("toggle_bg");
    }
  }

  // mobile menu button func
  $(".mobile__menu__button").click(function (event) {
    // body overflow setting
    $("html, body").toggleClass("overflow_hd");

    // add active func
    $(".mobile__menu__button__container, .mobile__menu__container").toggleClass(
      "is_active"
    );

    // header style
    if ($(".mobile__header__navigator").hasClass("toggle_bg") === false) {
      $(".mobile__header__navigator").addClass("toggle_bg");
    }

    // menu modal style
    if ($(".mobile__menu__container").hasClass("is_active")) {
      $(".mobile__menu__container").css("z-index", "101");
      $(".mobile__menu__container").css("pointer-events", "auto");
    } else {
      $(".mobile__menu__container").css("z-index", "-1");
      $(".mobile__menu__container").css("pointer-events", "none");
    }
  });

  // footer year func
  const date = new Date();
  const year = date.getFullYear();

  document.querySelector("#copyright__year").innerHTML = `${year}`;
});
