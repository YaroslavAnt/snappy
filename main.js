$(document).ready(function () {
  const titles = [
    'Take <b>visual notes</b>',
    '<b>Reference information</b> between windows. No more Command+Tab',
    '<b>Instant sharing</b> via Snappy Link',
    '<b>Secure sharing</b> with self destruct',
    '<b>Collect & Manage</b> important stuff',
  ]
  const images = [
    './assets/img/library-window-ms.21656c74.png',
    './assets/img/for-visual-notes-ms.9453d89e.png',
    './assets/img/for-fast-sharing-ms.213133d2.png',
    './assets/img/for-secure-sharing-ms.162756ee.png',
    './assets/img/for-inspiration-ms.74ce6beb.png',
  ]

  $($('.section-manage__headings h2')[0]).html(titles[0])
  $($('.section-manage__image')[0]).css({
    backgroundImage: `url(${images[0]})`,
  })

  function goToSlide(index) {
    $($('.section-manage__headings h2')[0]).html(titles[index])
    $($('.section-manage__image')[0]).css({
      backgroundImage: `url(${images[index]})`,
    })

    $('.section-manage__headings h2').css({ display: 'none' })
    $('.section-manage__image').css({ display: 'none' })
    $('.section-manage__navitem').removeClass('section-manage__navitem--active')

    $('.section-manage__headings h2').fadeIn()
    $('.section-manage__image').fadeIn()
    $($('.section-manage__navitem')[index]).addClass(
      'section-manage__navitem--active'
    )
  }

  function scroll(selector) {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $(selector).offset().top,
      },
      1000
    )
  }

  function toggleMenu() {
    console.log('menu')
    $('.menu-btn img').toggleClass('hide')
    $('.nav--mobile').toggleClass('hide')
  }

  $('.menu-btn').click(toggleMenu)

  $('#button').click(function () {
    scroll('.section-smart')
  })

  $('.section-manage__navitem').click(function () {
    navBtnIdx = $(this).index()
    goToSlide(navBtnIdx)
  })
})
