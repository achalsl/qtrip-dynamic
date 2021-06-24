import config from "../conf/index.js";
import { createElWithTextAndAttr } from "./landing_page.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let res = await fetch(`${config.backendEndpoint}/reservations`)
    if(!res.ok) {
      return null
    }
    let reservations = await res.json()
    console.log(reservations)
    return reservations;
  } catch (err) {
    return err
  }
  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format DD/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  if(reservations.length > 0) {
    document.getElementById('reservation-table-parent').style.display = 'block'
    document.getElementById('no-reservation-banner').style.display = 'none'
    let reservationsBody = document.getElementById('reservation-table')
    reservations.map(reservation => {
      const reservationRow = document.createElement('tr')
      const transactionId = createElWithTextAndAttr('td', null, reservation.id)
      const bookingName = createElWithTextAndAttr('td', null, reservation.name)
      const adventureName = createElWithTextAndAttr('td', null, reservation.adventureName)
      const numberOfPersons = createElWithTextAndAttr('td', null, reservation.person)
      
      const reservationDate = new Date(reservation.date)
      const reservationDateCol = createElWithTextAndAttr('td', null, reservationDate.toLocaleDateString('EN-IN'))
      
      const price = createElWithTextAndAttr('td', null, `${reservation.price}`)

      const bookingDateTime = new Date(reservation.time)
      const bookingDate = bookingDateTime.toLocaleString('EN-IN', {dateStyle: 'long'})
      const bookingTime = bookingDateTime.toLocaleString('EN-IN', {timeStyle: 'medium'})
      const bookingTimeCol = createElWithTextAndAttr('td', null, `${bookingDate}, ${bookingTime}`)
      const reservationVisit = createElWithTextAndAttr('td', {id:`${reservation.id}`})
      const buttonLink = createElWithTextAndAttr('a', {href: `../detail/?adventure=${reservation.adventure}`})
      const reservationVisitBtn = createElWithTextAndAttr('button', {type: 'button', class: 'reservation-visit-button'}, 'View Adventure')
      buttonLink.append(reservationVisitBtn)
      reservationVisit.append(buttonLink)
      reservationRow.append(transactionId, bookingName, adventureName, numberOfPersons, reservationDateCol, price, bookingTimeCol, reservationVisit)
      reservationsBody.append(reservationRow)
    })
    
  } else {
    document.getElementById('reservation-table-parent').style.display = 'none'
    document.getElementById('no-reservation-banner').style.display = 'block'
  }

}

export { fetchReservations, addReservationToTable};
