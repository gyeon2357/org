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
$(document).ready(function () {
  $("body").addClass(localStorage.getItem("body-class") || "white");
  $("#mode.dark").click(function (e) {
    var name = e.target.className;
    $("body").removeClass("white dark").toggleClass(name);
    localStorage.setItem("body-class", name);
  });

  //Count
  var galleryN = $(".archive .project").length;
  var uiN = $(".archive .project.ui").length;
  var printingN = $(".archive .project.printing").length;
  var collabsN = $(".archive .project.collabs").length;

  $(".index").find("a.count").html(galleryN);
  $("#ui").find("a.count").html(uiN);
  $("#printing").find("a.count").html(printingN);
  $("#collabs").find("a.count").html(collabsN);

  //Accordion
  $(function () {
    const accordions = document.getElementsByClassName("accordion");

    Array.from(accordions).forEach((accordion) => {
      const label = accordion.querySelector(".accordion-label");
      const content = accordion.querySelector(".accordion-content");

      // content.style.setProperty(
      //   "--content-height",
      //   content.offsetHeight + "px"
      // );

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

  //view button
  $(".index").click(function () {
    $(this).toggleClass("active");
    $(".archive, .subsection, .info-inside").toggle();
    $("#index-global").toggleClass("grid");
    $("#index, .gallery").toggle();
    $("#grid").toggleClass("on");

    $(this).find("span").toggle();
    $(this).find("p").toggle();
    $(".accordion").attr("data-accordion-state", "closed");
  });

  // initial button
  $(".link").each(function (i) {
    $(this).click(function () {
      $(".index").toggleClass("active");
      $(".archive, .subsection, .info-inside").toggle();
      $("#index-global").toggleClass("grid");
      $("#index, .gallery").toggle();
      $("#grid").toggleClass("on");

      $(".index").find("span").toggle();
      $(".index").find("p").toggle();

      var offset = $(".accordion").eq(i).offset();
      $(".accordion").eq(i).attr("data-accordion-state", "opened");
      $(".accordion").eq(i).find(".accordion-content").focus();

      // $("html, body").animate({ scrollTop: offset.top / 2 }, 200);
    });
  });

  $(".contact").click(function () {
    $(this).toggleClass("active");
    $(".rrss").toggle();
  });

  $("#index-global .project").hover(function () {
    $(this).toggleClass("up");
    $("#index-global .project").toggleClass("zindex");
  });

  // $(document).mousemove(function (e) {
  //   $(".cover-popup").css({
  //     left: e.pageX,
  //     top: e.pageY,
  //   });
  // });

  $("#grid").click(function () {
    $(this).toggleClass("active");
    $("#grid span").toggle();
    $("#grid a").toggle();
    $(".archive").toggleClass("change");
    $(".subsection").toggleClass("change");
  });

  $(".sp").click(function () {
    $(".about").toggle();
    $(".sp span").toggle();
    $(".sp a").toggle();
  });

  $(".open-menu").click(function () {
    $(".hidden").toggle();
    $(".open-menu span").toggle();
    $(".open-menu a").toggle();
  });

  // Filters
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
  });
});

// setTimeout(function () {
//   $(".accordion-content").addClass("accordion-content-property");
// }, 250);
