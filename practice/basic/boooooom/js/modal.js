var ebModal1 = document.getElementById('mark1Modal');
var ebBtn1 = document.getElementById("mark1");
var ebSpan1 = document.getElementsByClassName("ebcf_close1")[0];

ebBtn1.onclick = function() {
    ebModal1.style.display = "block";
}

ebSpan1.onclick = function() {
    ebModal1.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == ebModal1) {
        ebModal1.style.display = "none";
    }
}

$(document).ready(function () {
  $("#mark2").click(function () {
    $(".ebcf_modal2").addClass("block");
  });
});
$(document).ready(function () {
  $(".ebcf_modal2").click(function () {
    $(".ebcf_modal2").removeClass("block");
  });
});

$(document).ready(function () {
  $("#mark3").click(function () {
    $(".ebcf_modal3").css("display", "none");
  });
  
});
$(document).ready(function () {
  $(".ebcf_modal3").click(function () {
    $(".ebcf_modal3").css("display", "none");
  });
});

$(document).ready(function () {
  $("#mark4").click(function () {
    $(".ebcf_modal4").css("display", "none");
  });
  
});
$(document).ready(function () {
  $(".ebcf_modal4").click(function () {
    $(".ebcf_modal4").css("display", "none");
  });
});

