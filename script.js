// Admin Login System
const loginBtn = document.getElementById("loginBtn");
const modal = document.getElementById("loginModal");
const closeBtn = document.querySelector(".close");
const submitLogin = document.getElementById("submitLogin");

if (loginBtn) loginBtn.addEventListener("click", () => modal.style.display = "block");
if (closeBtn) closeBtn.addEventListener("click", () => modal.style.display = "none");

if (submitLogin) {
    submitLogin.addEventListener("click", () => {
        if (document.getElementById("adminPassword").value === "tcvpn") {
            window.location.href = "admin/dashboard.html";
        } else {
            alert("Incorrect password! Try 'tcvpn'");
        }
    });
}

window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});

// Load contact links
document.addEventListener('DOMContentLoaded', function() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || {};
    const contactIcons = document.getElementById('contactIcons');
    
    if (contactIcons) {
        contactIcons.innerHTML = '';
        if (contacts.telegram) {
            contactIcons.innerHTML += `<a href="${contacts.telegram}" target="_blank"><i class="fab fa-telegram"></i></a>`;
        }
        if (contacts.email) {
            contactIcons.innerHTML += `<a href="mailto:${contacts.email}"><i class="fas fa-envelope"></i></a>`;
        }
        if (contacts.phone) {
            contactIcons.innerHTML += `<a href="tel:${contacts.phone}"><i class="fas fa-phone"></i></a>`;
        }
    }
});