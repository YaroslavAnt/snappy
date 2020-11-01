$(document).ready(function () {
  let localActivities = []
  let sortBy = 'cheap to expensive'
  let filterBy = ''
  let countToShow = 2

  function generateCard(activity) {
    const {
      name,
      price,
      description,
      popular,
      images,
      dates,
      category,
    } = activity

    let imagesMarkupStr = ``

    images.forEach((image) => {
      imagesMarkupStr += `<img src=${image} alt=${name}/>`
    })

    return `
    <article class="card">
        <div class="card__controls">
          <button class="card__controls-btn">Add to cart</button>
          <p class="body1">
            <span class="h2"> <b>${price}+</b></span> / per ticket
          </p>
          <div class="card__controls-counter">
            <button class="card__controls-change">-</button>
            <span class="card__controls-count">0</span>
            <button class="card__controls-change">+</button>
          </div>
        </div>

        <div class="card__content">
          <div class="card__content-text">
            <h2 class="card__content-title"><b>${name}</b></h2>

            <p class="body1">
              ${description.slice(0, 200)} ...
              <span class="toggle-show">Show more</span>
            </p>
            <p class="body1 hide">
              ${description}
              <span class="toggle-show">Show less</span>
            </p>
            <div class="card__content-footer body2">
              <div style='text-align:left'>
                <span>${category.join(', ')}</span><br/>
                <span>Popular: ${popular ? 'Yes' : 'No'}</span>
              </div>
              <div>
                <p>${dates[0]} - ${dates[1]} <i class="fas fa-clock"></i></p>
                <p>place <i class="fas fa-map-marker-alt"></i></p>
              </div>
            </div>
          </div>

          <div
            class="card__content-img"
            style="
              background-image: url('${images[0]}');
            "
          >
            <span class="card__content-gallery"
              ><i class="fas fa-expand-alt"></i
            ></span>
          </div>
        </div>

        <div class="card__gallery">
          ${imagesMarkupStr}
          <div class="card__gallery-close"><i class="fas fa-times"></i></div>
        </div>
      </article>
    
    `
  }

  function renderCards() {
    let flag

    if (sortBy === 'expensive to cheap') {
      flag = -1
    }
    if (sortBy === 'cheap to expensive') {
      flag = 1
    }

    $('.card').remove()

    $.each(
      localActivities
        .filter((activity) =>
          filterBy
            ? activity.category.map((el) => el.toLowerCase()).includes(filterBy)
            : activity
        )
        .sort((a, b) => (a.price - b.price) * flag)
        .slice(0, countToShow),
      (_, value) => {
        console.log({ localActivities })
        $('#card-container').append(generateCard(value))
      }
    )
  }

  function renderFilterCategories(categories) {
    $.each(categories, (_, value) => {
      const string = `<option value="${value}">${value}</option>`
      $('#filterByCategory').append(string)
    })
  }

  const fetchData = async () => {
    const url =
      'https://s3.eu-central-1.amazonaws.com/js.smartair.co.il/custom/activities.json'

    let response = await fetch(url)
    if (response.ok) {
      let json = await response.json()
      const { activities } = json
      const activitiesArray = Object.values(activities)
      localActivities = activitiesArray

      let allCategories = []
      activitiesArray.forEach(
        (el) => (allCategories = [...allCategories, ...el.category])
      )

      const categories = Array.from(
        new Set(allCategories.map((el) => el.toLowerCase()))
      )

      renderCards()
      renderFilterCategories(categories)
      $('#total').append(activitiesArray.length)
    } else {
      alert('Error HTTP: ' + response.status)
    }
  }

  $('#card-container').on('click', '.card__content-gallery', function () {
    cardIdx = $(this).closest('.card').index()
    $($('.card')[cardIdx])
      .children('.card__gallery')
      .addClass('card__gallery--active')
  })

  $('#card-container').on('click', '.card__gallery-close', function () {
    cardIdx = $(this).closest('.card').index()
    $($('.card')[cardIdx])
      .children('.card__gallery')
      .removeClass('card__gallery--active')
  })

  $('#card-container').on('click', '.toggle-show', function () {
    cardIdx = $(this).closest('.card').index()
    $($('.card')[cardIdx]).find('.card__content .body1').toggleClass('hide')
  })

  $('#sortByPrice').change(function (e) {
    sortBy = e.target.value
    renderCards()
  })

  $('#filterByCategory').change(function (e) {
    filterBy = e.target.value
    renderCards()
  })

  $('#show-more').click(function () {
    if (countToShow < localActivities.length) {
      countToShow++
    }

    if (countToShow === localActivities.length) {
      $('#show-more').remove()
    }

    renderCards()
  })

  fetchData()
})
