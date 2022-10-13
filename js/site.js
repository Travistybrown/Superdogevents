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

//builds a list of specific cities
function buildDropDown(){

    let eventDD = document.getElementById("eventDropDown");
    eventDD.innerHTML = "";

    //grab my template from the template tag;
    const template = document.getElementById("cityDD-template");

    let curEvents = events;

    //filter our array by distinct cities
        // ["new york", "san diesgo", etc]
    let citiesOnly = curEvents.map((event) => event.city);
    let distinctEvents = [...new Set(  citiesOnly )   ];


   
    // <ul class="dropwdown-menu"</ul>
     let ddul = document.createElement("ul");
    ddul.classList.add("dropdown-menu");



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
}