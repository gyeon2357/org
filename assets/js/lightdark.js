$(function () {
  // localStorage.clear();

  $("body").toggleClass(localStorage.toggled);

  if (localStorage.toggled == "light") {
    $(".light-switch").addClass("light");
  }

  function lightDark() {
    if (localStorage.toggled != "light") {
      $("body, .light-switch").toggleClass("light", true);
      localStorage.toggled = "light";
    } else {
      $("body, .light-switch").toggleClass("light", false);
      localStorage.toggled = "";
    }
  }

  $(".light-switch").click(function () {
    lightDark();
  });
});
