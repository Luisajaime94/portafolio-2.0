// Get the select element
const select = document.getElementById('theme-select');

// Set the initial value based on localStorage
if ('colorScheme' in localStorage) {
    select.value = localStorage.colorScheme;
    document.documentElement.style.setProperty('color-scheme', localStorage.colorScheme);
}

// Add event listener to handle changes
select.addEventListener('input', function (event) {
    const colorScheme = event.target.value;
    document.documentElement.style.setProperty('color-scheme', colorScheme);
    localStorage.colorScheme = colorScheme; // Save preference
});
