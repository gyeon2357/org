$(function () {
  $(".slideshow__item").each(function () {
    var img = $(this).find("img");
    var src = img.attr("src");
    var datasrc = img.attr("data-srcset");

    var res100 = "tr:w-100/";
    var res150 = "tr:w-150/";
    var res300 = "tr:w-300/";
    var res800 = "tr:w-800/";
    var res1024 = "tr:w-1024/";
    var res1400 = "tr:w-1400/";
    var res2000 = "tr:w-2000/";

    var partsrc = src.replace("https://ik.imagekit.io/11195/", "");

    img.attr(
      "data-srcset",
      "https://ik.imagekit.io/11195/" +
        partsrc +
        res100 +
        " " +
        "100w, " +
        "https://ik.imagekit.io/11195/" +
        partsrc +
        res150 +
        " " +
        "150w, " +
        "https://ik.imagekit.io/11195/" +
        partsrc +
        res300 +
        " " +
        "300w, " +
        "https://ik.imagekit.io/11195/" +
        partsrc +
        res800 +
        " " +
        "800w, " +
        "https://ik.imagekit.io/11195/" +
        partsrc +
        res1024 +
        " " +
        "1024w, " +
        "https://ik.imagekit.io/11195/" +
        partsrc +
        res1400 +
        " " +
        "1400w, " +
        "https://ik.imagekit.io/11195/" +
        partsrc +
        res2000 +
        " " +
        "2000w"
    );
  });

  $(".item__wrapper").each(function () {
    var img = $(this).find("img");
    var src = img.attr("src");
    var datasrc = img.attr("data-srcset");

    var res100 = "tr:w-100/";
    var res150 = "tr:w-150/";
    var res300 = "tr:w-300/";
    var res800 = "tr:w-800/";
    var res1024 = "tr:w-1024/";
    var res1400 = "tr:w-1400/";
    var res2000 = "tr:w-2000/";

    var partsrc = src.replace("https://ik.imagekit.io/11195/", "");

    img.attr(
      "data-srcset",
      "https://ik.imagekit.io/11195/" +
        partsrc +
        res100 +
        " " +
        "100w, " +
        "https://ik.imagekit.io/11195/" +
        partsrc +
        res150 +
        " " +
        "150w, " +
        "https://ik.imagekit.io/11195/" +
        partsrc +
        res300 +
        " " +
        "300w, " +
        "https://ik.imagekit.io/11195/" +
        partsrc +
        res800 +
        " " +
        "800w, " +
        "https://ik.imagekit.io/11195/" +
        partsrc +
        res1024 +
        " " +
        "1024w, " +
        "https://ik.imagekit.io/11195/" +
        partsrc +
        res1400 +
        " " +
        "1400w, " +
        "https://ik.imagekit.io/11195/" +
        partsrc +
        res2000 +
        " " +
        "2000w"
    );
  });
});
