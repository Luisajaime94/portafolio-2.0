// Prints message IT'S ALIVE
console.log("IT'S ALIVE");

// Utility function that selects DOM based on CSS selector.
// Simplifies selecting the elements by making querySelectorAll more accessible.
// Converts NodeList into an array.
function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

// Array of navLinks
let navLinks = $$('nav a');

// Finding the link to the current page
let currentLink = navLinks.find(
    (a) => a.host === location.host && a.pathname === location.pathname
);

// Adding the current class to the current page link
currentLink?.classList.add('current');

// Same pages as before
let pages = [
    { url: "index.html", title: "Home" },
    { url: "projects/index.html", title: 'Projects' },
    { url: 'resume/index.html', title: 'Resume' },
    { url: 'contacts/index.html', title: 'Contacts' },
    { url: 'https://github.com/Luisajaime94', title: "Github" }
];

// Seeing if we are on the home page and storing it in a variable
const ARE_WE_HOME = document.documentElement.classList.contains('home');

// Creating the navigation bar when DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get the existing nav element
    let nav = document.querySelector('nav');

    // Creating the links
    for (let p of pages) {
        let a = document.createElement('a');
        let url = p.url;

        // Adjust the URL if not on the home page
        if (!ARE_WE_HOME && !url.startsWith('http')) {
            url = '../' + url;
        }
        a.href = url;
        a.textContent = p.title;
        nav.append(a);

        // Toggle 'current' class for active link
        a.classList.toggle(
            'current',
            a.host === location.host && a.pathname === location.pathname
        );

        // Open in a new tab if it's an external link
        if (a.host !== location.host) {
            a.target = '_blank';
        }
    }

    // To create each link and add it to the nav and add the theme
    document.body.insertAdjacentHTML('afterbegin', `
        <label class="color-scheme">
            Theme:
            <select id="theme-switcher">
                <option value="light">Automatic</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
        </label>
    `);

    // Contact page form submission handling
    const form = document.getElementById('contactForm');
    form?.addEventListener('submit', function(event) {
        event.preventDefault();
        const data = new FormData(form);
        let url = form.action + '?';
        for (let [name, value] of data) {
            url += `${encodeURIComponent(name)}=${encodeURIComponent(value)}&`;
        }
        url = url.slice(0, -1); // Remove the last '&'
        location.href = url; // Redirect to the constructed URL
    });
});
