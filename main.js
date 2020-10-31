$(document).ready(function () {
  $($('.section-manage__headings h2')[0]).css({ display: 'block' })
  $($('.section-manage__image')[0]).css({ display: 'block' })

  function goToSlide(index) {
    $('.section-manage__headings h2').css({ display: 'none' })
    $('.section-manage__image').css({ display: 'none' })
    $('.section-manage__navitem').removeClass('section-manage__navitem--active')

    $($('.section-manage__headings h2')[index]).fadeIn()
    $($('.section-manage__image')[index]).fadeIn()
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
