// Prints message IT'S ALIVE
console.log("IT'S ALIVE");

// Utility function that selects DOM based on CSS selector.
// Simplifies selecting the elements by making querySelectorAll more accessible.
// Converts NodeList into an array.
function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

// Step 1: Create an array of pages for navigation
let pages = [
    { url: 'index.html', title: 'Home' },
    { url: 'projects/index.html', title: 'Projects' },
    { url: 'contact/index.html', title: 'Contact' },
    { url: 'CV/index.html', title: 'Resume' },
    { url: 'https://github.com/Luisajaime94', title: 'GitHub Profile' }
];

// Create the navigation element
let nav = document.createElement('nav');
let ul = document.createElement('ul');
nav.appendChild(ul);
document.body.prepend(nav);

// Create links for the navigation
for (let p of pages) {
    let url = p.url;
    let title = p.title;

    // Create the link element
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;

    // Highlight the current page based on pathname
    a.classList.toggle('current', a.pathname === location.pathname);

    // Open external links in a new tab
    if (a.host !== location.host) {
        a.target = "_blank";
    }

    // Append the link to the <ul>
    ul.appendChild(a);
}

// Step 2: Automatic current page link
let navLinks = $$("nav a");
let currentLink = navLinks.find(
    (a) => a.host === location.host && a.pathname === location.pathname
);
if (currentLink) {
    currentLink.classList.add('current');
}

// Step 3: Adding color scheme switcher functionality
const colorSchemeLabel = document.createElement('label');
colorSchemeLabel.className = 'color-scheme';
colorSchemeLabel.innerHTML = `
    Theme:
    <select id="theme-selector">
        <option value="light dark">Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
    </select>
`;
document.body.insertAdjacentElement('afterbegin', colorSchemeLabel);

// Theme selector functionality
const themeSelector = document.getElementById('theme-selector');
themeSelector.addEventListener('change', function () {
    const selectedTheme = this.value;
    document.documentElement.setAttribute('color-scheme', selectedTheme);

    if (selectedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else if (selectedTheme === 'light') {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    } else {
        // Automatic theme detection logic could go here
        const hour = new Date().getHours();
        if (hour >= 18 || hour < 6) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }
});

// Load saved color scheme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeSelector.value = 'dark';
} else {
    themeSelector.value = 'light';
}
