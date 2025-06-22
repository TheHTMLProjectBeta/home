document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("darkModeToggle");
    const body = document.body;
    const header = document.querySelector(".header");
    const elementsToToggle = document.querySelectorAll(".textbox, .category");
    const containerH1 = document.querySelector(".container h1");

    // Dark Mode Toggle Logic
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
        // Check if containerH1 exists before adding class
        if (containerH1) {
            containerH1.classList.add("dark");
        }
        elementsToToggle.forEach(el => el.classList.add("dark"));
        toggleButton.querySelector("img").src = "https://assets.thehtmlproject.com/img/light.jpg"; // Updated image path
        localStorage.setItem("darkMode", "true");
    }

    function disableDarkMode() {
        body.classList.remove("dark");
        header.classList.remove("dark");
        // Check if containerH1 exists before removing class
        if (containerH1) {
            containerH1.classList.remove("dark");
        }
        elementsToToggle.forEach(el => el.classList.remove("dark"));
        toggleButton.querySelector("img").src = "https://assets.thehtmlproject.com/img/dark.jpg"; // Updated image path
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
                    link.style.display = "block";
                    hasMatch = true;
                } else {
                    link.style.display = "none";
                }
            });
            category.style.display = hasMatch ? "block" : "none";
        });
    });

    // Account Pop-up Logic
    const accountSwitcherButton = document.getElementById("accountSwitcherButton");
    const accountPopup = document.getElementById("accountPopup");
    const closeAccountPopupBtn = accountPopup.querySelector(".close-popup-btn");
    const greetingMessage = document.getElementById("greetingMessage");
    const userName = "User"; // Placeholder for the user's name

    function updateGreeting() {
        const hour = new Date().getHours();
        let greeting;
        if (hour < 12) {
            greeting = "Good morning";
        } else if (hour < 18) {
            greeting = "Good afternoon";
        } else {
            greeting = "Good evening";
        }
        greetingMessage.textContent = `${greeting}, ${userName}!`;
    }

    accountSwitcherButton.addEventListener("click", function() {
        updateGreeting(); // Update greeting every time the popup opens
        accountPopup.style.display = "flex"; // Show the popup
    });

    closeAccountPopupBtn.addEventListener("click", function() {
        accountPopup.style.display = "none"; // Hide the popup
    });

    // Close popup if clicked outside (optional, but good UX)
    accountPopup.addEventListener("click", function(event) {
        if (event.target === accountPopup) {
            accountPopup.style.display = "none";
        }
    });

    // Custom Alert Modal Logic (Replaces native alert())
    const customAlertModal = document.getElementById("customAlertModal");
    const customAlertMessage = document.getElementById("customAlertMessage");
    const customAlertCloseBtn = document.getElementById("customAlertCloseBtn");

    function showAlert(message) {
        customAlertMessage.textContent = message;
        customAlertModal.style.display = "flex"; // Show the modal
    }

    customAlertCloseBtn.addEventListener("click", function() {
        customAlertModal.style.display = "none"; // Hide the modal
    });

    // Attach custom alert to links with data-message
    document.querySelectorAll(".trigger-alert").forEach(link => {
        // Store original href to navigate after showing alert
        const originalHref = link.href;
        const originalTarget = link.target;
        const alertMessage = link.getAttribute("data-message");

        // Prevent default navigation directly
        link.href = "#"; 
        link.target = "_self"; // Override target to prevent new tabs on first click

        link.addEventListener("click", function(event) {
            event.preventDefault(); // Stop default link behavior
            showAlert(alertMessage); // Show custom alert

            // After alert, if user closes it, they will manually click the link again
            // Or, you can automatically navigate after a short delay/user confirmation
            // For now, it just shows the message. If you want automatic navigation,
            // you'd add a small delay and then window.open(originalHref, originalTarget);
            // or modify the custom alert to have a "Proceed" button.
            
            // To ensure navigation after alert is dismissed:
            // One simple way: modify the customAlertCloseBtn to trigger navigation
            // if an originalHref is set.
            customAlertCloseBtn.onclick = function() {
                customAlertModal.style.display = "none";
                if (originalHref) {
                    // Navigate if a valid originalHref exists
                    window.open(originalHref, originalTarget || '_self');
                }
                // Reset onclick to default behavior for next alert
                customAlertCloseBtn.onclick = null;
            };
        });
    });

    // Remove the previous alert popup logic (if it was still in the JS)
    // The original popup logic from your provided code has been commented out or removed.
    // Ensure this part is not duplicated if you had it in your old JS file:
    // const currentMessage = "New Games"; 
    // if (localStorage.getItem("popupMessage") !== currentMessage) {
    //     alert(currentMessage); // This is the alert being replaced
    //     localStorage.setItem("popupMessage", currentMessage);
    // }
});
