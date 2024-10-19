// Prints message IT'S ALIVE
console.log("IT'S ALIVE");

// Create the navigation bar when DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Pages array with relative URLs
    let pages = [
        { url: "index.html", title: "Home" },
        { url: "projects/index.html", title: "Projects" },
        { url: "cv/index.html", title: "CV" },
        { url: "contact/index.html", title: "Contact" },
        { url: "https://github.com/Luisajaime94", title: "GitHub" }
    ];

    // Get the existing nav element
    let nav = document.querySelector('nav ul');

    // Dynamically create the navigation links
    pages.forEach((p) => {
        let li = document.createElement('li');
        let a = document.createElement('a');

        // Check if the current page is in a subdirectory
        let isSubPage = window.location.pathname.split('/').length > 2;
        
        // Adjust URL for subpages
        let adjustedURL = isSubPage && !p.url.startsWith('http') ? '../' + p.url : p.url;

        a.href = adjustedURL;
        a.textContent = p.title;
        li.appendChild(a);
        nav.appendChild(li);

        // Add 'current' class for the active page
        a.classList.toggle(
            'current',
            a.host === location.host && a.pathname === location.pathname
        );

        // Open external links in a new tab
        if (a.host !== location.host) {
            a.target = '_blank';
        }
    });

    // Theme switcher logic
    const themeSwitcher = document.getElementById('theme-select');
    themeSwitcher.addEventListener('change', (event) => {
        const selectedTheme = event.target.value;

        if (selectedTheme === 'dark') {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else if (selectedTheme === 'light') {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.removeItem('theme');
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
        }
    });

    // Apply saved or system-preferred theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.toggle('dark', savedTheme === 'dark');
        themeSwitcher.value = savedTheme;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark');
        themeSwitcher.value = 'auto';
    }
});
