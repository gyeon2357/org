//GENERAL

function setVH() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  // window.addEventListener('resize', () => {
  // 	let vh = window.innerHeight * 0.01;
  // 	document.documentElement.style.setProperty('--vh', `${vh}px`);
  //   });

  // $(document).on("resize scroll touchstart", function () {

  // 	let vh = window.innerHeight * 0.01;
  // 	document.documentElement.style.setProperty('--vh', `${vh}px`);

  //   });
}

function openLinksInNewTab() {
  $('a[href^="http"]').attr({target: "_blank", rel: "noopener noreferrer"});
  $('a[href^="//"]').attr({target: "_blank", rel: "noopener noreferrer"});
  $('a[href^="' + window.location.origin + '"]').attr("target", "_self");
}

function preLoad() {
  var preloadTimer;

  clearTimeout(preloadTimer);

  preloadTimer = setTimeout(function () {
    $(".preload").removeClass("preload");
  }, 500);
}

function resizeSetHeight() {
  var windowHeight = $(window).innerHeight() * 0.01;

  //Set height of Menu, Project

  if ($(window).width() > 900) {
    var projectlistHeight = $(".projectlist").innerHeight();
    $("#menu").css("height", "unset");
    // $("#menu").css("height", projectlistHeight + 20 + "px");

    // $("#project").css("height", windowHeight + "px");
  } else if ($(window).width() < 900) {
    // $("#project").css("height", windowHeight + "px");
    // $("#menu, #project").css("height", windowHeight + "px");
  }

  //Set height of Project Layer

  // $('.project__layer, .project__layer__body').each(function()  {
  // $(this).css("height", windowHeight + "px");
  // });

  //Set height of Project Layer Headers and Padding

  if ($(window).width() < 900) {
    var projectHeaderHeight = $("#project__header").innerHeight();
    $(
      ".images__slideshow, .information__description, .overview__thumbnail__wrapper"
    ).css("padding-top", projectHeaderHeight + 20);
    $(".project__layer__header").css("height", projectHeaderHeight + 2);
  } else {
    $(
      ".images__slideshow, .information__description, .overview__thumbnail__wrapper"
    ).css("padding-top", "");
    $(".project__layer__header").css("height", "");
  }

  //Set max height of mobile images

  var projectImg = $(".gallery__img");
  var projectImgMaxHeight = windowHeight - projectHeaderHeight - 43;

  if (!$(this).hasClass("hasHover")) {
    projectImg.css("max-height", projectImgMaxHeight);
  } else {
    projectImg.css("max-height", "");
  }
}

function watchForHover() {
  // lastTouchTime is used for ignoring emulated mousemove events
  let lastTouchTime = 0;

  function enableHover() {
    if (new Date() - lastTouchTime < 500) return;
    document.body.classList.add("hasHover");
  }

  function disableHover() {
    document.body.classList.remove("hasHover");
  }

  function updateLastTouchTime() {
    lastTouchTime = new Date();
  }

  document.addEventListener("touchstart", updateLastTouchTime, true);
  document.addEventListener("touchstart", disableHover, true);
  document.addEventListener("mousemove", enableHover, true);

  enableHover();
}

function addBodyClass() {
  $("body").removeClass(function (index, css) {
    return (css.match(/(^|\s)page--\S+/g) || []).join(" ");
  });

  if ($("#atlas")[0]) {
    $("body").addClass("page--atlas");
  } else if ($("#project")[0]) {
    $("body").addClass("page--project");
  } else if ($("#information")[0]) {
    $("body").addClass("page--information");
  } else if ($("#general")[0]) {
    $("body").addClass("page--general");
  } else {
    return;
  }
}

function toggleMenu() {
  $(".header__menutoggle__item").click(function () {
    if ($("#menu").hasClass("visible")) {
      $("#menu").removeClass("visible").addClass("hidden");
      // $("html, body").removeClass("overflowhidden")
      $("#menu__header").removeClass("visible").addClass("hidden");

      if ($(window).width() < 900) {
        $(".language__item").removeClass("visible").addClass("hidden");
        $("html, body").removeClass("overflowhidden");
      }

      if ($(".header__menutoggle__lang").hasClass("de")) {
        $(".header__menutoggle__item .desktop").text("MenÃ¼");
        $(".header__menutoggle__item .mobile").text("MenÃ¼");
      } else if ($(".header__menutoggle__lang").hasClass("en")) {
        $(".header__menutoggle__item .desktop").text("Menu");
        $(".header__menutoggle__item .mobile").text("Menu");
      }
    } else if ($("#menu").hasClass("hidden")) {
      $("#menu").removeClass("hidden").addClass("visible");
      // $("html, body").addClass("overflowhidden")
      $("#menu__header").removeClass("hidden").addClass("visible");

      if ($(window).width() < 900) {
        $(".language__item").removeClass("hidden").addClass("visible");
        $("html, body").addClass("overflowhidden");
      }

      if ($(".header__menutoggle__lang").hasClass("de")) {
        $(".header__menutoggle__item .desktop").text("X");
        $(".header__menutoggle__item .mobile").text("X");
      } else if ($(".header__menutoggle__lang").hasClass("en")) {
        $(".header__menutoggle__item .desktop").text("X");
        $(".header__menutoggle__item .mobile").text("X");
      }
    }
  });

  $(document).on("click", function (event) {
    // $(document).on(pickclick, function(event) {

    var $target = $(event.target);

    if (!$target.closest(".header__menutoggle__item").length) {
      $("#menu").removeClass("visible").addClass("hidden");
      // $("body").removeClass("overflowhidden")
      $("#menu__header").removeClass("visible").addClass("hidden");

      if ($(window).width() < 900) {
        $(".language__item").removeClass("visible").addClass("hidden");
        $("html, body").removeClass("overflowhidden");
      }

      if ($(".header__menutoggle__lang").hasClass("de")) {
        $(".header__menutoggle__item .desktop").text("MenÃ¼");
        $(".header__menutoggle__item .mobile").text("MenÃ¼");
      } else if ($(".header__menutoggle__lang").hasClass("en")) {
        $(".header__menutoggle__item .desktop").text("Menu");
        $(".header__menutoggle__item .mobile").text("Menu");
      }
    }
  });

  var langToggleTimer;

  $(".header__menutoggle__lang").click(function () {
    clearTimeout(langToggleTimer);

    langToggleTimer = setTimeout(function () {
      if ($(".header__menutoggle__lang").hasClass("de")) {
        $(".header__menutoggle__item .desktop").text("MenÃ¼");
        $(".header__menutoggle__item .mobile").text("MenÃ¼");
      } else if ($(".header__menutoggle__lang").hasClass("en")) {
        $(".header__menutoggle__item .desktop").text("Menu");
        $(".header__menutoggle__item .mobile").text("Menu");
      }
    }, 600);
  });
}

// function wbrPrivacy Policy() {
// 	// if ($(window).width() > 900 && $(window).width() < 1200) {

// 	// 	$("#menu a:contains('Privacy PolicyerklÃ¤rung'), .page__title:contains('Privacy PolicyerklÃ¤rung')").html("Privacy Policy-<br>erklÃ¤rung")

// 	// } else {
// 	// 	$("#menu a:contains('Privacy Policy'), .page__title:contains('Privacy Policy')").html("Privacy PolicyerklÃ¤rung")

// 	// }
// }

function langMobileHidden() {
  if ($(window).width() < 900) {
    $(".language__item").removeClass("visible").addClass("hidden");
  } else {
    $(".language__item").removeClass("hidden").addClass("visible");
  }
}

function dominantColors() {
  // var arrayDominantColors = $('.slideshow__item').map(function(){
  // 	return $(this).attr("data-dominantcolor-hex");
  // });

  // console.log(arrayDominantColors)

  if ($("#atlas")[0]) {
    var arrayAtlasDominantColors = $(".atlas__item").map(function () {
      return $(this).attr("data-dominantcolor-hex");
    });

    var randomNumber = Math.floor(
      Math.random() * arrayAtlasDominantColors.length
    );
    atlasRandomDominantColor = arrayAtlasDominantColors[randomNumber];

    var atlasRandomDominantColorBrightness = tinycolor(
      atlasRandomDominantColor
    ).getBrightness();

    if (tinycolor(atlasRandomDominantColor).isLight()) {
      // $("#menu").css("background-color", atlasRandomDominantColorMENU)
      $("#menu, #menu__header").css(
        "background-color",
        atlasRandomDominantColor
      );

      if (atlasRandomDominantColorBrightness > 210) {
        var atlasRandomDominantColorMENU = tinycolor(atlasRandomDominantColor)
          .lighten(8)
          .toString();
        $("#menu, #menu__header").css(
          "background-color",
          atlasRandomDominantColorMENU
        );
      } else {
        var atlasRandomDominantColorMENU = tinycolor(atlasRandomDominantColor)
          .lighten(10)
          .toString();
        $("#menu, #menu__header").css(
          "background-color",
          atlasRandomDominantColorMENU
        );
      }

      // var atlasRandomDominantColorMENU = tinycolor(atlasRandomDominantColor).lighten(20).toString()
      // $("#menu").css("background-color", atlasRandomDominantColorMENU)
    } else {
      if (atlasRandomDominantColorBrightness < 10) {
        var atlasRandomDominantColorLight = tinycolor(atlasRandomDominantColor)
          .brighten(10)
          .lighten(20)
          .toString();
      } else if (atlasRandomDominantColorBrightness < 40) {
        var atlasRandomDominantColorLight = tinycolor(atlasRandomDominantColor)
          .brighten(10)
          .lighten(10)
          .toString();
      } else {
        var atlasRandomDominantColorLight = tinycolor(atlasRandomDominantColor)
          .lighten(20)
          .toString();
      }

      var atlasRandomDominantColorLightMENU = tinycolor(
        atlasRandomDominantColorLight
      )
        .lighten(10)
        .toString();
      $("#menu, #menu__header").css(
        "background-color",
        atlasRandomDominantColorLightMENU
      );

      // $("#menu").css("background-color", atlasRandomDominantColorLight)
    }
  }

  if ($("#project")[0]) {
    var itemsToColor = $(
      ".project__layer.project__information, .project__layer.project__information .project__layer__body, .project__layer.project__information .project__layer__header"
    );
    var currentDominantColor = $(".slick-current .slideshow__item").attr(
      "data-dominantcolor-hex"
    );
    var currentDominantColorRGB = tinycolor(currentDominantColor)
      .setAlpha(0.99)
      .toRgbString();
    var currentDominantColorRGB0 = tinycolor(currentDominantColor)
      .setAlpha(0)
      .toRgbString();
    var currentDominantColorBrightness =
      tinycolor(currentDominantColor).getBrightness();

    if (tinycolor(currentDominantColor).isLight()) {
      itemsToColor.css("background-color", currentDominantColor);
      $(".readmore__gradient").css(
        "background",
        "linear-gradient(to bottom, " +
          currentDominantColorRGB0 +
          "0%," +
          currentDominantColorRGB +
          "100%"
      );

      if (currentDominantColorBrightness > 210) {
        var currentDominantColorMENU = tinycolor(currentDominantColor)
          .lighten(8)
          .toString();
        $("#menu, #menu__header").css(
          "background-color",
          currentDominantColorMENU
        );
      } else {
        var currentDominantColorMENU = tinycolor(currentDominantColor)
          .lighten(10)
          .toString();
        $("#menu, #menu__header").css(
          "background-color",
          currentDominantColorMENU
        );
      }
    } else {
      if (currentDominantColorBrightness < 10) {
        var currentDominantColorLight = tinycolor(currentDominantColor)
          .brighten(10)
          .lighten(20)
          .toString();
      } else if (currentDominantColorBrightness < 40) {
        var currentDominantColorLight = tinycolor(currentDominantColor)
          .brighten(10)
          .lighten(10)
          .toString();
      } else {
        var currentDominantColorLight = tinycolor(currentDominantColor)
          .lighten(20)
          .toString();
      }

      itemsToColor.css("background-color", currentDominantColorLight);

      var currentDominantColorLightRGB = tinycolor(currentDominantColorLight)
        .setAlpha(0.99)
        .toRgbString();
      var currentDominantColorLightRGB0 = tinycolor(currentDominantColorLight)
        .setAlpha(0)
        .toRgbString();

      $(".readmore__gradient").css(
        "background",
        "linear-gradient(to bottom, " +
          currentDominantColorLightRGB0 +
          "0%," +
          currentDominantColorLightRGB +
          "100%"
      );

      var currentDominantColorLightMENU = tinycolor(currentDominantColorLight)
        .lighten(10)
        .toString();
      $("#menu, #menu__header").css(
        "background-color",
        currentDominantColorLightMENU
      );
    }
    console.log(currentDominantColorRGB);
  }
}

//ATLAS

function lazyload() {
  /*
	//lazy load using IntersectionObserver API
	var images = document.querySelectorAll('[data-srcset]'); //look at images with data-src
	var config = {
	  rootMargin: '0px 0px 50px 0px',
	  threshold: 0
	};
	var loaded = 0;

	var observer = new IntersectionObserver(function (entries, self) {
	  entries.forEach(function (entry) {
		if (entry.isIntersecting) {
			//console.log("Image" .concat(entry.target.src, "is in the viewport!"));
		  preloadImage(entry.target);
		  // Stop watching and load the image
		  self.unobserve(entry.target);
		}
	  });
	}, config);

	images.forEach(function(image) {
	  observer.observe(image);
	});
	//set each observed image src to its data-src value
	function preloadImage(img) {
	  var src = img.getAttribute('data-srcset');
	  if (!src) { return; }
	  img.src = src;
	}

	*/
}

var projectNumber, sameProjectNumber, projectTitle;

function atlasImgHover() {
  // $(document).on("mouseenter", ".hasHover .atlas__item:not(.hidden) .item__wrapper", function() {
  $(document).on(
    "mouseenter",
    ".atlas__item:not(.hidden) .item__wrapper",
    function () {
      projectNumber = $(this).parent().data("project");
      projectTitleNumber = $(this).parent().find(".item__projectnumber").text();
      projectTitleName = $(this).parent().find(".item__projectname").text();

      sameProjectNumber = $("#atlas").find(
        "[data-project='" + projectNumber + "']"
      );

      // if ($("body").hasClass("hasHover")) {

      sameProjectNumber.find(".item__text").css("opacity", "1");
      $(".atlas__item")
        .not(sameProjectNumber)
        .find(".item__text")
        .css("opacity", "0");
      // }

      if ($(window).width() > 700) {
        $(".projecttitle__number").text(projectTitleNumber);
        $(".projecttitle__name").text(projectTitleName);
      }
    }
  );

  $(document).on("mouseleave", ".atlas__item .item__wrapper", function () {
    $(".projecttitle__number").text("");
    $(".projecttitle__name").text("");

    if ($("#atlas").hasClass("projects--filtered")) {
      $(".projecttitle__number").text(projectTitleNumber);
      $(".projecttitle__name").text(projectTitleName);
    } else {
      $(".atlas__item")
        .not(sameProjectNumber)
        .find(".item__text")
        .css("opacity", "1");
    }
  });
}

function atlasImgClick() {
  if ($(window).width() < 700) {
    // if ($("body").hasClass("hasHover")) {
    // $(".atlas__item__link").addClass("enabled").removeClass("disabled");
  }

  $(document).on("click", ".item__link__wrapper", function (event) {
    projectLink = $(this).find(".atlas__item__link").attr("href");

    if ($("#atlas").hasClass("projects--filtered")) {
    } else {
      $("#atlas").addClass("projects--filtered");
      $(".projectlink__url")
        .addClass("url--active")
        .removeClass("url--inactive")
        .attr("href", projectLink);
      $(".atlas__item").not(sameProjectNumber).addClass("hidden");
      $("#atlas__header .projectlink")
        .addClass("visible")
        .removeClass("hidden");
      $(".atlas__item:not(.hidden) .atlas__item__link")
        .addClass("enabled")
        .removeClass("disabled");
    }
  });

  $(document).on("click", function (event) {
    var $target = $(event.target);

    if (
      !$target.closest(".atlas__item .item__link__wrapper").length &&
      !$target.closest(".projectlink__url").length &&
      !$target.closest(".header__menutoggle").length &&
      $("#atlas")[0]
    ) {
      $("#atlas").removeClass("projects--filtered");
      $(".projectlink__url")
        .addClass("url--inactive")
        .removeClass("url--active");
      $(".atlas__item").removeClass("hidden");
      $("#atlas__header .projectlink")
        .addClass("hidden")
        .removeClass("visible");
      $(".atlas__item__link").addClass("disabled").removeClass("enabled");
      $(".projecttitle__number").text("");
      $(".projecttitle__name").text("");
      $(".atlas__item")
        .not(sameProjectNumber)
        .find(".item__text")
        .css("opacity", "1");
    }
  });
}

function atlasSortMix() {
  $(document).on("click", ".atlas__sort__button", function () {
    $(".sort--active").removeClass("sort--active").addClass("sort--inactive");
    $(this).removeClass("sort--inactive").addClass("sort--active");
  });
}

//PROJECT

var $atlasProjectImageClicked;

function projectSlideshowSlick() {
  var $next = $(".nav--next");
  var $prev = $(".nav--prev");

  var $slider = $(".slideshow__gallery");
  var currentSlide;
  var slidesCount;
  var sliderCounter = $(".counter__current");
  // var sliderCounterTotal = $(".counter--total");
  // var sliderCounter = document.createElement('div');
  // sliderCounter.classList.add('slider-counter');

  // Set Intial Slide if coming from Atlas

  $(document).on("click", ".atlas__item", function () {
    $atlasProjectImageClicked = $(this).find(".item__imgnumber").text() - 1;
  });

  //Initialize Slider

  var sliderTimer;
  var initialSlideTimer;

  clearTimeout(sliderTimer);

  sliderTimer = setTimeout(function () {
    $slider.slick({
      autoplay: false,
      lazyLoad: "ondemand",
      // fade: false,
      fade: true,
      arrows: true,
      dots: false,
      nextArrow: $next,
      prevArrow: $prev,
      speed: 300,
      touchThreshold: 100,
      initialSlide: $atlasProjectImageClicked,
      // swipe: true,
      // swipeToSlide: true,
      // touchMove: true,
      // draggable: true
      //Swiping disabled as a test
      swipe: false,
      swipeToSlide: false,
      touchMove: false,
      draggable: false,
    });

    // Reset Intial Slide to Zero if not coming from Atlas

    clearTimeout(initialSlideTimer);

    initialSlideTimer = setTimeout(function () {
      $atlasProjectImageClicked = 0;
    }, 300);
  }, 100);

  // Update Counter

  var updateSliderCounter = function (slick, currentIndex) {
    currentSlide = slick.slickCurrentSlide() + 1;
    slidesCount = slick.slideCount;
    $(sliderCounter).text(currentSlide);
  };

  $slider.on("init", function (event, slick, currentSlide) {
    updateSliderCounter(slick, currentSlide);
    dominantColors();
  });

  $slider.on("afterChange", function (event, slick, currentSlide) {
    updateSliderCounter(slick, currentSlide);
    dominantColors();
  });

  //Mobile behaviour

  var xStart, xEnd, touchEndTimer;
  var touched = false;
  let startTouchTime, endTouchTime;

  $(".slideshow__item")
    .each(function (i) {
      var thisURL = $(this).find("img").attr("data-zoom");
      console.log(thisURL);
      $(this).zoom({url: thisURL, magnify: 0.8, touch: true});
    })
    .on("mousedown touchstart", function (e) {
      // var thisURL = $(this).find("img").attr("data-zoom");
      // $(this).zoom({url: thisURL, magnify: 0.8})

      if (e.originalEvent.pageX) {
        xStart = e.originalEvent.pageX;
      } else {
        xStart = e.originalEvent.touches[0].pageX;
      }

      startTouchTime = new Date();

      if (e.touches.length == 1) {
        touched = true;
      } else if (e.touches.length == 2) {
        touched = false;
      }
    })
    .on("touchmove", function (e) {
      if (touched == true) {
        return;
      } else if (touched == false && e.touches.length == 2) {
        $(".zoomnotice").css("opacity", "1");
      }
    })
    .on("mouseup touchend", function (e) {
      clearTimeout(touchEndTimer);

      if (e.originalEvent.pageX) {
        xEnd = e.originalEvent.pageX;
      } else {
        xEnd = e.originalEvent.touches[0].pageX;
      }

      var deltaX = xEnd - xStart;

      endTouchTime = new Date();
      touchDuration = endTouchTime - startTouchTime;

      $(".zoomnotice").css("opacity", "0");

      var windowWidth = $(window).width();
      var swiped;

      if (deltaX == 0) {
        swiped = false;
      } else {
        swiped = true;
      }

      // console.log("deltaX: " + deltaX + ", swiped: " + swiped)

      // Navigation on touch

      if (swiped == false && xStart < windowWidth / 2 && touchDuration < 120) {
        $slider.slick("slickPrev");
      } else if (
        swiped == false &&
        xStart > windowWidth / 2 &&
        touchDuration < 120
      ) {
        $slider.slick("slickNext");
      }

      //Navigation on swipe

      if (swiped == true && deltaX > 0 && touchDuration < 120) {
        $slider.slick("slickPrev");
      } else if (swiped == true && deltaX < 0 && touchDuration < 120) {
        $slider.slick("slickNext");
      }

      touchEndTimer = setTimeout(function () {
        touched = false;
      }, 300);
    });

  // $slider
  // 	.on("mousedown touchstart", function (e) {

  // 		if (e.touches.length == 1) {

  // 			if (e.originalEvent.pageX) {
  // 				xStart = e.originalEvent.pageX;
  // 			} else {
  // 				xStart = e.originalEvent.touches[0].pageX;
  // 			}

  // 			$("body").css("background","blue")
  // 			$("body").addClass("onefingertouching")
  // 			$(".slideshow__gallery").css("pointer-events","all")

  // 		} else if (e.touches.length == 2) {

  // 			$("body").css("background","red")
  // 			$("body").addClass("twofingerstouching")
  // 			$(".slideshow__gallery").css("pointer-events","none")

  // 		}

  // 	})
  // 	// .on("touchmove mouseup touchend", function (e) {
  // 	.on("touchmove", function (e) {

  // 		if (e.originalEvent.pageX) {
  // 			xEnd = e.originalEvent.pageX;
  // 		} else {
  // 			xEnd = e.originalEvent.touches[0].pageX;
  // 		}

  // 		var deltaX = xEnd - xStart;

  // 		if ($("body").hasClass("onefingertouching")) {
  // 		// if (e.touches.length == 1) {

  // 			if (deltaX > 0) {
  // 				$slider.slick("slickPrev");
  // 				// $("body").removeClass("onefingertouching")
  // 			} else {
  // 				$slider.slick("slickNext");
  // 				// $("body").removeClass("onefingertouching")
  // 			}

  // 			$("body").css("background","lightblue")
  // 			$(".slideshow__gallery").css("pointer-events","all")

  // 		} else if ($("body").hasClass("twofingerstouching")) {
  // 			// } else if (e.touches.length == 2) {

  // 				$("body").css("background","pink")
  // 				// $("body").removeClass("twofingerstouching")
  // 				$(".slideshow__gallery").css("pointer-events","none")

  // 			}

  // 		}).on("mouseup touchend", function (e) {

  // 			clearTimeout(touchEndTimer);

  // 			touchEndTimer = setTimeout(function () {
  // 				$("body").removeClass("onefingertouching twofingerstouching")
  // 				$("body").css("background","transparent")
  // 				$(".slideshow__gallery").css("pointer-events","all")
  // 		}, 500);

  // 	});

  // // //Slideshow Swipe + Zoom
  // // //https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Pinch_zoom_gestures

  // // // Global vars to cache event state
  // var evCache = new Array();
  // var prevDiff = -1;

  // // // function init() {
  // // 	// Install event handlers for the pointer target
  // 	var el = document.getElementsByClassName("slideshow__gallery")[0];
  // 	el.onpointerdown = pointerdown_handler;
  // 	el.onpointermove = pointermove_handler;

  // 	// Use same handler for pointer{up,cancel,out,leave} events since
  // 	// the semantics for these events - in this app - are the same.
  // 	el.onpointerup = pointerup_handler;
  // 	el.onpointercancel = pointerup_handler;
  // 	el.onpointerout = pointerup_handler;
  // 	el.onpointerleave = pointerup_handler;
  // // // }

  // function pointerdown_handler(ev) {
  // 	// The pointerdown event signals the start of a touch interaction.
  // 	// This event is cached to support 2-finger gestures
  // 	evCache.push(ev);
  // 	console.log("pointerDown", ev);

  // 	if (ev.touches.length == 1) {

  // 		if (ev.originalEvent.pageX) {
  // 			xStart = ev.originalEvent.pageX;
  // 		} else {
  // 			xStart = ev.originalEvent.touches[0].pageX;
  // 		}

  // 		$("body").css("background","blue")

  // 	}
  // }

  // function pointermove_handler(ev) {
  // 	// This function implements a 2-pointer horizontal pinch/zoom gesture.
  // 	//
  // 	// If the distance between the two pointers has increased (zoom in),
  // 	// the target element's background is changed to "pink" and if the
  // 	// distance is decreasing (zoom out), the color is changed to "lightblue".
  // 	//
  // 	// This function sets the target element's border to "dashed" to visually
  // 	// indicate the pointer's target received a move event.
  // 	console.log("pointerMove", ev);
  // 	// ev.target.style.border = "dashed";
  // 	// $(".slideshow__gallery").css("pointer-events","none")

  // 	// Find this event in the cache and update its record with this event
  // 	for (var i = 0; i < evCache.length; i++) {
  // 	  if (ev.pointerId == evCache[i].pointerId) {
  // 		 evCache[i] = ev;
  // 	  break;
  // 	  }
  // 	}

  // 	// If one pointer is down
  // 	if (evCache.length == 1) {

  // 		if (ev.originalEvent.pageX) {
  // 			xEnd = ev.originalEvent.pageX;
  // 		} else {
  // 			xEnd = ev.originalEvent.touches[0].pageX;
  // 		}

  // 		$("body").css("background","blue")

  // 		// If two pointers are down, check for pinch gestures
  // 	} else if (evCache.length == 2) {

  // 		$("body").css("background","red")

  // 	  // Calculate the distance between the two pointers
  // 	  var curDiff = Math.abs(evCache[0].clientX - evCache[1].clientX);

  // 	  if (prevDiff > 0) {

  // 		if (curDiff > prevDiff) {
  // 		  // The distance between the two pointers has increased
  // 		  console.log("Pinch moving OUT -> Zoom in", ev);
  // 		//   ev.target.style.background = "pink";
  // 		  $("body").css("background","pink")
  // 		}

  // 		if (curDiff < prevDiff) {
  // 			// The distance between the two pointers has decreased
  // 			console.log("Pinch moving IN -> Zoom out",ev);
  // 			//   ev.target.style.background = "lightblue";
  // 			$("body").css("background","hotpink")
  // 		}
  // 	}
  // 	// } else if (e.touches.length == 1)  {

  // 	// 		if (e.originalEvent.pageX) {
  // 	// 			xStart = e.originalEvent.pageX;
  // 	// 		} else {
  // 	// 			xStart = e.originalEvent.touches[0].pageX;
  // 	// 		}

  // 	// 		$("body").css("background","blue")

  // 	// }

  // 	  // Cache the distance for the next move event
  // 	  prevDiff = curDiff;
  // 	}
  // }

  //    function pointerup_handler(ev) {
  // 	console.log(ev.type, ev);
  // 	// Remove this pointer from the cache and reset the target's
  // 	// background and border
  // 	remove_event(ev);
  // 	// ev.target.style.background = "white";
  // 	// ev.target.style.border = "1px solid black";
  // 	// $(".slideshow__gallery").css("pointer-events","all")

  // 	// If the number of pointers down is less than two then reset diff tracker
  // 	if (evCache.length < 2) {
  // 	  prevDiff = -1;

  // 	  var deltaX = xEnd - xStart;

  // 		if (deltaX > 0) {
  // 			$slider.slick("slickPrev");
  // 		} else {
  // 			$slider.slick("slickNext");
  // 		}

  // 		$("body").css("background","lightblue")
  // 	}
  //   }

  // Fade In Slideshow to Hide Image Size Jump

  $(".slideshow__item").removeClass("hidden").addClass("visible");

  // Overview Slideshow Control

  $(".overview__thumbnail").bind("click", function () {
    var slidx = $(this).attr("data-slick-index");
    $slider.slick("slickGoTo", slidx);
  });

  // Cursor Tooltip

  $next.on({
    mouseenter: function () {
      $(".tooltip").fadeIn().html("next");
      console.log("Tooltip Test Next");
    },
    touchstart: function () {
      $(".tooltip").html("").hide().css("visibility", "hidden");
    },
    touchmove: function () {
      $(".tooltip").html("").hide();
    },
    touchend: function () {
      $(".tooltip").html("").hide();
    },
    touch: function () {
      $(".tooltip").hide();
    },
    mousemove: function (e) {
      $(".tooltip").css({
        left: e.pageX,
        top: e.pageY,
      });
    },
    mouseleave: function () {
      $(".tooltip").html("");
    },
  });

  $prev.on({
    mouseenter: function () {
      $(".tooltip").fadeIn().html("prev");
      console.log("Tooltip Test Prev");
    },
    touchstart: function () {
      $(".tooltip").html("").hide().css("visibility", "hidden");
    },
    touchmove: function () {
      $(".tooltip").html("").hide();
    },
    touchend: function () {
      $(".tooltip").html("").hide();
    },
    mousemove: function (e) {
      $(".tooltip").css({
        left: e.pageX,
        top: e.pageY,
      });
    },
    mouseleave: function () {
      $(".tooltip").html("");
    },
  });
}

// function projectMobilePadding() {

// 	// if ($(window).width() < 900) {

// 	// 	var projectHeaderHeight = $("#project__header").innerHeight();
// 	// 	$(".images__slideshow, .information__description, .overview__thumbnail__wrapper").css("padding-top", projectHeaderHeight + 20)
// 	// 	$(".project__layer__header").css("height", projectHeaderHeight + 2)

// 	// } else {

// 	// 	$(".images__slideshow, .information__description, .overview__thumbnail__wrapper").css("padding-top", "")
// 	// 	$(".project__layer__header").css("height", "")

// 	// }

// }

function projectToggleLayersFunction(x, y) {
  $(document).on("click", x, function (e) {
    if ($(y).hasClass("hidden")) {
      $(".project__layer.visible").removeClass("visible").addClass("hidden");
      $(y).removeClass("hidden").addClass("visible");
      $(".projecttoggle__item.active")
        .removeClass("active")
        .addClass("inactive");
      $(x).removeClass("inactive").addClass("active");
      $(".project__images").addClass("nopointerevents");
      $(".projectclose").fadeOut();
    } else {
      closeProjectLayers();
      $(".projectclose").fadeIn();
    }

    // if($('.project__layer').hasClass("visible")) {
    // 	$(".projectclose").fadeOut()
    // 	console.log("FADE OUT")
    // } else if (!$('.project__layer').hasClass("visible")) {
    // 	$(".projectclose").fadeIn()
    // 	console.log("FADE IN")
    // }

    projectSetMetaHeight();

    e.stopImmediatePropagation();
  });
}

var readmoreTimer;
var projectImagePointerEventTimer;
var projectLayerToggleTimer;

function closeProjectLayers() {
  $(".project__layer.visible").removeClass("visible").addClass("hidden");
  $(".projecttoggle__item.active").removeClass("active").addClass("inactive");
  // $(".projectclose").fadeIn()

  clearTimeout(readmoreTimer);

  readmoreTimer = setTimeout(function () {
    $(".readmore__wrapper").removeClass("hidden").addClass("visible");
    $(".information__description").addClass("readmore");
  }, 300);

  clearTimeout(projectImagePointerEventTimer);

  projectImagePointerEventTimer = setTimeout(function () {
    $(".project__images").removeClass("nopointerevents");
  }, 500);
}

function projectToggleLayers() {
  projectToggleLayersFunction(
    ".projecttoggle--information",
    ".project__information"
  );
  projectToggleLayersFunction(".projecttoggle--overview", ".project__overview");

  var touchmoved;

  $(".project__layer")
    .on("touchend", function (event) {
      // $(document).on('touchend', '.project__layer', function(event){

      var $target = $(event.target);

      console.log($target);

      // if(touchmoved != true && !$target.closest('.readmore__wrapper').length && !$target.closest('#project .project__information a')){
      // if(touchmoved != true && !$target.closest('.readmore__wrapper').length && !$target.closest('.overview__thumbnail').length){
      if (
        touchmoved != true &&
        !$target.closest(".readmore__wrapper").length &&
        !$target.closest(".overview__thumbnail").length &&
        !$target.closest("#project .project__information a").length
      ) {
        closeProjectLayers();
        $(".projectclose").fadeIn();
      }

      if (
        touchmoved != true &&
        $target.closest(".overview__thumbnail").length
      ) {
        console.log("Thumbnail clicked 1");
        var slidx = $(this).attr("data-slick-index");
        $slider.slick("slickGoTo", slidx);
        closeProjectLayers();
        console.log("Touched and closed");
        $(".projectclose").fadeIn();
      }

      event.stopImmediatePropagation();
    })
    .on("touchmove", function (e) {
      touchmoved = true;
    })
    .on("touchstart", function () {
      touchmoved = false;
    });

  $(document).on("click", function (event) {
    var $target = $(event.target);

    if (
      $(".project__layer").hasClass("visible") &&
      !$target.closest(".projecttoggle__item").length &&
      !$target.closest(".header__menutoggle").length &&
      !$target.closest(".readmore__wrapper").length &&
      !$target.closest("#project .project__information a").length
    ) {
      console.log("Thumbnail clicked 2");
      closeProjectLayers();
      $(".projectclose").fadeIn();
    }

    event.stopImmediatePropagation();
  });
}

var slideshowIntervalTimer = false;
var slideshowTimer;
var slideInterval;

function projectSlideshow() {
  $(".gallery__img:first").removeClass("hidden").addClass("visible");

  var currentImgNumber = $(".gallery__img.visible").data("count");
  $(".counter__current").text(currentImgNumber);

  $(document).on("click", ".nav--prev", function () {
    $(".gallery__img:first").removeClass("visible").addClass("hidden");
    $(".gallery__img:last").removeClass("hidden").addClass("visible");
    currentImgNumber = $(".gallery__img.visible").data("count");

    clearTimeout(slideshowTimer);

    slideshowTimer = setTimeout(function () {
      $(".gallery__img.visible").prependTo(".slideshow__gallery").end();
    }, 400);

    $(".counter__current").text(currentImgNumber);
  });

  $(document).on("click", ".nav--next", function () {
    $(".gallery__img:first").removeClass("visible").addClass("hidden");
    $(".gallery__img:nth-child(2)").removeClass("hidden").addClass("visible");
    currentImgNumber = $(".gallery__img.visible").data("count");

    clearTimeout(slideshowTimer);

    slideshowTimer = setTimeout(function () {
      $(".gallery__img:first").appendTo(".slideshow__gallery").end();
    }, 400);

    $(".counter__current").text(currentImgNumber);
  });
}

var maxTotalHeight = 0;

function projectSliceMeta() {
  var metaCount = $(".meta__wrapper").length;
  var metaCountHalf = Math.ceil(metaCount / 2);
  var metaCountHalfElementsLeft = $(".meta__wrapper").slice(0, metaCountHalf);
  var metaCountHalfElementsRight = $(".meta__wrapper").slice(
    metaCountHalf,
    metaCount
  );

  var totalHeightLeft = 0;
  var totalHeightRight = 0;

  metaCountHalfElementsLeft.each(function () {
    totalHeightLeft = totalHeightLeft + $(this).outerHeight(true);
  });

  metaCountHalfElementsRight.each(function () {
    totalHeightRight = totalHeightRight + $(this).outerHeight(true);
  });

  maxTotalHeight = Math.max(totalHeightLeft, totalHeightRight);

  projectSetMetaHeight();
}

function projectSetMetaHeight() {
  $(".information__description").css("height", "");

  var infoMetaFullHeight;
  var infoLayerBodyHeight = $(".project__layer__body").height();
  var infoDescriptionHeightOriginal = $(".information__description").height();
  var infoDescriptionHeight;

  if ($(window).width() > 700) {
    $(".information__meta").css("height", "unset");
    infoMetaFullHeight = $(".information__meta").outerHeight();

    $(".information__meta").css("height", maxTotalHeight + 10);
  } else {
    $(".information__meta").css("height", "");
  }

  if ($(".information__description").hasClass("readmore")) {
    if ($(window).width() > 700) {
      if ($(window).width() > 700 && $(window).width() < 900) {
        console.log("Tablet Hochformat");
        infoDescriptionHeight = infoLayerBodyHeight - maxTotalHeight - 190;
      } else if ($(window).width() > 900) {
        console.log("ab Tablet Querformat");
        infoDescriptionHeight = infoLayerBodyHeight - maxTotalHeight - 80;
      }

      if (infoDescriptionHeightOriginal > infoDescriptionHeight) {
        $(".readmore__wrapper").show();
        $(".information__description.readmore").css(
          "height",
          infoDescriptionHeight
        );
      } else if (infoDescriptionHeightOriginal < infoDescriptionHeight) {
        $(".readmore__wrapper").hide();
      }
    } else {
      $(".information__description.readmore").css("height", "50vh");
    }
  } else {
    $(".information__description").css("height", "");
  }
}

function projectReadMore() {
  $(".readmore__wrapper").click(function () {
    $(this).removeClass("visible").addClass("hidden");

    var $projectDescription = $(".information__description");

    var contentHeight = $projectDescription.addClass("autoheight").height();

    $projectDescription.removeClass("autoheight").animate(
      {
        height:
          contentHeight == $projectDescription.height() ? 100 : contentHeight,
      },
      500
    );

    $(".information__description").removeClass("readmore");
  });
}

var generalOpacityTimer;

function generalMinHeight() {
  var generalHeight = $("#general").innerHeight();

  clearTimeout(generalOpacityTimer);

  generalOpacityTimer = setTimeout(function () {
    $(".general__wrapper").css("opacity", "1");
  }, 500);

  if (generalHeight < 500) {
    $(".general__wrapper").css("height", "80vh");
  }
}
