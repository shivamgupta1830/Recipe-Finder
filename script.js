const searchBtn = document.querySelector(".search-btn");
const searchText = document.querySelector(".search-text");
const container = document.querySelector(".recipe-container");
const closeBtn = document.querySelector(".recipe-close-btn");
const details = document.querySelector(".recipe-details");
const content = document.querySelector(".recipe-details-content");

const indian = document.querySelector(".indian");
const chinese = document.querySelector(".chinese");
const italian = document.querySelector(".italian");
const indianLink = document.querySelector(".indian-link");
const links = document.querySelectorAll(".link");
const navlist = document.querySelector(".nav-list");
const nav = document.getElementById("nav");
const arrow = document.querySelector(".arrow");

const searchRecipes = async (query) => {
  container.innerHTML = `
  <div class="loader"><h2>Searching Recipes....</h2>
  <div><img src="./load.gif" width = "152px"></div></div>`;

  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const response = await data.json();
  console.log(response.meals);

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
      <ul><li>abcdefgkfi</li>
      <li>abcdefgkfi</li>
      <li>abcdefgkfi</li>
      <li>abcdefgkfi</li>
      <li>abcdefgkfi</li>
      <li>abcdefgkfi</li>
      <li>abcdefgkfi</li>
      <li>abcdefgkfi</li>
      <li>abcdefgkfi</li>
      <li>abcdefgkfi</li></ul>
      <h3>Instructions</h3>
      <p>${meal.strInstructions}</p>
      <h3>Video Instructions</h3>
      
      <iframe height="250" width="350"
            src="https://www.youtube.com/embed/${youtubeId}">
      </iframe>`;
    });
  });
};

searchBtn.addEventListener("click", () => {
  const searchInput = searchText.value.trim();
  console.log(searchInput);

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

        const mealId = meal.idMeal;
        console.log(mealId);

        idDataLookup(mealId);
      });
    });
  });
});

const idDataLookup = async (id) => {
  const idData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const idResponse = await idData.json();
  console.log(idResponse.meals[0].strMeal);
  const youtubeId = idResponse.meals[0].strYoutube.slice(
    32,
    idResponse.meals[0].strYoutube.length
  );

  content.innerHTML = `

  <h2>${idResponse.meals[0].strMeal}</h2>
  <h3>Ingredients</h3>
  <ul><li>abcdefgkfi</li>
  <li>abcdefgkfi</li>
  <li>abcdefgkfi</li>
  <li>abcdefgkfi</li>
  <li>abcdefgkfi</li>
  <li>abcdefgkfi</li>
  <li>abcdefgkfi</li>
  <li>abcdefgkfi</li>
  <li>abcdefgkfi</li>
  <li>abcdefgkfi</li></ul>
  <h3>Instructions</h3>
  <p>${idResponse.meals[0].strInstructions}</p>
  <h3>Video Instructions</h3>
  
  <iframe height="250" width="350"
        src="https://www.youtube.com/embed/${youtubeId}">
  </iframe>`;
};

// indianLink.addEventListener("click", () => {
//   links.forEach((link) => {
//     const areaName = link.textContent;
//     link.addEventListener("click", async (e) => {
//       e.preventDefault();
//       container.innerHTML = `
//       <div class="loader"><h2>Searching Recipes....</h2>
//       <div><img src="./load.gif" width = "152px"></div></div>

//     `;
//       const areaData = await fetch(
//         `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
//       );
//       const areaResponse = await areaData.json();

//       container.innerHTML = "";

//       areaResponse.meals.forEach((meal) => {
//         const card = document.createElement("div");
//         card.classList.add("recipe-card");

//         card.innerHTML = `
//         <img src="${meal.strMealThumb}" alt="${meal.strArea}" />
//         <h3>${meal.strMeal}</h3>
//         <h5><span>${meal.strArea}</span> Dish</h5>
//         <h5>Belongs to <span>${meal.strCategory}</span> Category</h5>`;

//         container.appendChild(card);

//         const viewButton = document.createElement("button");

//         viewButton.innerText = "View recipe";
//         card.appendChild(viewButton);

//         viewButton.addEventListener("click", () => {
//           details.style.display = "block";
//           container.style.filter = "blur(3px)";

//           const mealId = meal.idMeal;
//           console.log(mealId);

//           idDataLookup(mealId);
//         });
//       });
//     });
//   });
// });

//  #############################################################

arrow.addEventListener("click", () => {
  navlist.style.display = "flex";
  arrow.setAttribute("name", "chevron-up-outline");

  // navlist.style.display = "none";
  // arrow.setAttribute("name", "chevron-down-outline");
});
