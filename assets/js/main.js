window.addEventListener('load', function load(e) {
  init();
})

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
  let input = document.getElementById("google-search");
  input.value = "";
  input.addEventListener("keyup", e => {
    if (e.code === "Enter") {
      event.preventDefault();
      let searchTerm = input.value;
      window.location = `https://www.google.com/search?&q=${searchTerm}`;
    }
    else {
      null
    }
  })

  let searchTrigger = document.getElementById("search-trigger");
  let searchBar = document.getElementById("search-label");
  let searchLabel = document.getElementById("google-search");
  let open = false;
  searchTrigger.onclick = () => {
    if (open) {
      open = false;
      searchTrigger.style.transform = "rotate(0deg)";
      searchBar.style.left = "-20000px";
      searchLabel.style.left = "-20000px";
    }
    else {
      open = true;
      searchTrigger.style.transform = "rotate(180deg)";
      searchBar.style.left = "0px";
      searchLabel.style.left = "0px";
    }
  }
}

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

  const dayname = Days[date.getDay() - 1];
  daynameelement.innerHTML = dayname;

  console.log(year, month, day, dayname);
};

const setWeatherProps = () => {
  let city;
  let temp;
  let description;

  axios
    .get(
      "https://api.openweathermap.org/data/2.5/weather?id=2658240&units=metric&appid=2f896209f20c442836bf5bba840e4b49"
    )
    .then(response => {
      city = response.data.name;
      temp = response.data.main.temp;
      description = response.data.weather[0].main;
      console.log(city, temp, description);
    });
};
