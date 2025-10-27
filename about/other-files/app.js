// Function to load all JSON data and populate the page
async function loadPageContent() {
    try {
        // Load page configuration
        const configResponse = await fetch('./data/page-config.json');
        const configData = await configResponse.json();

        // Set page title and hero section
        document.getElementById('page-title').textContent = configData.page.title;
        document.getElementById('hero-title').textContent = configData.hero.title;
        document.getElementById('hero-subtitle').textContent = configData.hero.subtitle;
        document.getElementById('hero-section').style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url("${configData.hero.backgroundImage}")`;

        // Load all other JSON files
        const jsonFiles = [
            './data/overview.json',
            './data/features.json',
            './data/technical.json',
            './data/functionality.json',
            './data/installation.json',
            './data/future.json'
        ];

        const contentContainer = document.getElementById('content-container');

        for (const file of jsonFiles) {
            const response = await fetch(file);
            const data = await response.json();
            renderContent(data, contentContainer);
        }

    } catch (error) {
        console.error('Error loading page content:', error);
        contentContainer.innerHTML = '<p>Error loading content. Please try again later.</p>';
    }
}

// Function to render content based on JSON structure
function renderContent(data, container) {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const section = data[key];

            const article = document.createElement('article');

            if (section.title) {
                const title = document.createElement('h1');
                title.textContent = section.title;
                article.appendChild(title);
            }

            if (section.content) {
                const dl = document.createElement('dl');
                const dd = document.createElement('dd');
                dd.textContent = section.content;
                dd.className = 'size';
                dl.appendChild(dd);
                article.appendChild(dl);
            }

            if (section.items && Array.isArray(section.items)) {
                const ul = document.createElement('ul');
                section.items.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    li.className = 'size';
                    ul.appendChild(li);
                });
                article.appendChild(ul);
            }

            if (section.sections && Array.isArray(section.sections)) {
                const ol = document.createElement('ol');
                ol.type = '1';

                section.sections.forEach((subSection, index) => {
                    const li = document.createElement('li');
                    li.className = 'size1';
                    li.textContent = subSection.title;

                    const ul = document.createElement('ul');
                    subSection.items.forEach(item => {
                        const subLi = document.createElement('li');
                        subLi.textContent = item;
                        subLi.className = 'size';
                        ul.appendChild(subLi);
                    });

                    li.appendChild(ul);
                    ol.appendChild(li);
                });

                article.appendChild(ol);
            }

            // Add documentation info for support section
            if (section.documentation) {
                const docDl = document.createElement('dl');
                const versionDd = document.createElement('dd');
                versionDd.textContent = `Documentation Version: ${section.documentation.version}`;
                versionDd.className = 'size';

                const updatedDd = document.createElement('dd');
                updatedDd.textContent = `Last Updated: ${section.documentation.lastUpdated}`;
                updatedDd.className = 'size';

                const preparedDd = document.createElement('dd');
                preparedDd.textContent = `Prepared By: ${section.documentation.preparedBy}`;
                preparedDd.className = 'size';

                docDl.appendChild(versionDd);
                docDl.appendChild(updatedDd);
                docDl.appendChild(preparedDd);
                article.appendChild(docDl);
            }

            container.appendChild(article);
        }
    }
}

// Load content when page is ready
document.addEventListener('DOMContentLoaded', function () {
    
    loadPageContent();
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
});