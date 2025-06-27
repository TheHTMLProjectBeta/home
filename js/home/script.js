document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("darkModeToggle");
    const body = document.body;
    const header = document.querySelector(".header");
    const elementsToToggle = document.querySelectorAll(".textbox, .category");
    const containerH1 = document.querySelector(".container h1"); 
    const siteLogo = document.getElementById("site-logo"); 
    const toggleIcon = toggleButton.querySelector(".material-symbols-outlined"); 

    function applyDarkModeClasses() {
        body.classList.add("dark");
        header.classList.add("dark");
        if (containerH1) { 
            containerH1.classList.add("dark");
        }
        elementsToToggle.forEach(el => el.classList.add("dark"));
    }

    function removeDarkModeClasses() {
        body.classList.remove("dark");
        header.classList.remove("dark");
        if (containerH1) { 
            containerH1.classList.remove("dark");
        }
        elementsToToggle.forEach(el => el.classList.remove("dark"));
    }

    function enableDarkMode() {
        applyDarkModeClasses();
        if (toggleIcon) {
            toggleIcon.textContent = "light_mode"; 
        }
        localStorage.setItem("darkMode", "true");
    }

    function disableDarkMode() {
        removeDarkModeClasses();
        if (toggleIcon) {
            toggleIcon.textContent = "dark_mode"; 
        }
        localStorage.setItem("darkMode", "false");
    }

    const savedMode = localStorage.getItem("darkMode");

    if (savedMode === "true") {
        enableDarkMode(); 
    } else if (savedMode === "false") {
        disableDarkMode(); 
    } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }

    window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
        if (localStorage.getItem("darkMode") === null) {
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        }
    });

    toggleButton.addEventListener("click", function() {
        if (body.classList.contains("dark")) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    const searchInput = document.getElementById("searchInput");
    const categories = document.querySelectorAll(".category");

    if (searchInput) { 
        searchInput.addEventListener("input", function() {
            const query = searchInput.value.toLowerCase();
            categories.forEach(category => {
                const links = category.querySelectorAll("a");
                let hasMatch = false;
                links.forEach(link => {
                    if (link.textContent.toLowerCase().includes(query)) {
                        link.style.display = "block"; 
                        hasMatch = true;
                    } else {
                        link.style.display = "none"; 
                    }
                });
                category.style.display = hasMatch ? "block" : "none";
            });
        });
    }

    const closePopupButton = document.getElementById("closePopup");
    const welcomePopup = document.getElementById("welcomePopup");

    if (closePopupButton && welcomePopup) { 
        closePopupButton.addEventListener("click", function() {
            welcomePopup.style.display = "none"; 
        });
    }
});
