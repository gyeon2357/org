document.addEventListener("DOMContentLoaded", function () {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
});

//Variables
document.addEventListener("DOMContentLoaded", function () {
  var w = window.innerWidth,
    h = window.innerHeight;
  document.documentElement.style.setProperty("--h", h + "px");

  // s = document.getElementById("header").offsetHeight;
  // document.documentElement.style.setProperty("--large", s + "px");

  // n = document.getElementById("index").offsetHeight;
  // document.documentElement.style.setProperty("--l", n + "px");
});

//Variables on resize
window.addEventListener("resize", onResizeFunction);
function onResizeFunction(e) {
  var w = window.innerWidth,
    h = window.innerHeight;
  document.documentElement.style.setProperty("--h", h + "px");

  s = document.getElementById("header").offsetHeight;
  document.documentElement.style.setProperty("--large", s + "px");

  n = document.getElementById("index").offsetHeight;
  document.documentElement.style.setProperty("--l", n + "px");
}

//Local storage
//theme
$(document).ready(function () {
  //load

  setTimeout(function () {
    $(".card-btn").fadeIn(200);
  }, 750);

  $(".card-btn").on("click", function () {
    $(".loading").fadeOut();
  });

  //theme
  $("body").addClass(localStorage.getItem("body-theme") || "white");
  $("#mode.dark").click(function (e) {
    var name = e.target.className;
    $("body").removeClass("white dark").toggleClass(name);
    localStorage.setItem("body-theme", name);
  });

  //lang
  const langButton = document.querySelector("#lang");
  const body = document.body;
  let lang = localStorage.getItem("lang") || "kor";
  $("body").addClass(lang);

  langButton.addEventListener("click", function () {
    lang == "kor" ? (lang = "eng") : (lang = "kor");
    $("body").removeClass("kor eng").addClass(lang);
    localStorage.setItem("lang", lang);
  });

  //eng-button-fnc
  $("body.eng").find("#lang").children("a").hide();
  $("body.eng").find("#lang").children("span").addClass("flex");

  //   $("body").addClass(localStorage.getItem("body-lang") || "kor");;
  // // $("body").removeClass("kor eng").addClass(lang);
  //   $("#lang").click(function (j) {

  //     var lang = j.target.className;
  //     $("body").removeClass("kor eng").toggleClass(lang);
  //     localStorage.setItem("body-lang", lang);
  //   });

  //   $("body.eng").find("#lang").children("a").hide();
  //   $("body.eng").find("#lang").children("span").addClass("flex");

  //Count
  var galleryN = $(".gallery-container .project").length;
  var webN = $(".gallery-container .project.web").length;
  var printingN = $(".gallery-container .project.printing").length;
  var planningN = $(".gallery-container .project.planning").length;
  var collabN = $(".gallery-container .project.collab").length;

  $(".intro-project-wrap").find("a.count").html(galleryN);
  $(".index").find("a.count").html(galleryN);
  $("#web").find("a.count").html(webN);
  $("#printing").find("a.count").html(printingN);
  $("#planning").find("a.count").html(planningN);
  $("#collab").find("a.count").html(collabN);

  //Accordion
  $(function () {
    const accordions = document.getElementsByClassName("accordion");

    Array.from(accordions).forEach((accordion) => {
      const label = accordion.querySelector(".accordion-label");
      const content = accordion.querySelector(".accordion-content");

      content.style.setProperty(
        "--content-height",
        content.offsetHeight + "px"
      );

      function getState() {
        return accordion.getAttribute("data-accordion-state");
      }

      function setState(state) {
        accordion.setAttribute("data-accordion-state", state);
      }

      setState("closed");

      label.addEventListener("click", () => {
        const holdState = getState();

        closeAllAccordions();

        if (holdState === "closed") {
          setState("opened");
        } else {
          setState("closed");
        }
      });
    });

    function closeAllAccordions() {
      Array.from(accordions).forEach((accordion) => {
        accordion.setAttribute("data-accordion-state", "closed");
      });
    }
  });

  //view btn
  $(".index").click(function () {
    $(this).toggleClass("active");
    $(".gallery-container, .subsection, .info-inside").toggle();
    $("#index-container").toggleClass("grid");
    $("#index, .gallery").toggle();
    $("#grid").toggleClass("on");

    $(this).find("span").toggleClass("flex");
    $(this).find("p").toggle();
    $(".accordion").attr("data-accordion-state", "closed");
  });

  // gallery -> index btn
  $(".link").each(function (i) {
    $(this).click(function () {
      $(".index").toggleClass("active");
      $(".gallery-container, .subsection, .info-inside").toggle();
      $("#index-container").toggleClass("grid");
      $("#index, .gallery").toggle();
      $("#grid").toggleClass("on");

      $(".index").find("span").toggleClass("flex");
      $(".index").find("p").toggle();

      var offset = $(".accordion").eq(i).offset();
      $(".accordion").eq(i).attr("data-accordion-state", "opened");
      $(".accordion").eq(i).find(".accordion-content").focus();

      $("html, body").animate({ scrollTop: offset.top - 200 }, 200);
    });
  });

  // index -> index btn
  $(".accordion-label").bind("click", function () {
    var self = this;
    setTimeout(function () {
      theOffset = $(self).offset();
      $("body,html").animate({ scrollTop: theOffset.top - 200 }, 400);
    }, 50);
  });

  $("#lang").click(function () {
    $(this).find("a").toggle();
    $(this).find("span").toggleClass("flex");
  });

  $(".contact").click(function () {
    $(this).toggleClass("active");
    $(".rrss").toggle();
  });

  $("#index-container .project").hover(function () {
    $(this).toggleClass("up");
    $("#index-container .project").toggleClass("zindex");
  });

  $(document).mousemove(function (e) {
    $(".cover-popup").css({
      left: e.pageX,
      top: e.pageY,
    });
  });

  $("#grid").click(function () {
    $(this).toggleClass("active");
    $("#grid span").toggleClass("flex");
    $("#grid a").toggle();
    $(".gallery-container").toggleClass("change");
    $(".subsection").toggleClass("change");
  });

  $(".nav-title").click(function () {
    $(".about").toggle();
    $(".nav-title span").toggleClass("flex");
    $(".nav-title a").toggle();
  });

  $(".open-menu").click(function () {
    $(".hidden").toggle();
    $(".open-menu span").toggleClass("flex");
    $(".open-menu a").toggle();
  });

  //Filters
  $(".categorie").on("click", function (e) {
    $(".project").addClass("filter-opacity");
    $(".categorie").not($(this)).removeClass("active");

    if (!$(this).hasClass("active")) {
      $("." + e.currentTarget.id).removeClass("filter-opacity");
      $(this).addClass("active");
    } else {
      $(".project").removeClass("filter-opacity");
      $(this).removeClass("active");
    }

    //Filter-position
    if ($("#index-container").hasClass("grid")) {
      var offsetIndex = $(
        "#index-container .accordion:not(:has(.filter-opacity))"
      ).offset();
      // console.log(offsetIndex);

      $("html, body").animate({ scrollTop: offsetIndex.top - 200 }, 200);
    } else {
      var offsetGallery = $(".gallery-container .project")
        .not("[class*='filter-opacity']")
        .offset();

      // console.log(offsetGallery);
      $("html, body").animate({ scrollTop: offsetGallery.top - 200 }, 200);
    }
  });
});

//Keypress
$(document).on("keyup", ".nav", function (e) {
  if (e.which == 13) showNavTextConsole($(e.target).click());
});

function showNavTextConsole(text) {
  console.log(text);
}

$(document).on("keyup", "#index-container", function (e) {
  if (e.which == 13)
    $(e.target).attr(
      "data-accordion-state",
      $(e.target).attr("data-accordion-state") === "opened"
        ? "closed"
        : "opened"
    );

  $(e.target).find(".accordion-content").focus();
});

function showIndexTextConsole(text) {
  console.log(text);
}

setTimeout(function () {
  $(".accordion-content").addClass("accordion-content-property");
}, 250);
