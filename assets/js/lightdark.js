$(function () {
  localStorage.clear();
  $("body").toggleClass(localStorage.toggled);

  if (localStorage.toggled == "light") {
    $(".c-theme-switch").addClass("light");
  }

  function lightDark() {
    if (localStorage.toggled != "light") {
      $("body, .c-theme-switch").toggleClass("light", true);
      localStorage.toggled = "light";
    } else {
      $("body, .c-theme-switch").toggleClass("light", false);
      localStorage.toggled = "";
    }
  }

  $(".c-theme-switch").click(function () {
    lightDark();
  });
});
