document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("darkModeToggle");
    const body = document.body;
    const header = document.querySelector(".header");
    const elementsToToggle = document.querySelectorAll(".textbox, .category");
    const containerH1 = document.querySelector(".container h1");

    if (localStorage.getItem("darkMode") === "true") {
        enableDarkMode();
    }

    toggleButton.addEventListener("click", function() {
        if (body.classList.contains("dark")) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        body.classList.add("dark");
        header.classList.add("dark");
        containerH1.classList.add("dark");
        elementsToToggle.forEach(el => el.classList.add("dark"));
        toggleButton.querySelector("img").src = "light.jpg";
        localStorage.setItem("darkMode", "true");
    }

    function disableDarkMode() {
        body.classList.remove("dark");
        header.classList.remove("dark");
        containerH1.classList.remove("dark");
        elementsToToggle.forEach(el => el.classList.remove("dark"));
        toggleButton.querySelector("img").src = "dark.jpg";
        localStorage.setItem("darkMode", "false");
    }

    // Search Functionality
    const searchInput = document.getElementById("searchInput");
    const categories = document.querySelectorAll(".category");

    searchInput.addEventListener("input", function() {
        const query = searchInput.value.toLowerCase();
        categories.forEach(category => {
            const links = category.querySelectorAll("a");
            let hasMatch = false;
            links.forEach(link => {
                if (link.textContent.toLowerCase().includes(query)) {
                    link.style.display = "block"; // Show link if it matches
                    hasMatch = true;
                } else {
                    link.style.display = "none"; // Hide link if it doesn't match
                }
            });
            // If no link matches, hide the entire category
            category.style.display = hasMatch ? "block" : "none";
        });
    });

    // Close popup when "Close" button is clicked (if you re-add a popup)
    // const closePopupButton = document.getElementById("closePopup");
    // const welcomePopup = document.getElementById("welcomePopup");

    // if (closePopupButton && welcomePopup) {
    //     closePopupButton.addEventListener("click", function() {
    //         welcomePopup.style.display = "none"; // Hide the pop-up
    //     });
    // }

    // Logic for the welcome popup (re-added if needed)
    const currentMessage = "New Games"; // Change this text when you want the popup to reappear

    if (localStorage.getItem("popupMessage") !== currentMessage) {
        alert(currentMessage);
        localStorage.setItem("popupMessage", currentMessage);
    }
});
