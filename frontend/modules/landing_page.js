import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
<<<<<<< HEAD
=======

>>>>>>> a1ba7a51abffaa5ea57bc21e62d7ad914fa599b0
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
<<<<<<< HEAD
  try {
    let res = await (await fetch(`${config.backendEndpoint}/cities`))
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

=======

}
>>>>>>> a1ba7a51abffaa5ea57bc21e62d7ad914fa599b0

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
<<<<<<< HEAD
  let tileColumn = document.createElement('div')
  tileColumn.setAttribute('class', 'col-6 col-md-4 col-lg-3 mb-4')

  let tile = document.createElement('div')
  tile.setAttribute('class', 'tile')
  // tile.setAttribute('id', id)

  let tileText = document.createElement('div')
  tileText.setAttribute('class', 'tile-text')

  let tileHeading = document.createElement('h3')
  tileHeading.innerText = city

  let tileDescription = document.createElement('h4')
  tileDescription.innerText = description

  tileText.append(tileHeading, tileDescription)

  let tileImageDiv = document.createElement('div')
  tileImageDiv.setAttribute('class', 'h-100')
  let tileImage = document.createElement('img')
  tileImage.setAttribute('src', image)

  let tileLink = document.createElement('a')
  setAttributes(tileLink, {id: id, href: `pages/adventures/?city=${id}`})
  // tileLink.setAttribute('id', id)
  // tileLink.setAttribute('href', `pages/adventures/?city=${id}`)

  tileImageDiv.append(tileImage)
  tile.append(tileText, tileImageDiv, tileLink)
  tileColumn.append(tile)

  let cityLayoutRow = document.getElementById('data')
  cityLayoutRow.append(tileColumn)
}

function createElWithTextAndAttr (elementType, attributes, str='') {
  let el = document.createElement(elementType)
  el.innerHTML = str
  setAttributes(el, attributes)
  return el
}
function setAttributes(el, attributes) {
  Object.entries(attributes).forEach(([key, value]) => el.setAttribute(key,value))
}

export { init, fetchCities, addCityToDOM, setAttributes, createElWithTextAndAttr };
=======

}

export { init, fetchCities, addCityToDOM };
>>>>>>> a1ba7a51abffaa5ea57bc21e62d7ad914fa599b0
