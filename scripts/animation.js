// Animation Script
// Add smooth falling animation to lotus elements

document.addEventListener("DOMContentLoaded", function () {
    const lotusElements = document.querySelectorAll(".lotus");
    lotusElements.forEach(lotus => {
        lotus.style.transition = "all 3s ease-out";
        lotus.style.transform = "translateY(100vh)";
    });
});
