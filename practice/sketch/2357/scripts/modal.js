// (function () {
//   var isTouch = false;
//   var simulated_flag = "handler_simulated";
//   var touch_click_array = {};
//   const clickMoveThreshold = 20; //Pixels

//   function mouseHandler(event) {
//     if (isTouch) {
//       if (!event.hasOwnProperty(simulated_flag)) {
//         //Unreliable mouse commands - In my opinion
//         var fixed = new jQuery.Event(event);
//         fixed.preventDefault();
//         fixed.stopPropagation();
//       }
//     } else {
//       //Mouse commands are consistent
//       //TODO: generate corresponding touches
//     }
//   }

//   function mouseFromTouch(type, touch) {
//     var event = document.createEvent("MouseEvent");
//     event.initMouseEvent(
//       type,
//       true,
//       true,
//       window,
//       1,
//       touch.screenX,
//       touch.screenY,
//       touch.clientX,
//       touch.clientY,
//       false,
//       false,
//       false,
//       false,
//       0,
//       null
//     );
//     event[simulated_flag] = true;

//     touch.target.dispatchEvent(event);
//   }

//   function touchHandler(event) {
//     var touches = event.changedTouches,
//       first = touches[0],
//       type = "";

//     if (!event.hasOwnProperty(simulated_flag)) {
//       isTouch = true;

//       //Simulate mouse commands
//       switch (event.type) {
//         case "touchstart":
//           for (var i = 0; i < touches.length; i++) {
//             var touch = touches[i];
//             touch_click_array[touch.identifier] = {
//               x: touch.screenX,
//               y: touch.screenY,
//             };
//           }
//           mouseFromTouch("mousedown", first);
//           break;
//         case "touchmove":
//           for (var i = 0; i < touches.length; i++) {
//             var touch = touches[i];
//             var id = touch.identifier;
//             var data = touch_click_array[id];
//             if (data !== undefined) {
//               if (
//                 Math.abs(data.x - touch.screenX) +
//                   Math.abs(data.y - touch.screenY) >
//                 clickMoveThreshold
//               ) {
//                 delete touch_click_array[id];
//               }
//             }
//           }
//           mouseFromTouch("mousemove", first);
//           break;
//         case "touchcancel":
//           break;
//         case "touchend":
//           mouseFromTouch("mouseup", first);
//           for (var i = 0; i < touches.length; i++) {
//             var touch = touches[i];
//             if (touch_click_array.hasOwnProperty(touch.identifier)) {
//               mouseFromTouch("click", touch);
//               delete touch_click_array[touch.identifier];
//             }
//           }
//           break;
//       }
//     }
//   }

//   document.addEventListener("mousedown", mouseHandler, true,);
//   document.addEventListener("mousemove", mouseHandler, true);
//   document.addEventListener("mouseup", mouseHandler, true);
//   document.addEventListener("click", mouseHandler, true, { once : true});

//   document.addEventListener("touchstart", touchHandler, true);
//   document.addEventListener("touchmove", touchHandler, true);
//   document.addEventListener("touchcancel", touchHandler, true);
//   document.addEventListener("touchend", touchHandler, true, { once : true});
// })();

// var ebModal1 = document.getElementById("mark1Modal");
// var ebBtn1 = document.getElementById("mark1");
// var ebSpan1 = document.getElementsByClassName("ebcf_close1")[0];

// ebBtn1.onclick = function () {
//   ebModal1.style.display = "none";
// };

// ebSpan1.onclick = function () {
//   ebModal1.style.display = "none";
// };

// window.onclick = function (event) {
//   if (event.target == ebModal1) {
//     ebModal1.style.display = "none";
//   }
// };



$(window).on('load', function() {
  var $header = $('.header');
  var $title = $('.title');
  var $main = $('.main');
  var delay = 1000;
  setTimeout(function() {
    $title.fadeIn(delay);
    setTimeout(function() {
      $title.find('div').eq(0).show(0);
      setTimeout(function() {
        $title.find('div').eq(0).fadeOut(delay, function() {
          $title.find('div').eq(1).show(0);
          setTimeout(function() {
            $title.find('div').eq(1).fadeOut(delay, function() {
              $title.find('div').eq(2).show(0);
              setTimeout(function() {
                $title.find('div').eq(2).fadeOut(delay, function() {
                  $title.find('div').eq(3).show(0);
                  setTimeout(function() {
                    $title.find('div').eq(3).fadeOut(delay, function() {
                      $header.fadeOut(delay);
                      $main.animate({
                        'margin-top': 0
                      }, delay);
                      $('html, body').scrollTop(0);
                      $('body').removeClass('fixed');
                    });
                  }, delay * 0.8);
                });
              }, delay);
            });
          }, delay);
        });
      }, delay);
    }, delay);
  }, delay * 0.8);
});
