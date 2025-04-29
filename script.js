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
    
    // Set all contact links
    const setLink = (id, value) => {
        const element = document.getElementById(id);
        if (element && value) element.href = value;
    };
    
    setLink('telegramLink', contacts.telegram);
    setLink('whatsappLink', contacts.whatsapp);
    setLink('instagramLink', contacts.instagram);
    setLink('twitterLink', contacts.twitter);
    setLink('phoneLink', contacts.phone ? `tel:${contacts.phone}` : '');
});
