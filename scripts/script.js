function searchMeal() {
    const searchInput = document.getElementById('searchInput').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            const meals = data.meals;
            const mealResultsContainer = document.getElementById('mealResults');
            mealResultsContainer.innerHTML = ''; // Clear previous results
            if (meals) {
                const mealCards = meals.slice(0, 5).map(meal => createMealCard(meal));
                mealCards.forEach(card => mealResultsContainer.appendChild(card));
                if (meals.length > 6) {
                    document.getElementById('showAllBtn').style.display = 'block';
                }
            } else {
                mealResultsContainer.innerHTML = '<p>No results found</p>';
            }
        })
        .catch(error => console.log('Error:', error));
}

function createMealCard(meal) {
    const card = document.createElement('div');
    card.classList.add('card', 'col-lg-4', 'col-md-6', 'col-12');
    card.style.width = '30rem';

    const image = document.createElement('img');
    image.src = meal.strMealThumb;
    image.classList.add('card-img-top');
    image.alt = 'meal image';

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const mealIdTitle = document.createElement('h5');
    mealIdTitle.classList.add('card-title');
    mealIdTitle.textContent = `Meal Id: ${meal.idMeal}`;

    const mealNameTitle = document.createElement('h5');
    mealNameTitle.classList.add('card-title');
    mealNameTitle.textContent = `Meal name: ${meal.strMeal}`;

    const cookingInstruction = document.createElement('p');
    cookingInstruction.classList.add('card-text');
    cookingInstruction.textContent = 'Cooking Instruction: ' + meal.strInstructions;

    cardBody.appendChild(mealIdTitle);
    cardBody.appendChild(mealNameTitle);
    cardBody.appendChild(cookingInstruction);

    card.appendChild(image);
    card.appendChild(cardBody);

    return card;
}

function showAllMeals() {
    const searchInput = document.getElementById('searchInput').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            const meals = data.meals;
            const mealResultsContainer = document.getElementById('mealResults');
            mealResultsContainer.innerHTML = ''; // Clear previous results
            if (meals) {
                const mealCards = meals.map(meal => createMealCard(meal));
                mealCards.forEach(card => mealResultsContainer.appendChild(card));
                document.getElementById('showAllBtn').style.display = 'none';
            } else {
                mealResultsContainer.innerHTML = '<p>No results found</p>';
            }
        })
        .catch(error => console.log('Error:', error));
}

// Function to scroll to the top of the page
function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Show or hide the back to top button based on scroll position
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("backToTopBtn").style.display = "block";
    } else {
        document.getElementById("backToTopBtn").style.display = "none";
    }
};