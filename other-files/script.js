 // Load home data from JSON
    async function loadHomeData() {
      try {
        const response = await fetch('./data/home-data.json');
        const data = await response.json();
        
        // Load buttons
        loadButtons(data.buttons);
        
        // Load image gallery
        loadImageGallery(data.imageGallery);
        
        // Load image gallery
        loadImageGallerys(data.imageGallerys);
        
        // Load demographics section
        loadDemographics(data.demographics);
        
        // Load newsletter
        loadNewsletter(data.newsletter);
        
      } catch (error) {
        console.error('Error loading home data:', error);
      }
    }

    // Load buttons from JSON data
    function loadButtons(buttonsData) {
      const buttonsSection = document.getElementById('buttons-section');
      buttonsSection.innerHTML = buttonsData.map(button => `
        <div class="sun">
          <i class="${button.icon}"></i>
          <a href="${button.link}" class="a">${button.text}</a>
        </div>
      `).join('');
    }

    // Load image gallery from JSON data
    function loadImageGallery(galleryData) {
      const imageLibrary = document.getElementById('image-library');
      let html = '';
      
      galleryData.forEach(section => {
        section.images.forEach(image => {
          html += `
            <div class="images ${image.class} fade-left" loading="lazy"  style="background-image:url(${image.images})">
              <h1>${image.title}</h1>
              <div class="content">
              <h2>${image.head}</h2>
              <p>${image.details}</p>
              <a href="${image.href}">${image.button}</a>
              </div>
            </div>
          `;
        });
      });
      
      imageLibrary.innerHTML = html;
    }

    // Load image gallery from JSON data
    function loadImageGallerys(galleryDatas) {
      const imageLibrarys = document.getElementById('image-librarys');
      let html = '';
      
      galleryDatas.forEach(sections => {
        sections.images.forEach(image => {
          html += `
            <div class="images ${image.class} fade-right" loading="lazy"  style="background-image:url(${image.images})">
              <h1>${image.title}</h1>
              <div class="content">
              <h2>${image.head}</h2>
              <p>${image.details}</p>
              <a href="${image.href}">${image.button}</a>
              </div>
            </div>
          `;
        });
      });
      
      imageLibrarys.innerHTML = html;
    }

    // Load demographics section from JSON data
    function loadDemographics(demographicsData) {
      const titleElement = document.getElementById('demographics-title');
      const cardsContainer = document.getElementById('demographics-cards');
      
      titleElement.textContent = demographicsData.title;
      
      cardsContainer.innerHTML = demographicsData.cards.map(card => `
        <div class="demo-card">
          <h4>${card.title}</h4>
          <p>${card.description}</p>
          <a href="${card.link}" class="btn">View Games</a>
        </div>
      `).join('');
    }

    // Load newsletter from JSON data
    function loadNewsletter(newsletterData) {
      const newsletterForm = document.getElementById('newsletter-form');
      newsletterForm.innerHTML = `
        <input type="email" placeholder="${newsletterData.placeholder}" required>
        <button type="submit">${newsletterData.buttonText}</button>
      `;
    }


    // Initialize everything when DOM is loaded
   document.addEventListener("DOMContentLoaded", function() {
    loadHomeData().then(() => {
        // Initialize slider after data is loaded
        updateSlider();
        startAutoPlay();
        
        // Initialize navbar toggle functionality
        const navbartoggle = document.querySelector(".navbar-toggle");
        const navbarmenu = document.querySelector(".navbar-menu");

        if (navbartoggle && navbarmenu) {
            navbartoggle.addEventListener("click", () => {
                navbartoggle.classList.toggle('active');
                navbarmenu.classList.toggle('active');
            });
        }
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
        
        // Initialize visitor counter
        cleanOldVisitorData();
        initializeVisitorCounter();
        
        // Initialize enhanced ticker
        initializeTicker();
    });
});

    // splash slide
window.addEventListener("load", () => {
      setTimeout(() => {
        document.getElementById("splash").classList.add("hidden");
        document.getElementById("main").classList.add("show");
      }, 2000); // 2 seconds
    });
    
    // ############################################333
function initializeVisitorCounter() {
    // Always show current count
    updateCounterDisplay();
    
    // Check if user has already been counted (using more persistent method)
    const visitorId = generateVisitorId();
    const countedVisitors = JSON.parse(localStorage.getItem('countedVisitors') || '{}');
    
    if (countedVisitors[visitorId]) {
        console.log("Visitor already counted:", visitorId);
        return;
    }
    
    // Show prompt for new visitor
    showLocationPermissionPrompt();
}

function generateVisitorId() {
    // Create a unique ID based on browser fingerprint + date
    const fingerprint = navigator.userAgent + navigator.language + screen.width + screen.height;
    const date = new Date().toDateString(); // Same day same ID
    return btoa(fingerprint + date).substring(0, 16);
}

function showLocationPermissionPrompt() {
    // Remove existing prompt if any
    const existingPrompt = document.getElementById('locationPrompt');
    if (existingPrompt) {
        existingPrompt.remove();
    }

    const promptHTML = `
        <div id="locationPrompt" style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(-45deg, #376e6f,#1c3334);
            width:40rem;
            padding: 2.5rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
            z-index: 1000;
            text-align: center;
        ">
            <h3 style="font-size:1.5rem; color:#fff;">Welcome to our website!</h3>
            <p style="font-size:1.3rem; color:#fff;">Please allow location access to be counted as a visitor.</p>
            <button onclick="allowLocation()" style="
                background: linear-gradient(45deg, #376e6f,#1c3334);
                color: #fff;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                margin: 5px;
                cursor: pointer;
                font-size:1.4rem;
            ">Allow Location</button>
            <button onclick="denyLocation()" style="
                background: #fff;
                color: #376e6f;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                margin: 5px;
                font-size:1.5rem;
                cursor: pointer;
            ">Deny</button>
        </div>
        <div id="overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
        "></div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', promptHTML);
}

function allowLocation() {
    // Remove prompt and overlay
    const prompt = document.getElementById('locationPrompt');
    const overlay = document.getElementById('overlay');
    if (prompt) prompt.remove();
    if (overlay) overlay.remove();
    
    // Get location and count visitor
    navigator.geolocation.getCurrentPosition(
        function(position) {
            countVisitor();
            showSuccessMessage();
        },
        function(error) {
            alert("Failed to get location. You will not be counted as a visitor.");
        }
    );
}

function denyLocation() {
    // Remove prompt and overlay
    const prompt = document.getElementById('locationPrompt');
    const overlay = document.getElementById('overlay');
    if (prompt) prompt.remove();
    if (overlay) overlay.remove();
    
    // Mark as denied so we don't ask again soon
    const visitorId = generateVisitorId();
    const deniedVisitors = JSON.parse(localStorage.getItem('deniedVisitors') || '{}');
    deniedVisitors[visitorId] = Date.now();
    localStorage.setItem('deniedVisitors', JSON.stringify(deniedVisitors));
}

function countVisitor() {
    const visitorId = generateVisitorId();
    
    // Mark this visitor as counted
    const countedVisitors = JSON.parse(localStorage.getItem('countedVisitors') || '{}');
    countedVisitors[visitorId] = Date.now();
    localStorage.setItem('countedVisitors', JSON.stringify(countedVisitors));
    
    // Increment visitor count
    let count = localStorage.getItem('visitorCount') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);
    
    updateCounterDisplay();
    console.log("New visitor counted:", count, "Visitor ID:", visitorId);
}

function showSuccessMessage() {
    alert("Thank you! You have been counted as a visitor.");
}

function updateCounterDisplay() {
    const count = localStorage.getItem('visitorCount') || 0;
    const visitorCountElement = document.getElementById('visitorCount');
    if (visitorCountElement) {
        visitorCountElement.textContent = count;
    }
}

// Clean up old visitor data (older than 30 days)
function cleanOldVisitorData() {
    const countedVisitors = JSON.parse(localStorage.getItem('countedVisitors') || '{}');
    const deniedVisitors = JSON.parse(localStorage.getItem('deniedVisitors') || '{}');
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    
    Object.keys(countedVisitors).forEach(id => {
        if (countedVisitors[id] < thirtyDaysAgo) {
            delete countedVisitors[id];
        }
    });
    
    Object.keys(deniedVisitors).forEach(id => {
        if (deniedVisitors[id] < thirtyDaysAgo) {
            delete deniedVisitors[id];
        }
    });
    
    localStorage.setItem('countedVisitors', JSON.stringify(countedVisitors));
    localStorage.setItem('deniedVisitors', JSON.stringify(deniedVisitors));
}


    // ############################################333
            // slider
const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentSlide = 0;

    function updateSlider() {
      const sliderWrapper = document.querySelector('.slider-wrapper');
      const dots = document.querySelectorAll('.slider-nav button');
      const animations = ['zoomIn', 'fadeIn', 'rotateIn', 'slideUp'];

      slides.forEach((slide, index) => {
        slide.classList.remove('active');
        slide.style.animationName = '';
        if (index === currentSlide) {
          const randomAnim = animations[Math.floor(Math.random() * animations.length)];
          slide.classList.add('active');
          slide.style.animationName = randomAnim;
        }
      });

      sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

      dots.forEach((dot, index) => {
        dot.setAttribute('data-active', index === currentSlide ? 'true' : '');
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
    }

    function goToSlide(index) {
      currentSlide = index;
      updateSlider();
    }

    let autoPlayInterval;

    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }

    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);
    



    // Enhanced Ticker Functionality
function initializeTicker() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Get user location
    getUserLocation();
    
    // Initialize news ticker
    initializeNewsTicker();
}

// Update date and time
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    const dateTimeString = now.toLocaleDateString('en-US', options);
    document.getElementById('datetime').textContent = dateTimeString;
}

// Get user location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getLocationName(lat, lon);
            },
            error => {
                document.getElementById('location').textContent = 'Location access denied';
                console.error('Error getting location:', error);
            }
        );
    } else {
        document.getElementById('location').textContent = 'Geolocation not supported';
    }
}

// Get location name from coordinates
function getLocationName(lat, lon) {
    // Using OpenStreetMap Nominatim API (free)
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(data => {
            const city = data.address.city || data.address.town || data.address.village;
            const country = data.address.country;
            if (city && country) {
                document.getElementById('location').textContent = `${city}, ${country}`;
            } else {
                document.getElementById('location').textContent = 'Location unavailable';
            }
        })
        .catch(error => {
            console.error('Error fetching location name:', error);
            document.getElementById('location').textContent = 'Location unavailable';
        });
}

// Initialize news ticker with game-related content
function initializeNewsTicker() {
    const tickerContent = [
        "New multiplayer games added every week!",
        "Tournament starting next month - Register now!",
        "Download our mobile app for exclusive content",
        "Special discounts for family game packs",
        "Rate our games and get featured on our leaderboard",
        "Join our community events every Saturday",
        "Game tutorials and guides now available",
        "Free game weekend - Try our premium games for free!"
    ];
    
    const tickerElement = document.querySelector('.ticker-text');
    let currentIndex = 0;
    
    // Set initial content
    tickerElement.textContent = tickerContent[currentIndex];
    
    // Change ticker content every 10 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % tickerContent.length;
        tickerElement.textContent = tickerContent[currentIndex];
    }, 10000);
}
    
