const body = document.body;
body.onload = restoreTheme;

let currentTheme = 'Light';

function darkTheme() {
    document.documentElement.setAttribute('data-theme', 'dark');

    currentTheme = 'Dark';
    localStorage.setItem('lastTheme', currentTheme);
}

function lightTheme() {
    document.documentElement.setAttribute('data-theme', 'light');

    currentTheme = 'Light';
    localStorage.setItem('lastTheme', currentTheme);
}

function changeTheme() {
    if (currentTheme === 'Light') {
        darkTheme();
    } else {
        lightTheme();
    }
}

function restoreTheme() {
    const lastTheme = localStorage.getItem('lastTheme');
    if (lastTheme === 'Dark') {
        darkTheme();
    } else {
        lightTheme();
    }
}