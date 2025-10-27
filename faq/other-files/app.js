 // Function to load JSON data and populate the page
    async function loadPageData() {
      try {
        const response = await fetch('./data/faq.json');
        const data = await response.json();
        
        
        // Populate FAQ title
        document.getElementById('faq-title').textContent = data.faq.title;
        
        // Populate FAQ sections
        const accordionContainer = document.getElementById('accordion-container');
        data.faq.sections.forEach(section => {
          const accordionItem = document.createElement('div');
          accordionItem.className = 'accordion-item';
          accordionItem.innerHTML = `
            <button class="accordion-header">
                <span class="icons">${section.header}</span>
                <span class="icon">+</span>
            </button>
            <div class="accordion-content">
                <p>${section.content}</p>
            </div>
          `;
          accordionContainer.appendChild(accordionItem);
        });
        
        // Reinitialize accordion functionality after dynamic content is loaded
        initializeAccordion();
        
      } catch (error) {
        console.error('Error loading page data:', error);
      }
    }
    
    // Function to initialize accordion functionality
    function initializeAccordion() {
      const accordionItems = document.querySelectorAll('.accordion-item');
      
      accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
          // Close all other items
          accordionItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
            }
          });
          
          // Toggle current item
          item.classList.toggle('active');
        });
      });
    }
    
    // Load the page data when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
      loadPageData();
      
      // Navbar toggle functionality
      const navbartoggle = document.querySelector(".navbar-toggle");
      const navbarmenu = document.querySelector(".navbar-menu");
      
      if (navbartoggle) {
        navbartoggle.addEventListener("click", () => {
          navbartoggle.classList.toggle('active');
          navbarmenu.classList.toggle('active');
        });
      }
      
      // Scroll Observer
    const animatedElements = document.querySelectorAll(
      ".fade-up, .fade-left, .blur-in"
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.2 });

    animatedElements.forEach((el) => observer.observe(el));

    // Set current year in footer
      document.getElementById('yr').textContent = new Date().getFullYear();
      
    });