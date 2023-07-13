$(function () {
  $("button").on("click", function () {
    $(".basket-icon img").attr("src", "./assets/images/kongnamul-8.svg");
    $(".basket-icon").addClass("basket-add-motion");
    $(".basket-icon-fixed img").attr("src", "./assets/images/kongnamul-9.svg");
    $(this).closest("li").find("img").clone().addClass("zoom").appendTo("body");

    setTimeout(function () {
      $(".zoom").remove();
      $(".basket-icon").removeClass("basket-add-motion");
      $(".basket-icon img").attr("src", "./assets/images/kongnamul-9.svg");
    }, 750);
  });
});

$(function () {
  $(".back-icon").on("click", function () {
    $("input:checkbox[id='menu__toggle']").prop("checked", false);
  });
});

$(function () {
  var today = new Date();

  var year = today.getFullYear();
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var day = ("0" + today.getDate()).slice(-2);

  document.getElementById("current_date").innerHTML =
    year + "." + month + "." + day;
});