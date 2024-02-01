const searchBtn = document.querySelector(".search-btn");
const searchText = document.querySelector(".search-text");
const container = document.querySelector(".recipe-container");
const closeBtn = document.querySelector(".recipe-close-btn");
const details = document.querySelector(".recipe-details");
const content = document.querySelector(".recipe-details-content");

const indian = document.querySelector(".indian");
const chinese = document.querySelector(".chinese");

const italian = document.querySelector(".italian");
const links = document.querySelectorAll(".link");

const searchRecipes = async (query) => {
  container.innerHTML = `
  <div class="loader"><h2>Searching Recipes....</h2>
  <div><img src="./load.gif" width = "152px"></div></div>`;

  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const response = await data.json();

  container.innerHTML = "";
  response.meals.forEach((meal) => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    card.innerHTML = `
    <img src="${meal.strMealThumb}" alt="${meal.strArea}" />
    <h3>${meal.strMeal}</h3>
    <h5><span>${meal.strArea}</span> Dish</h5>
    <h5>Belongs to <span>${meal.strCategory}</span> Category</h5>`;

    container.appendChild(card);

    const viewButton = document.createElement("button");

    viewButton.innerText = "View recipe";
    card.appendChild(viewButton);

    viewButton.addEventListener("click", () => {
      details.style.display = "block";
      container.style.filter = "blur(3px)";
    });
  });
};
// container.innerHTML = "<h2>Search your favorite recepies here..🍲</h2>";
searchBtn.addEventListener("click", () => {
  const searchInput = searchText.value.trim();
  console.log(searchInput);

  // if (searchInput) {
  //   container.innerHTML = "";
  // }

  searchRecipes(searchInput);
});

closeBtn.addEventListener("click", () => {
  details.style.display = "none";
  container.style.filter = "none";
});

// Area-wise   #############################################################

links.forEach((link) => {
  const areaName = link.textContent;
  link.addEventListener("click", async (e) => {
    e.preventDefault();
    container.innerHTML = `
    <div class="loader"><h2>Searching Recipes....</h2>
    <div><img src="./load.gif" width = "152px"></div></div>
  
  `;
    const areaData = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
    );
    const areaResponse = await areaData.json();
    container.innerHTML = "";

    areaResponse.meals.forEach((meal) => {
      const card = document.createElement("div");
      card.classList.add("recipe-card");

      card.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strArea}" />
      <h3>${meal.strMeal}</h3>
      <h5><span>${meal.strArea}</span> Dish</h5>
      <h5>Belongs to <span>${meal.strCategory}</span> Category</h5>`;

      container.appendChild(card);

      const viewButton = document.createElement("button");

      viewButton.innerText = "View recipe";
      card.appendChild(viewButton);

      viewButton.addEventListener("click", () => {
        details.style.display = "block";
        container.style.filter = "blur(3px)";
      });
    });

    console.log(areaResponse.meals);
  });

  // console.log(areaName);
});
