$(document).ready(function () {
  $("html, body").scrollTop(0);
  $content = $(".content");
  $link = $content.find("a");
  $link.on("click", function (e) {
    e.preventDefault();
    var href = $(this).attr("href");
    var options = "width=800, height=800, status=no, menubar=no, toolbar=no";
    window.open(href, "", options);
  });
});

$(window).on("load", function () {
  var $header = $(".header");
  var $title = $(".title");
  var $main = $(".main");
  var delay = 800;
  setTimeout(function () {
    $title.fadeIn(delay);
    setTimeout(function () {
      $title.find("div").eq(0).show(0);
      setTimeout(function () {
        $title
          .find("div")
          .eq(0)
          .fadeOut(delay, function () {
            $title.find("div").eq(1).show(0);
            setTimeout(function () {
              $title
                .find("div")
                .eq(1)
                .fadeOut(delay, function () {
                  $title.find("div").eq(2).show(0);
                  setTimeout(function () {
                    $title
                      .find("div")
                      .eq(2)
                      .fadeOut(delay, function () {
                        $title.find("div").eq(3).show(0);
                        setTimeout(function () {
                          $title
                            .find("div")
                            .eq(3)
                            .fadeOut(delay, function () {
                              $header.fadeOut(delay);
                              $main.animate(
                                {
                                  "margin-top": 0,
                                },
                                delay
                              );
                              $("html, body").scrollTop(0);
                              $("body").removeClass("fixed");
                            });

                          Number.prototype.format = function (n) {
                            var r = new RegExp(
                              "\\d(?=(\\d{3})+" + (n > 0 ? "\\." : "$") + ")",
                              "g"
                            );
                            return this.toFixed(
                              Math.max(0, Math.floor(n))
                            ).replace(r, "$&,");
                          };

                          $(".count").each(function () {
                            $(this)
                              .prop("counter", 0)
                              .animate(
                                {
                                  counter: $(this).text(),
                                },
                                {
                                  delay: 30000,
                                  duration: 15000,
                                  easing: "easeOutExpo",
                                  step: function (step) {
                                    $(this).text("" + step.format());
                                  },
                                }
                              );
                          });
                          $(".count-delay").each(function () {
                            $(this)
                              .prop("counter", 0)
                              .animate(
                                {
                                  counter: $(this).text(),
                                },
                                {
                                  delay: 100000,
                                  duration: 25000,
                                  easing: "easeOutExpo",
                                  step: function (step) {
                                    $(this).text("" + step.format());
                                  },
                                }
                              );
                          });
                        }, delay * 3);
                      });
                  }, delay);
                });
            }, delay);
          });
      }, delay);
    }, delay);
  }, delay * 3);
});
