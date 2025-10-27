// navbar menu
const navbartoggle = document.querySelector(".navbar-toggle");
const navbarmenu = document.querySelector(".navbar-menu");

navbartoggle.addEventListener("click", () => {
    navbartoggle.classList.toggle('active');
    navbarmenu.classList.toggle('active');
});

// Global variable to store game data
let gameData = null;

// Search functionality
const inputbox = document.querySelector("#input-box");
const btn = document.querySelector("#btn");
const welcomeMessage = document.querySelector(".welcome-message");
const noResults = document.querySelector(".no-results");
const gamesContainer = document.getElementById("games");

// Define valid search terms and their corresponding CSS classes
const validSearchTerms = {
    'indoor kids': ['indoor-kids'],
    'outdoor kids': ['outdoor-kids'],
    'kids': ['indoor-kids', 'outdoor-kids'],
    'indoor male': ['indoor-male'],
    'outdoor male': ['outdoor-male'],
    'male': ['indoor-male', 'outdoor-male'],
    'indoor female': ['indoor-female'],
    'outdoor female': ['outdoor-female'],
    'female': ['indoor-female', 'outdoor-female'],
    'indoor family': ['indoor-family'],
    'outdoor family': ['outdoor-family'],
    'family': ['indoor-family', 'outdoor-family'],
    'indoor': ['indoor-kids', 'indoor-male', 'indoor-female', 'indoor-family'],
    'outdoor': ['outdoor-kids', 'outdoor-male', 'outdoor-female', 'outdoor-family']
};

// Add event listener for button click
btn.addEventListener("click", handleSearch);

// Add event listener for Enter key in input field
inputbox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        handleSearch();
    }
});

// Add event listener for real-time search
inputbox.addEventListener("input", function () {
    if (this.value.trim() === "") {
        showAllCards();
        welcomeMessage.style.display = "block";
        noResults.style.display = "none";
    } else {
        handleSearch();
    }
});

function handleSearch() {
    const searchTerm = inputbox.value.toLowerCase().trim();
    console.log(searchTerm);
    // Hide all messages initially
    welcomeMessage.style.display = "none";
    noResults.style.display = "none";

    if (searchTerm === "") {
        // Empty search - show welcome message and all cards
        welcomeMessage.style.display = "block";
        showAllCards();
    } else if (validSearchTerms[searchTerm]) {
        // Valid search term - show only matching cards
        hideAllCards();
        const categories = validSearchTerms[searchTerm];
        categories.forEach(category => {
            showCardsByCategory(category);
        });

        // Check if any cards are visible
        const visibleCards = document.querySelectorAll('.card[style="display: block"]');
        if (visibleCards.length === 0) {
            noResults.style.display = "block";
            noResults.innerHTML = `Games found for "${searchTerm}".  search Result.`;
        }
    } else {
        // Invalid search term - show no results message
        hideAllCards();
        noResults.style.display = "block";

        // Show suggestions based on partial matches
        const suggestions = getSearchSuggestions(searchTerm);
        if (suggestions.length > 0) {
            noResults.innerHTML = `No matching games found for "${searchTerm}".<br>Did you mean: ${suggestions.join(' or ')}?`;
        } else {
            noResults.innerHTML = `No matching games found for "${searchTerm}".<br>Try: "indoor kids", "outdoor male", "indoor female", or "outdoor family"`;
        }
    }
}

// Helper function to show all cards
function showAllCards() {
    const allCards = document.querySelectorAll(".card");
    allCards.forEach(card => {
        card.style.display = "block";
    });
}

// Helper function to hide all cards
function hideAllCards() {
    const allCards = document.querySelectorAll(".card");
    allCards.forEach(card => {
        card.style.display = "none";
    });
}

// Helper function to show cards by category
function showCardsByCategory(category) {
    const cards = document.querySelectorAll(`.${category}`);
    cards.forEach(card => {
        card.style.display = "block";
    });
}

// Helper function to get search suggestions
function getSearchSuggestions(searchTerm) {
    const suggestions = [];
    const allTerms = Object.keys(validSearchTerms);

    // Check for partial matches
    allTerms.forEach(term => {
        if (term.includes(searchTerm) || searchTerm.includes(term.split(' ')[0]) || searchTerm.includes(term.split(' ')[1])) {
            suggestions.push(`"${term}"`);
        }
    });

    return suggestions.slice(0, 3); // Return max 3 suggestions
}

// Function to load and display games
function loadGames() {
    gamesContainer.innerHTML = '';

    gameData.games.forEach((game, index) => {
        const gameCard = document.createElement('div');
        gameCard.className = `card ${game.classname}`;
        gameCard.innerHTML = `
            <div class="card-inner ">
                <div class="front" style="background-image: url('${game.media.images[0]}');">
                    <h2 class="h2">${game.name}</h2>
                </div>
                <div class="back">
                    <h2 class="h2">${game.name}</h2>
                    <p>${game.instructions}</p>
                    <a href="#" class="details" onclick="viewdetails(${game.id})">${game.detail}</a>
                </div>
            </div>
        `;
        gamesContainer.appendChild(gameCard);
    });
}

function viewdetails(id) {
    const game = gameData.games.find(g => g.id == id);
    if (!game) return;

    localStorage.clear();
    localStorage.setItem('categories', game.categories); // category name
    location.href = 'details.html';
}
// Load game data from JSON file
function loadGameData() {
    fetch('./other-files/games-data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            gameData = data;
            loadGames();
            welcomeMessage.style.display = "block";
            showAllCards();
        })
        .catch(error => {
            console.error('Error loading game data:', error);
            noResults.style.display = "block";
            noResults.innerHTML = "Error loading games. Please try again later.";
        });
}

// Initialize page - load game data and show welcome message
document.addEventListener('DOMContentLoaded', function () {
    // Scroll Observer
    const animatedElements = document.querySelectorAll(
      ".fade-up, .fade-left, .fade-right, .zoom-in, .fade-rotate, .bounce-in, .blur-in"
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.2 });
    
    animatedElements.forEach((el) => observer.observe(el));
    loadGameData();
});
