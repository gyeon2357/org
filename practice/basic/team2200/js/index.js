// * grateful for (c) minguhong, 2021. 09. 14. //

$(document).ready(function() {
  $('html, body').scrollTop(0);
  $content = $('.content');
  $link = $content.find('a');
  $link.on('click', function(e) {
    e.preventDefault();
    var href = $(this).attr('href');
    var options = 'width=1080, height=720, status=no, menubar=no, toolbar=no';
    window.open(href, '', options);
  });
});

$(window).on('load', function() {
  var $header = $('.header');
  var $title = $('.title');
  var $main = $('.main');
  var delay = 750;
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
                  }, delay * 0.7);
                });
              }, delay);
            });
          }, delay);
        });
      }, delay);
    }, delay);
  }, delay * 0.7);
});