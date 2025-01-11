$(function () {
  $("button").on("click", function () {
    $(".basket-icon img").attr("src", "./assets/images/kongnamul-8.svg");
    $(".basket-icon").addClass("basket-add-motion");
    $(".basket-icon-fixed img").attr("src", "./assets/images/kongnamul-9.svg");
    $(this).closest("li").find("img").clone().addClass("zoom").appendTo("body");

    setTimeout(function () {
      $(".zoom").remove();
    }, 500);

    setTimeout(function () {
      $(".basket-icon").removeClass("basket-add-motion");
    }, 750);

    setTimeout(function () {
      $(".basket-icon img").attr("src", "./assets/images/kongnamul-9.svg");
    }, 1200);
  });
});

$(function () {
  var images = [
    "1.svg",
    "2.svg",
    "3.svg",
    "4.svg",
    "5.svg",
    "6.svg",
    "7.svg",
    "8.svg",
    "9.svg",
  ];
  $(".random").attr(
    "src",
    "./assets/images/order-" + images[Math.floor(Math.random() * images.length)]
  );
});

$(function () {
  $(".back-icon").on("click", function () {
    $("input:checkbox[id='menu__toggle']").prop("checked", false);
  });

  // // checked
  // if ($("input:checkbox[id='menu__toggle']").is(":checked")) {
  //   $("body").css("overflow", "auto");
  // } else {
  //   $("body").css("overflow", "hidden");
  // }
});

$(function () {
  var today = new Date();

  var year = today.getFullYear();
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var day = ("0" + today.getDate()).slice(-2);

  document.getElementById("current_date").innerHTML =
    year + "." + month + "." + day;
});
