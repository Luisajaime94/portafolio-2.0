let pages = [
    { url: 'index.html', title: 'Home' }, // Adjust to direct link to index
    { url: 'projects/index.html', title: 'Projects' },
    { url: 'contact/index.html', title: 'Contact' },
    { url: 'CV/index.html', title: 'Resume' },
    { url: 'https://github.com/Luisajaime94', title: 'GitHub Profile' }
];

// Create the navigation element
let nav = document.createElement('nav');
let ul = document.createElement('ul'); // Create <ul> element
nav.appendChild(ul); // Append <ul> to <nav>
document.body.prepend(nav); // Prepend <nav> to <body>

// Create the color scheme switcher
document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <label class="color-scheme">
        Theme:
        <select id="theme-selector">
            <option value="light dark">Automatic</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
        </select>
    </label>
    `
);

// Check if we are on the home page
const ARE_WE_HOME = document.documentElement.classList.contains('home');

// Create links for the navigation
for (let p of pages) {
    let url = p.url;
    let title = p.title;

    // Add '../' to the URL if we are not on the home page
    url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;

    // Create the link element
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;

    // Highlight the current page
    a.classList.toggle(
        'current',
        a.host === location.host && a.pathname === location.pathname
    );

    // Open external links in a new tab
    if (a.host !== location.host) {
        a.target = "_blank";
    }

    // Append the link to the <ul>
    ul.appendChild(a); // Append the link to <ul>
}

// Function to handle the theme change
document.getElementById('theme-selector').addEventListener('change', function () {
    const selectedTheme = this.value;
    document.documentElement.setAttribute('color-scheme', selectedTheme);
});
