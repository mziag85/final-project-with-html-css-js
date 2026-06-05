//აკორდეონი

const accordion = document.querySelector(".accordion");

if (accordion) {
  accordion.addEventListener("click", function (event) {
    const section = event.target.closest(".accordion_section");

    if (!section) return;

    section.classList.toggle("opened");

    const plus = section.querySelector(".plus");
    if (plus) {
      plus.textContent = section.classList.contains("opened") ? "_" : "+";
    }
  });
}

// loader
const loader = document.createElement("div");
loader.classList.add("loader-box");
loader.innerHTML = `<div class="loader"></div>`;
document.body.appendChild(loader);



//api ამინდი  

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "16e7bcbc3f943e6c02c74301ef0db238";

const weatherUrl = `${baseUrl}?q=Akhaltsikhe&appid=${apiKey}&units=metric`;

async function getWeather() {
  try {
    const weather = document.getElementById("weather");

    
 const response = await fetch(weatherUrl);

  if (!response.ok) {
      throw new Error(response.status);
    }

  const data = await response.json();
  loader.remove();

    weather.textContent =
      `${data.name}: ${Math.round(data.main.temp)}°C`;

  } catch (error) {
    document.getElementById("weather").innerHTML =
      `<p>დაფიქსირდა შეცდომა</p>`;
    console.log(error);
  }
}

getWeather();


  
//bright mode
const brightMode = document.querySelector(".sun_icon");
brightMode.addEventListener("click", () => {
    document.body.classList.toggle("open");
});


// ბურგერ_მენიუ

const burger = document.querySelector(".burger_menu");
const navigation = document.querySelector(".navigation");

burger.addEventListener("click", () => {
  navigation.classList.toggle("open");
});




//კალათა
const chooseBtn = document.querySelectorAll(".choose");
const cart = document.getElementById("cart");
const deleteAll = document.getElementById("deleteAll");

deleteAll.style.display = "none";

deleteAll.addEventListener("click", () => {
  cart.innerHTML = "";
  deleteAll.style.display = "none";
});

chooseBtn.forEach((button) => {
  button.addEventListener("click", () => {
    const productName =
      button.parentElement.querySelector(".choose_text").textContent;

    const li = document.createElement("li");
    li.textContent = productName;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";

    deleteBtn.addEventListener("click", () => {
      li.remove();
    
        if (cart.querySelectorAll("li").length === 0) {
        deleteAll.style.display = "none";
      }
    });
    
    li.appendChild(deleteBtn);
    cart.appendChild(li);

     deleteAll.style.display = "block";
});
 });


//  ძებნა
const input = document.getElementById("input");
const items = document.querySelectorAll(".item");

input.addEventListener("input", function () {
  const value = input.value.toLowerCase().trim();

  items.forEach((item) => {
    const text = item.innerText.toLowerCase();

    if (text.includes(value)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});