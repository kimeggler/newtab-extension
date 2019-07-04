window.addEventListener("load", function load(e) {
  init();
});

const init = () => {
  setImage();
  setDateProps();
  setWeatherProps();
  setWaterProps();
  setQuote();
  setEventTriggers();
  setTimeProps();
  setInterval(setTimeProps, 1000);
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

const formatNumber = (num) => {
  if (num < 10) {
    return `0${num}`;
  }
  return num;
}

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

const setTimeProps = () => {
  const hourselement = document.getElementById("hours");
  const minuteselement = document.getElementById("minutes");
  const secondselement = document.getElementById("seconds")

  const moment = new Date;



  hourselement.innerHTML = formatNumber(moment.getHours());
  minuteselement.innerHTML = formatNumber(moment.getMinutes());
  secondselement.innerHTML = formatNumber(moment.getSeconds());
}

const setWeatherProps = () => {

  const degreeelement = document.getElementById("air-temp");
  const weathertypeelement = document.getElementById("participation");
  const locationelement = document.getElementById("air-location");


  axios
    .get(
      "https://api.openweathermap.org/data/2.5/weather?id=2658240&units=metric&appid=2f896209f20c442836bf5bba840e4b49"
    )
    .then(response => {
      locationelement.innerHTML = response.data.name;
      degreeelement.innerHTML = Math.round(response.data.main.temp * 10) / 10;
      weathertypeelement.innerHTML = response.data.weather[0].main;
    });
}


const setWaterProps = () => {

  const degreeelement = document.getElementById("water-temp");
  const waterforecast = document.getElementById("water-forecast");
  const flowelement = document.getElementById("water-flow")


  axios
    .get(
      "https://aareguru.existenz.ch/v2018/current?city=interlaken"
    )
    .then(response => {
      degreeelement.innerHTML = response.data.aare.temperature;
      waterforecast.innerHTML = response.data.aare.forecast2h_text;
      flowelement.innerHTML = response.data.aare.flow;
    });
}


const setQuote = () => {

  const quoteelement = document.getElementById("quote");

  axios
    .get("https://api.kanye.rest/")
    .then(response => {
      quoteelement.innerHTML = response.data.quote;
    })
}
