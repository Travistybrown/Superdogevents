// this intial dataset for superdog. Is is an array of objects.

const events = [
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 240000,
    date: "06/01/2017",
  },
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 250000,
    date: "06/01/2018",
  },
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 257000,
    date: "06/01/2019",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 130000,
    date: "06/01/2017",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 140000,
    date: "06/01/2018",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 150000,
    date: "06/01/2019",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 40000,
    date: "06/01/2017",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 45000,
    date: "06/01/2018",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 50000,
    date: "06/01/2019",
  },
];

//builds a list of specific cities. Entry point for our app
function buildDropDown() {
  let eventDD = document.getElementById("eventDropDown");
  eventDD.innerHTML = "";

  //grab my template from the template tag;
  const template = document.getElementById("cityDD-template");

  let curEvents = getEventData();

  //filter our array by distinct cities
  // ["new york", "san diesgo", etc]
  let citiesOnly = curEvents.map((event) => event.city);
  let distinctEvents = [...new Set(citiesOnly)];

  // <ul class="dropwdown-menu"</ul>
  let ddul = document.createElement("ul");
  ddul.classList.add("dropdown-menu");

  //Add the all item
  //this gets the  <li> <a class="dropdown-item" onclick="getEvents()"></a></li>  from the template
  let ddlItemNodeall = document.importNode(template.content, true);
  let cityName = "all";

  //this returns  <a class="dropdown-item" onclick="getEvents()"></a>
  let ddItemall = ddlItemNodeall.querySelector("a");
  ddItemall.textContent = cityName;
  ddItemall.setAttribute("data-string", cityName);

  //add the item to the ul
  ddul.appendChild(ddlItemNodeall);

  for (let i = 0; i < distinctEvents.length; i++) {
    //this gets the  <li> <a class="dropdown-item" onclick="getEvents()"></a></li>  from the template
    let ddlItemNode = document.importNode(template.content, true);
    let cityName = distinctEvents[i];

    //this returns  <a class="dropdown-item" onclick="getEvents()"></a>
    let ddItem = ddlItemNode.querySelector("a");
    ddItem.textContent = cityName;
    ddItem.setAttribute("data-string", cityName);

    //add the item to the ul
    ddul.appendChild(ddlItemNode);
  }

  eventDD.appendChild(ddul);
  displayStats(curEvents);
  //load the date in the grid
  displayEventData();
}

function getEvents(element) {
  let city = element.getAttribute("data-string");

  let curEvents = getEventData();

  let statsHeader = document.getElementById("statsHeader");

  statsHeader.innerHTML = `Stats For ${city} events`;

  //display stats for all or the selected city
  let filteredEvents = curEvents;

  if (city != "all") {
    //filter the array by cityname
    filteredEvents = curEvents.filter(function (item) {
      if (item.city == city) {
        return item;
      }
    });
  }
  // calling a function with a list of events
  displayStats(filteredEvents);
}

//display the stats for the selected city
function displayStats(events) {
  let total = 0;
  let average = 0;
  let most = 0;
  let least = -1;

  total = totalAttendance(events);

  document.getElementById("total").innerHTML = total.toLocaleString();

  avg = averageAttendance(events);
  document.getElementById("average").innerHTML = avg.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  least = leastAttendance(events);
  document.getElementById("least").innerHTML = least.toLocaleString();

  most = mostAttendance(events);
  document.getElementById("most").innerHTML = most.toLocaleString();
}

function totalAttendance(events) {
  let totalAttendance = 0;

  for (let i = 0; i < events.length; i++) {
    totalAttendance += events[i].attendance;
  }

  return totalAttendance;
}

function averageAttendance(events) {
  let avg = 0;

  for (let i = 0; i < events.length; i++) {
    avg += events[i].attendance;
  }

  let averageAttendance = avg / events.length;
  return averageAttendance;
}

function leastAttendance(events) {
  let least = -1;
  for (let i = 0; i < events.length; i++) {
    currentAttendance = events[i].attendance;

    if (least > currentAttendance || least < 0) {
      least = currentAttendance;
    }
  }

  return least;
}

function mostAttendance(events) {
  let most = -1;
  for (let i = 0; i < events.length; i++) {
    currentAttendance = events[i].attendance;

    if (most < currentAttendance || most > 0) {
      most = currentAttendance;
    }
  }

  return most;
}

// retrieve data from local storage
function getEventData() {
  let curEvents = JSON.parse(localStorage.getItem("eventData"));

  if (curEvents == null) {
    curEvents = events;
    localStorage.setItem("eventData", JSON.stringify(curEvents));
  }

  return curEvents;
}

//displays the event data in the grid
function displayEventData() {
  // get the template
  const template = document.getElementById("eventData-template");
  //get the location that the template will be written  bascially puttin in back in the main graph like on line 129 html
  const eventBody = document.getElementById("eventBody");

  eventBody.innerHTML = "";
  //thats looking in the local storage
  let curEvents = getEventData();

  for (let i = 0; i < curEvents.length; i++) {
    const eventRow = document.importNode(template.content, true);
    //queryselector will just get the first td if u put quereyselectorall it will get all the td
    const eventCols = eventRow.querySelectorAll("td");
    //set each col in order by what u want
    eventCols[0].textContent = curEvents[i].event;
    eventCols[1].textContent = curEvents[i].city;
    eventCols[2].textContent = curEvents[i].state;
    eventCols[3].textContent = curEvents[i].attendance;

    //format the date for the page
    let eventDate = new Date(curEvents[i].date).toLocaleDateString();

    eventCols[4].textContent = eventDate;
    eventBody.appendChild(eventRow);
  }
}
