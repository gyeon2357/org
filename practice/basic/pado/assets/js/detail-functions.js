// project total num

$(function () {
  var count = $(".slideshow__gallery .slideshow__item").length;
  var sliderCounterTotal = $(".counter--total");
  $(sliderCounterTotal).html("/ " + count);
});
