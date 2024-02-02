const searchBtn = document.querySelector(".search-btn");
const searchText = document.querySelector(".search-text");
const container = document.querySelector(".recipe-container");
const closeBtn = document.querySelector(".recipe-close-btn");
const details = document.querySelector(".recipe-details");
const content = document.querySelector(".recipe-details-content");

const indian = document.querySelector(".indian");
const chinese = document.querySelector(".chinese");
const italian = document.querySelector(".american");
const indianLink = document.querySelector(".indian-link");
const links = document.querySelectorAll(".link");
const navlist = document.querySelector(".nav-list");
const nav = document.getElementById("nav");
const arrow = document.querySelector(".arrow");

searchBtn.addEventListener("click", () => {
  const searchInput = searchText.value.trim();
  if (!searchInput) {
    container.innerHTML = `<h2>Type the <span>meal</span> in the search box !!</h2>`;
    return;
  }

  searchRecipes(searchInput);
});

closeBtn.addEventListener("click", () => {
  details.style.display = "none";
  container.style.filter = "none";
});

// Area-wise serach card functionality #############################################################

links.forEach((link) => {
  const areaName = link.textContent;
  link.addEventListener("click", async (e) => {
    e.preventDefault();
    container.innerHTML = `
    <div class="loader"><h2>Searching Recipes....</h2>
    <div><img src="./load.gif" width = "152px"></div></div>
  
  `;

    try {
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

          const mealId = meal.idMeal;

          idDataLookup(mealId);
        });
      });
    } catch (error) {
      container.innerHTML = `<div class="error"><h2> <span>Error</span> in fetching recipes...</h2> <img src="./error.png"  alt="404-image" width="50%"/></div>`;
    }
  });
});

//  search recipe function################################

const searchRecipes = async (query) => {
  container.innerHTML = `
  <div class="loader"><h2>Searching Recipes....</h2>
  <div><img src="./load.gif" width = "152px"></div></div>`;

  try {
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

        const youtubeId = meal.strYoutube.slice(32, meal.strYoutube.length);

        content.innerHTML = `
  
        <h2>${meal.strMeal}</h2>
        <h3>Ingredients</h3>
        <ul>${fetchIngredients(meal)}</ul>
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
        <h3>Video Instructions</h3>
        
        <iframe height="250" width="350"
              src="https://www.youtube.com/embed/${youtubeId}">
        </iframe>`;
      });
    });
  } catch (error) {
    container.innerHTML = `<div class="error"><h2> <span>Error</span> in fetching recipes...</h2> <img src="./error.png"  alt="404-image" width="50%"/></div>`;
  }
};

//  search recipe by Id function################################
const idDataLookup = async (id) => {
  try {
    const idData = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const idResponse = await idData.json();
    const responseId = idResponse.meals[0];

    const youtubeId = responseId.strYoutube.slice(
      32,
      responseId.strYoutube.length
    );

    content.innerHTML = `
  
    <h2>${responseId.strMeal}</h2>
    <h3>Ingredients</h3>
    <ul>${fetchIngredients2(responseId)}</ul>
    <h3>Instructions</h3>
    <p>${responseId.strInstructions}</p>
    <h3>Video Instructions</h3>
    
    <iframe class="video"
          src="https://www.youtube.com/embed/${youtubeId}">
    </iframe>`;
  } catch (error) {
    container.innerHTML = `<div class="error"><h2> Error in fetching recipes...</h2> <img src="./error.png"  alt="404-image" width="50%"/></div>`;
  }
};

// Function for recipe by ID ingredient list ####################

const fetchIngredients2 = (responseId) => {
  let ingredientsList = "";

  for (i = 1; i <= 20; i++) {
    let ingredient = responseId[`strIngredient${i}`];
    if (ingredient) {
      const measure = responseId[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};

// Function for recipeingredient list ####################

const fetchIngredients = (meal) => {
  let ingredientsList = "";

  for (i = 1; i <= 20; i++) {
    let ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};

//  #############################################################

arrow.addEventListener("click", () => {
  navlist.style.display = "flex";
  arrow.setAttribute("name", "chevron-up-outline");

  // navlist.style.display = "none";
  // arrow.setAttribute("name", "chevron-down-outline");
});
