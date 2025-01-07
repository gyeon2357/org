window.mobile = window.innerWidth <= 768

$(document).ready(function() {
  initWindows()
  initReady()
  initScrolled()
  initLazy()
  initSlideshows()
  initAccordions()
  initInlineTriggers()
  initFragments()
  initGrid()
  initLightbox()
  initExternalLinks()
  initDrawings()
  initProjectsFilter()
  initCarousel()
  initContactForm()
  initNewsletter()
  initCloseCover()
  initVimeoLinks()
  initFormatAddress()
  initIndexTrigger()
  initFolioForm()

  if(mobile) {
    initMobilePoems()
  }
})

function initFolioForm() {
  function facade() {
    $('.folio-form:not(.fac)').on('submit', function(event) {
      event.preventDefault()

      var data = {}

      data.firstname = $(this).find('input[name=firstname]').val()
      data.surname = $(this).find('input[name=surname]').val()
      data.email = $(this).find('input[name=email]').val()

      var categories = []

      $(this).find('input[type="checkbox"]:checked').each(function() {
        var val = $(this).attr('name').replace('categories[', '').replace(']', '')
        categories.push(val)
      })

      data.categories = categories.join(', ')

      $.post({url: window.home+'/folio', data: data})
    })

    $('.folio-form').addClass('fac')
  }

  $('nav a[data-slug="contact-us"]').on('click', function(event) {
    facade()
  })
}

function initIndexTrigger() {
  $('.index__trigger a.trigger-index').on('click', function(event) {
    event.preventDefault()
    $('body').addClass('index-sidebar-open')
  })
  $('.index__sidebar__close').on('click', function(event) {
    event.preventDefault()
    $('body').removeClass('index-sidebar-open')
  })
}

function initWindows() {
  var b = bowser.parse(navigator.userAgent)
  if(b && b.os && b.os.name === 'Windows') $('html').addClass('win')
}

function initFormatAddress() {
  $('#bottom .details, .addr').each(function() {
    var html = $(this).html()

    html = html.trim().replace(/<br>/g, '')
    var lines = html.split('\n')

    lines[1] = lines[1].replace(/P (.+)/, '<span class="sc">P</span> <span style="font-variant-numeric: normal;">$1</span>')
    lines[2] = lines[2].replace('E&amp;W', '<span class="sc">E&amp;W</span>')

    html = lines.join('<br>\n')

    $(this).html(html)
  })
}

function initCloseCover() {
  $('.close-cover').on('click', function(event) {
    event.preventDefault()
    $('body').removeClass('drawings-open').removeClass('contact-open')
  })
}

function initMobilePoems() {
  $('.projects-list').each(function() {
    var $list = $(this)
    var count = 0
    $list.find('.projects-item').each(function() {
      var $item = $(this)
      var isPoem = $(this).hasClass('projects-item--poem')
      count += isPoem ? 2 : 1
      if(isPoem && count % 2 !== 0) {
        if($(this).next()) $(this).insertAfter($(this).next())
      }
    })
  })
}

function initContactForm() {
  var $overlay = $('.contact-overlay')
  $('body').on('click', '.contact-overlay .close-icon', function(event) {
    event.preventDefault()
    $('body').removeClass('contact-open')
  })

  $('body').on('click', 'nav a[data-slug="contact-us"]', function(event) {
    event.preventDefault()
    $('body').addClass('contact-open')
  })

  $('.contact-overlay form').on('submit', function(event) {
    event.preventDefault()
    $overlay.find('form').hide()
    $overlay.find('.contact-overlay__thanks').show()
  })
}

function initNewsletter() {
  var $overlay = $('.newsletter-overlay')
  $('body').on('click', '.newsletter-overlay .close-icon', function(event) {
    event.preventDefault()
    $('body').removeClass('newsletter-open')
  })

  $('body').on('click', '.newsletter-trigger', function(event) {
    event.preventDefault()
    $('body').addClass('newsletter-open')
  })

  $('.newsletter-overlay form').on('submit', function(event) {
    $overlay.find('form').hide()
    $overlay.find('.newsletter-overlay__thanks').show()
  })
}

function initCarousel() {
  $('body').on('click', '.click-carousel', function(event) {
    var slides = $(this).children()
    var current = slides.filter('.open').index()

    var next = (current + 1) % slides.length

    slides.eq(next).addClass('open').siblings().removeClass('open')
  })
}

function initInlineTriggers() {
  function linkFrag(link, match) {
    var fignum = parseInt(match)
    var $trigger = $('[data-fragment-num="'+fignum+'"]')
    if($trigger) $(link).attr('data-fragment-trigger', $trigger.attr('data-fragment-trigger')).css('cursor', 'pointer')
  }

  $('.project__initial__text a').each(function() {
    if(this.hostname === window.location.hostname && this.pathname.endsWith('/details')) {
      $(this).addClass('drawings-trigger')
    }
  })

  $('p a').each(function() {
    if(this.hostname === window.location.hostname && this.pathname.endsWith('/details')) {
      $(this).addClass('drawings-trigger').text('('+$(this).text()+')').css('cursor', 'pointer')
    }
  })

  $('p strong').each(function() {
    var text = $(this).text()
    var matches = text.match(/\(see (.+)\)/i)
    if(matches && matches[1]) {
      var target = matches[1].toLowerCase()
      var figmatch = target.match(/fig\.? (\d+)/i)
      var drawingsmatch = target.match(/drawings/i)
      var fragmatch = target.match(/fragment (\d+)/i)
      if(fragmatch && fragmatch[1]) {
        linkFrag(this, fragmatch[1])
      } else if(figmatch && figmatch[1]) {
        linkFrag(this, figmatch[1])
      } else if(drawingsmatch) {
        $(this).addClass('drawings-trigger').css('cursor', 'pointer')
      }
    }
  })
}

function initProjectsFilter() {
  function setFilter(cat) {
    window.scrollTo({top: 0, behavior: 'smooth'})

    if(cat) {
      $('.projects-item').hide()
      $('.projects-item').filter(function() {
        return $(this).attr('data-category').split(',').map(function(s) {return s.trim()}).includes(cat)
      }).show()
    } else {
      $('.projects-item').show()
    }
  }

  $('.top__filters a[data-filter-category]').on('click', function(event) {
    event.preventDefault()

    if($(this).hasClass('active')) {
      $(this).removeClass('active')
      setFilter(null)
    } else {
      var cat = $(this).attr('data-filter-category')
      $(this).addClass('active').siblings().removeClass('active')
      setFilter(cat)
    }
  })
}

function initDrawings() {
  $('.drawings-trigger').on('click', function(event) {
    event.preventDefault()
    $('body').addClass('drawings-open')
  })

  $('.drawings .close-icon').on('click', function(event) {
    event.preventDefault()
    $('body').removeClass('drawings-open')
  })
}

function initExternalLinks() {
  $('a').each(function() {
    if(this.host !== window.location.host) $(this).attr('target', '_blank')
  })
}

function initVimeoLinks() {
  $('a').each(function() {
    if(this.host === 'vimeo.com' || this.host === 'www.vimeo.com') {
      $(this).on('click', function(event) {
        event.preventDefault()

        var matches = this.href.match(/vimeo\.com\/(\d+)/)

        if(matches) {
          var id = matches[1]
          var $html = $(`<iframe src="https://player.vimeo.com/video/${id}?autoplay=1" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`)

          var $videoOverlay = $('<div class="video-overlay" />')

          var $videoWrap = $('<div class="video-wrap" style="position: relative;" />')
          $videoWrap.append($('<div class="video-sizer" style="padding-top: calc(100% * 9 / 16); width: 100%; height: 0;" />'))
          $videoWrap.append($html)

          var $close = $(`<a class="close-icon" href="#">
            <svg  viewBox="0 0 100 100">
              <line x1="0" y1="0" x2="100" y2="100" />
              <line x1="0" y1="100" x2="100" y2="0" />
            </svg>
          </a>`)

          $close.on('click', function(event) {
            event.preventDefault()
            $videoOverlay.fadeOut(function() {
              $videoOverlay.remove()
            })
          })

          $videoOverlay.append($close)
          $videoOverlay.append($videoWrap)

          $('body').append($videoOverlay)
        }
      })
    }
  })
}

function initLightbox() {
  window.addEventListener('popstate', function(event) {
    if(window.location.hash !== '#lightbox') {
      if(isLightboxOpen()) closeLightbox()
    }
  })

  $(window).on('keydown', function(event) {
    if('value' in event.target) return
    var lightboxOpen = $('.lightbox').is(':visible')
    if(lightboxOpen) {
      if(event.key === 'Escape') closeLightbox(true)
      if(event.key === 'ArrowRight') go(1)
      if(event.key === 'ArrowLeft') go(-1)
    }
  })

  $('body').on('click', '.lightbox-trigger', function(event) {
    event.preventDefault()
    createLightbox(this)
  })

  var $triggers
  var $lightbox
  var $close
  var $slides

  function isLightboxOpen() {
    return $('.lightbox').length
  }

  function createLightbox(el) {
    $triggers = $('.lightbox-trigger, [data-lightbox-element]')

    if($('body').attr('data-template') === 'index') $triggers = $triggers.filter(':visible')

    $lightbox = $('<div class="lightbox" />')

    $close = $(`
      <a class="close-icon" href="#">
        <svg  viewBox="0 0 100 100">
          <line x1="0" y1="0" x2="100" y2="100" />
          <line x1="0" y1="100" x2="100" y2="0" />
        </svg>
      </a>
    `)

    $lightbox.append($close)

    $lightbox
      .append('<div class="lightbox__nav prev" />')
      .append('<div class="lightbox__nav next" />')

    $close.on('click', function(event) {
      event.preventDefault()
      closeLightbox(true)
    })

    $lightbox.on('click', '.lightbox__nav', function(event) {
      if($(this).hasClass('next')) {
        go(1)
      } else {
        go(-1)
      }
    })

    $triggers.each(function(i) {
      var src = $(this).attr('data-lightbox-element')

      var projectSlug = $(this).attr('data-project-slug')
      var projectTitle = $(this).attr('data-project-title')
      var caption = $(this).attr('data-caption')

      if(!src) src = this.href
      var $slide = $('<div class="lightbox__slide" />')
      var $figure = $('<figure />')
      var $num = $(this).closest('figure').find('.number').clone()
      if(!$num || !$num.length) $num = $(this).find('.number').clone()

      var $img = $('<div class="image" />').append(
        $('<img />').attr('src', src)
      )
      var $counts = $('<div class="counts gill" />').text(i+1 + ' / ' + $triggers.length)

      if(projectSlug) {
        $figure.append(
          $('<div class="lightbox__slide__corner gill" />')
          .append($('<a href="'+window.home+'/projects/'+projectSlug+'" />')
            .text(projectTitle))
        )
      }

      if(caption) {
        $figure.append(
          $('<div class="lightbox__slide__caption gill" />').html(caption)
        )
      }

      $lightbox.append(
        $slide.append(
          $figure.append($num).append($img).append($counts)
        )
      )
    })

    $('body').append($lightbox)
    $slides = $('.lightbox__slide')

    $lightbox.fadeIn('fast')

    window.location.hash = '#lightbox'

    showSlide(el)
  }

  function showSlide(el) {
    var $link = $(el)
    var index = $triggers.index($link)
    $slides.eq(index).fadeIn('fast').siblings('.lightbox__slide').fadeOut('fast')
  }

  function go(dir) {
    var total = $('.lightbox__slide').length
    var currentIndex = $('.lightbox__slide').index($('.lightbox__slide:visible'))
    var nextIndex = (currentIndex + dir) % total

    var $target = $triggers.eq(nextIndex)
    showSlide($target.get(0))
  }

  function closeLightbox(push) {
    $lightbox.fadeOut('fast', function() {
      $lightbox.remove()
      if(push) history.replaceState(null, null, window.location.pathname)
    })
  }
}

function initGrid() {
  $(window).on('keydown', function(event) {
    if('value' in event.target) return
    if(event.key === 'g') {
      $('.grid')
        .toggle()
        .css('marginLeft', window.innerWidth - document.documentElement.clientWidth)
    }
  })
}

function initSlideshows() {
  $('.slideshow').each(function() {
    var $slideshow = $(this)
    var $slides = $slideshow.find('.slideshow__slide')

    function next() {
      var $active = $slides.filter('.active')
      var $target = $active.next('.slideshow__slide')

      if(!$target.length) $target = $slides.first()

      go($target)
    }

    function go($target) {
      $slides.removeClass('active')
      $target.addClass('active')
    }

    function prev() {
      var $active = $slides.filter('.active')
      var $target = $active.prev('.slideshow__slide')

      if(!$target.length) $target = $slides.last()

      go($target)
    }

    $slideshow.find('.slideshow__left').on('click', prev)
    $slideshow.find('.slideshow__right').on('click', next)
  })
}

function initLazy() {
  new LazyLoad({elements_selector: '.lazy'})
}

function initScrolled() {
  var scrolled
  var threshold = 10

  function onScroll() {
    var _scrolled = window.scrollY > threshold
    if(scrolled !== _scrolled) {
      scrolled = _scrolled
      $('body')[scrolled ? 'addClass' : 'removeClass']('scrolled')
    }
  }

  $(window).on('scroll', onScroll)
  onScroll()
}

function initReady() {
  $('body').addClass('ready')
  $(window).on('beforeunload', function() {
    $('body').removeClass('ready')
  })
}

function initAccordions() {
  $('.accordion').each(function() {
    var $accordion = $(this)
    $accordion.find('.accordion__item').on('click', function() {
      if($(this).hasClass('open')) return
      $accordion.find('.accordion__item').removeClass('open')
      $(this).addClass('open')
    })

    $('.accordion__item__heading').on('click', function(event) {
      var $item = $(this).closest('.accordion__item')
      if($item.hasClass('open')) {
        event.stopPropagation()
        $item.removeClass('open')
      }
    })
  })
}

function initFragments() {
  $('body')
    .on('click', '[data-fragment-trigger]', function(event) {
      event.preventDefault()
      var fragmentId = $(this).attr('data-fragment-trigger')
      var $fragment = $('[data-fragment="'+fragmentId+'"]')
      if($(this).closest('.accordion__item').length) {
        $fragment = $(this).closest('.accordion__item').find('[data-fragment="'+fragmentId+'"]')
      }
      $fragment.addClass('open')
      $('body').addClass('prevent-scroll')
    })
    .on('click', '.fragment .close-icon', function(event) {
      event.preventDefault()
      var $fragment = $(this).parents('.fragment')
      $fragment.removeClass('open')
      $('body').removeClass('prevent-scroll')
    })
}
