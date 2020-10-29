$(document).ready(function () {
  $($('.section-manage__headings h2')[0]).css({ display: 'block' })
  $($('.section-manage__image')[0]).css({ display: 'block' })

  $('.section-manage__navitem').click(function () {
    navBtnId = $(this).index()

    $('.section-manage__headings h2').css({ display: 'none' })
    $('.section-manage__image').css({ display: 'none' })
    $('.section-manage__navitem').removeClass('section-manage__navitem--active')

    $($('.section-manage__headings h2')[navBtnId]).fadeIn()
    $($('.section-manage__image')[navBtnId]).fadeIn()
    $($('.section-manage__navitem')[navBtnId]).addClass(
      'section-manage__navitem--active'
    )
  })

  $('#button').click(function () {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $('.section-smart').offset().top,
      },
      1000
    )
  })
})
