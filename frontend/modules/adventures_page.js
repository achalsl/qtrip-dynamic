
import config from "../conf/index.js";
import { setAttributes, createElWithTextAndAttr } from "./landing_page.js"

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const queryParams = new URLSearchParams(search)
  let city = queryParams.get('city')
  return city
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let res = await fetch(`${config.backendEndpoint}/adventures/?city=${city}`)
    if(!res.ok) {
      return null
    }
    let data = await res.json()
    console.log(data)
    return data
  } catch (err) {
    return err
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let adventureRow = document.getElementById('data')
  adventures.forEach(adventure => {
    console.log(adventure)
    let adventureCardCol = document.createElement('div')
    setAttributes(adventureCardCol, {class: 'col-6 col-md-4 col-lg-3 mb-4'})

    let adventureCard = document.createElement('div')
    setAttributes(adventureCard, {class: 'activity-card'})

    let adventureCardImgDiv = document.createElement('div')
    setAttributes(adventureCardImgDiv, {class: 'h-100 activity-card-image-div'})
    let adventureCardImg = document.createElement('img')
    setAttributes(adventureCardImg, {src: adventure.image})

    let categoryBanner = createElWithTextAndAttr('div', {class: 'category-banner'}, `${adventure.category}`)

    let adventureCardLink = document.createElement('a')
    setAttributes(adventureCardLink, {id: adventure.id, href: `detail/?adventure=${adventure.id}`})

    let adventureCardBody = createElWithTextAndAttr('div', {class: 'activity-card-body'})

    let adventureCardText1 = createElWithTextAndAttr('div', {class: 'activity-card-text'})
    let adventureName = createElWithTextAndAttr('h5', {class: 'activity-card-text-title'}, adventure.name)
    let adventurePrice = createElWithTextAndAttr('h6', {class: 'activity-card-text-subtitle'}, `<span>&#8377 ${adventure.costPerHead}</span>`)
    adventureCardText1.append(adventureName, adventurePrice)

    let adventureCardText2 = createElWithTextAndAttr('div', {class: 'activity-card-text'})
    let adventureDurationLabel = createElWithTextAndAttr('h5', {class: 'activity-card-text-title'}, 'Duration')
    let adventureDurationValue = createElWithTextAndAttr('h6', {class: 'activity-card-text-subtitle'},`${adventure.duration} hours`)
    
    adventureCardText2.append(adventureDurationLabel, adventureDurationValue)
    let horizontalSeparator = document.createElement('hr')
    horizontalSeparator.style.marginTop = '5px'
    horizontalSeparator.style.marginBottom = '5px'
    adventureCardBody.append(adventureCardText1, horizontalSeparator, adventureCardText2)
    adventureCardImgDiv.append(adventureCardImg)
    adventureCard.append(adventureCardImgDiv,categoryBanner, adventureCardLink, adventureCardBody)
    adventureCardCol.append(adventureCard)
    adventureRow.append(adventureCardCol)
  }) 

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = list.filter(item => item.duration > low && item.duration <= high)
  return filteredList
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = list.filter(item => categoryList.indexOf(item.category) > -1)
  console.log(filteredList)
  return filteredList
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList = [...list]
  if(filters.duration.length > 0) {
    let duration = filters.duration
    let low = duration.substring(0, duration.indexOf('-'))
    let high = duration.substring(duration.indexOf('-')+1)
    filteredList = filterByDuration(list, low, high)
  }
  if(filters.category.length > 0) {
    filteredList = filterByCategory(filteredList, filters.category)
  }

  

  // Place holder for functionality to work in the Stubs
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  window.localStorage.setItem('filters', JSON.stringify(filters))
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format
  let filters = JSON.parse(window.localStorage.getItem('filters'))

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
  let categoryList = document.getElementById('category-list')
  filters.category.map(filterCategory => {
    console.log(filterCategory)
    let filterPill = createElWithTextAndAttr('div', {class: 'category-filter'}, filterCategory)
    categoryList.appendChild(filterPill)
  })
  
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
