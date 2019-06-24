window.addEventListener("load", function load(e) {
  init();
});

const init = () => {
  setImage();
  setDateProps();
  setWeatherProps();
  setEventTriggers();
};

const setImage = () => {
  const imgpod = document.getElementById("body-wrapper");

  const image = Math.floor(Math.random() * window.imgArray.length);

  imgpod.style.backgroundImage = `url(${window.imgArray[image]})`;
};

const setEventTriggers = () => {
  //binding key "g" to google search
  document.onkeyup = e => {
    if (e.code === "KeyG" && !window.searchOpen) {
      openGoogleSearchField(window.searchOpen);
    }
  };

  //binding key "enter" to execute google search
  let input = document.getElementById("google-search");
  input.value = "";
  input.addEventListener("keyup", e => {
    if (e.code === "Enter" && window.searchOpen) {
      event.preventDefault();
      let searchTerm = input.value;
      window.location = `https://www.google.com/search?&q=${searchTerm}`;
    } else {
      null;
    }
  });

  let searchTrigger = document.getElementById("search-trigger");

  searchTrigger.onclick = () => {
    openGoogleSearchField(window.searchOpen);
  };
};

const openGoogleSearchField = isOpen => {
  let searchTrigger = document.getElementById("search-trigger");
  let searchBar = document.getElementById("search-label");
  let searchLabel = document.getElementById("google-search");

  if (isOpen) {
    window.searchOpen = false;
    searchTrigger.style.transform = "rotate(0deg)";
    searchBar.style.left = "-20000px";
    searchLabel.style.left = "-20000px";
    window.focus();
  } else {
    window.searchOpen = true;
    searchTrigger.style.transform = "rotate(180deg)";
    searchBar.style.left = "0px";
    searchLabel.style.left = "0px";
    searchBar.focus();
  }
};

const setDateProps = () => {
  const yearelement = document.getElementById("year");
  const monthelement = document.getElementById("month");
  const dayelement = document.getElementById("day");
  const daynameelement = document.getElementById("day-name");

  const date = new Date();
  const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const Days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  const year = date.getFullYear();
  yearelement.innerHTML = year;

  const month = Months[date.getMonth()];
  monthelement.innerHTML = month;

  const day = date.getDate();
  dayelement.innerHTML = day;

  const dayname = Days[date.getDay()];
  daynameelement.innerHTML = dayname;

  console.log(year, month, day, dayname);
};

const setWeatherProps = () => {

  const degreeelement = document.getElementById("degrees");
  const weathertypeelement = document.getElementById("participation");
  const locationelement = document.getElementById("location-name");


  axios
    .get(
      "https://api.openweathermap.org/data/2.5/weather?id=2658240&units=metric&appid=2f896209f20c442836bf5bba840e4b49"
    )
    .then(response => {
      locationelement.innerHTML = response.data.name;
      degreeelement.innerHTML = Math.round(response.data.main.temp * 10) / 10;
      weathertypeelement.innerHTML = response.data.weather[0].main;
    });
};
