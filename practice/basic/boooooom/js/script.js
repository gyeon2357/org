$(function () {
    var $setElem = $('.switch'),
        pcName = '_pc',
        spName = '_sp',
        replaceWidth = 641;
    $setElem.each(function () {
        var $this = $(this);

        function imgSize() {
            if (window.innerWidth > replaceWidth) {
                $this.attr('src', $this.attr('src').replace(spName, pcName)).css({
                    visibility: 'visible'
                });
            } else {
                $this.attr('src', $this.attr('src').replace(pcName, spName)).css({
                    visibility: 'visible'
                });
            }
        }
        $(window).resize(function () {
            imgSize();
        });
        imgSize();
    });
});

$(document).ready(function () {
  $("label").click(function () {
    $(".logo").toggleClass("logo-invert");
    $(".header").toggleClass("logo-invert");
    
  });
});

$(document).ready(function () {
  $("body").click(function () {
    $(".intro2").addClass("none");
    $(".intro-container").addClass("none");
  });
});


/* plain/vanilla JavaScript */

const div1 = document.querySelector("#boram");
const icon1 = document.querySelector(".tooltip1");

div1.addEventListener('mouseenter', () => icon1.style.opacity = 1);
div1.addEventListener('mouseleave', () => icon1.style.opacity = 0);



const div2 = document.querySelector("#jonghee");
const icon2 = document.querySelector(".tooltip2");

div2.addEventListener('mouseenter', () => icon2.style.opacity = 1);
div2.addEventListener('mouseleave', () => icon2.style.opacity = 0);



const div3 = document.querySelector("#nase");
const icon3 = document.querySelector(".tooltip3");

div3.addEventListener('mouseenter', () => icon3.style.opacity = 1);
div3.addEventListener('mouseleave', () => icon3.style.opacity = 0);



const div4 = document.querySelector("#gyeon");
const icon4 = document.querySelector(".tooltip4");

div4.addEventListener('mouseenter', () => icon4.style.opacity = 1);
div4.addEventListener('mouseleave', () => icon4.style.opacity = 0);



const div5 = document.querySelector("#gyu");
const icon5 = document.querySelector(".tooltip5");

div5.addEventListener('mouseenter', () => icon5.style.opacity = 1);
div5.addEventListener('mouseleave', () => icon5.style.opacity = 0);



const div6 = document.querySelector("#pano");
const icon6 = document.querySelector(".tooltip6");

div6.addEventListener('mouseenter', () => icon6.style.opacity = 1);
div6.addEventListener('mouseleave', () => icon6.style.opacity = 0);