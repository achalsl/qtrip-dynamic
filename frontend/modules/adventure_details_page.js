import config from "../conf/index.js";
import { setAttributes, createElWithTextAndAttr } from "./landing_page.js"

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let adventureId = new URLSearchParams(search).get('adventure')
  console.log('getAdventureIdFromURL() adventureId ', adventureId)
  // Place holder for functionality to work in the Stubs
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let res = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`)
    if(!res.ok) {
      return null
    }
    let adventure = await res.json()
    console.log('fetchAdventureDetails(): adventure ', adventure)
    return adventure
  } catch (err) {
    return err
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // add adventure name to div id = adventure-name
  let adventureName = document.getElementById('adventure-name')
  adventureName.innerHTML = adventure.name
  // add adventure subtitle to div id = adventure-subtitle
  let adventureSubtitle = document.getElementById('adventure-subtitle')
  adventureSubtitle.innerHTML = adventure.subtitle
  // loop through images array and add images to div id = photo-gallery
  let adventurePhotoGallery = document.getElementById('photo-gallery')

  adventure.images.map(image => {
    let imageDiv = document.createElement('div')
    let imageElement = createElWithTextAndAttr('img', {src: image, class: 'activity-card-image'})
    imageDiv.appendChild(imageElement)
    adventurePhotoGallery.appendChild(imageDiv)
  })
  // add content to div id = adventure-content
  let adventureContent = document.getElementById('adventure-content')
  adventureContent.innerHTML = adventure.content
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let adventurePhotoGallery = document.getElementById('photo-gallery')
  adventurePhotoGallery.textContent = ""

  let adventureCarousel = createElWithTextAndAttr('div', {id: 'adventure-image-carousel', class: 'carousel slide', 'data-bs-ride': 'carousel'})
  let carouselInner = createElWithTextAndAttr('div', {class: 'carousel-inner'})
  let carouselIndicators = createElWithTextAndAttr('div', {class: 'carousel-indicators'})

  images.map((image, index) => {
    let carouselItem
    let carouselIndicatorBtn
    if(index === 0) {
      carouselItem = createElWithTextAndAttr('div', {class: 'carousel-item active'})
      carouselIndicatorBtn = createElWithTextAndAttr('button', 
      {
        type: 'button', 
        'data-bs-target': '#adventure-image-carousel', 
        'data-bs-slide-to': index, 
        class: 'active',
        'aria-current': true,
        'aria-label': 'Image 1'
      })
    } else {
      carouselItem = createElWithTextAndAttr('div', {class: 'carousel-item'})
      carouselIndicatorBtn = createElWithTextAndAttr('button', 
      {
        type: 'button', 
        'data-bs-target': '#adventure-image-carousel', 
        'data-bs-slide-to': index, 
        'aria-label': 'Image 1'
      })
    }

    let imageElement = createElWithTextAndAttr('img', {class: 'activity-card-image  d-block w-100', src: image})
    carouselIndicators.append(carouselIndicatorBtn)
    carouselItem.append(imageElement)
    carouselInner.append(carouselItem)
  })

  let carouselControlPrev = createElWithTextAndAttr('button', {class: 'carousel-control-prev', 'data-bs-target': '#adventure-image-carousel', type: 'button', 'data-bs-slide': 'prev'})
  let prevIcon = createElWithTextAndAttr('span', {class: 'carousel-control-prev-icon', 'aria-hidden': 'true'})
  let previous = createElWithTextAndAttr('span', {class: 'visually-hidden'}, 'Previous')
  carouselControlPrev.append(prevIcon, previous)

  let carouselControlNext = createElWithTextAndAttr('button', {class: 'carousel-control-next', 'data-bs-target': '#adventure-image-carousel', type: 'button', 'data-bs-slide': 'next'})
  let nextIcon = createElWithTextAndAttr('span', {class: 'carousel-control-next-icon', 'aria-hidden': 'true'})
  let next = createElWithTextAndAttr('span', {class: 'visually-hidden'}, 'Next')
  carouselControlNext.append(nextIcon, next)

  adventureCarousel.append(carouselIndicators, carouselInner, carouselControlPrev, carouselControlNext)
  // adventureCarousel.appendChild(carouselInner)
  // adventureCarousel.appendChild(carouselControlPrev)
  // adventureCarousel.appendChild(carouselControlNext)
  adventurePhotoGallery.append(adventureCarousel)

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available) {
    document.getElementById('reservation-panel-sold-out').style.display = 'none'
    document.getElementById('reservation-panel-available').style.display = 'block'
    document.getElementById('reservation-person-cost').innerHTML = adventure.costPerHead
  } else {
    document.getElementById('reservation-panel-sold-out').style.display = 'block'
    document.getElementById('reservation-panel-available').style.display = 'none'
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById('reservation-cost').innerHTML = (adventure.costPerHead * persons).toFixed(0)
  return null

}

//Implementation of reservation form submission using JQuery
function captureFormSubmitUsingJQuery(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using JQuery to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  $('form#myForm').on('submit', function() {
    $.ajax({
      url: `${config.backendEndpoint}/reservations/new`,
      type: 'post',
      dataType: 'json',
      data: $('form#myForm').serialize() + '&adventure=' + adventure.id,
      success: function() {
        alert('Success!')
        window.location.reload()
      },
      error: function() {
        alert('Failed!')
        window.location.reload()
      }
    })
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved) {
    document.getElementById('reserved-banner').style.display = 'block'
  } else {
    document.getElementById('reserved-banner').style.display = 'none'
  }
  return null
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmitUsingJQuery,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
