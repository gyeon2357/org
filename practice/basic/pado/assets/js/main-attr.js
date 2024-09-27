$(".atlas__item a.atlas__item__link").each(function () {
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
      res100 +
      partsrc +
      " " +
      "100w, " +
      "https://ik.imagekit.io/11195/" +
      res150 +
      partsrc +
      " " +
      "150w, " +
      "https://ik.imagekit.io/11195/" +
      res300 +
      partsrc +
      " " +
      "300w, " +
      "https://ik.imagekit.io/11195/" +
      res800 +
      partsrc +
      " " +
      "800w, " +
      "https://ik.imagekit.io/11195/" +
      res1024 +
      partsrc +
      " " +
      "1024w, " +
      "https://ik.imagekit.io/11195/" +
      res1400 +
      partsrc +
      " " +
      "1400w, " +
      "https://ik.imagekit.io/11195/" +
      res2000 +
      partsrc +
      " " +
      "2000w"
  );

   img.attr(
    "srcset",
    "https://ik.imagekit.io/11195/" +
      res100 +
      partsrc +
      " " +
      "100w, " +
      "https://ik.imagekit.io/11195/" +
      res150 +
      partsrc +
      " " +
      "150w, " +
      "https://ik.imagekit.io/11195/" +
      res300 +
      partsrc +
      " " +
      "300w, " +
      "https://ik.imagekit.io/11195/" +
      res800 +
      partsrc +
      " " +
      "800w, " +
      "https://ik.imagekit.io/11195/" +
      res1024 +
      partsrc +
      " " +
      "1024w, " +
      "https://ik.imagekit.io/11195/" +
      res1400 +
      partsrc +
      " " +
      "1400w, " +
      "https://ik.imagekit.io/11195/" +
      res2000 +
      partsrc +
      " " +
      "2000w"
  );

  console.log(datasrc);
});
