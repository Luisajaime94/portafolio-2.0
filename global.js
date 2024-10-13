// Prints message ITS ALIVE
console.log("IT'S ALIVE");

// Utility function that selects DOM based on CSS selector.
// Simplifies selecting the elements by making querySelectorAll more accessible.
// Converts NodeList into an array.
function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

// Step 2: Automatic current page link
// Step 2.1: Get an array of all nav links into a variable
let navLinks = $$("nav a");

// Step 2.2: Find the link to the current page
let currentLink = navLinks.find(
    (a) => a.host === location.host && a.pathname === location.pathname
);

// Step 2.3: Add the current class to the current page link
if (currentLink) {
    currentLink.classList.add('current');
}

// Step 4.2: Adding color scheme switcher functionality
const select = document.querySelector('.color-scheme select');

select.addEventListener('input', function (event) {
    const colorScheme = event.target.value;
    document.documentElement.style.setProperty('color-scheme', colorScheme);
    localStorage.colorScheme = colorScheme; // Save preference
});

// Load the user's preference on page load
if ('colorScheme' in localStorage) {
    const savedScheme = localStorage.colorScheme;
    document.documentElement.style.setProperty('color-scheme', savedScheme);
    select.value = savedScheme; // Set select to saved value
}
