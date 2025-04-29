// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadBanners();
    loadBundles();
    loadContacts();
});

// Banner Images Functions
let banners = [];

function loadBanners() {
    banners = JSON.parse(localStorage.getItem('banners')) || [];
    const container = document.getElementById('bannersPreview');
    
    container.innerHTML = '';
    banners.forEach((banner, index) => {
        container.innerHTML += `
            <div class="preview-box">
                <img src="${banner.image}" alt="Banner ${index + 1}">
                ${banner.title ? `<p>${banner.title}</p>` : ''}
                <button class="remove-btn" onclick="removeBanner(${index})">×</button>
            </div>
        `;
    });
    
    // Fill remaining slots with empty boxes
    for (let i = banners.length; i < 3; i++) {
        container.innerHTML += `
            <div class="preview-box">
                <p>Banner ${i + 1}</p>
            </div>
        `;
    }
}

function uploadBanner() {
    const file = document.getElementById('bannerUpload').files[0];
    const title = document.getElementById('bannerTitle').value;
    
    if (!file) {
        alert('Please select an image file');
        return;
    }
    
    if (banners.length >= 3) {
        alert('Maximum 3 banner images allowed');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        banners.push({
            image: e.target.result,
            title: title
        });
        document.getElementById('bannerUpload').value = '';
        document.getElementById('bannerTitle').value = '';
        loadBanners();
    };
    reader.readAsDataURL(file);
}

function removeBanner(index) {
    banners.splice(index, 1);
    loadBanners();
}

// Bundles Management
let bundles = [];

function loadBundles() {
    bundles = JSON.parse(localStorage.getItem('bundles')) || [
        { name: 'Basic', price: '$5', speed: '50Mbps', devices: '2' },
        { name: 'Standard', price: '$10', speed: '100Mbps', devices: '5' },
        { name: 'Premium', price: '$20', speed: '1Gbps', devices: '10' }
    ];
    
    const container = document.getElementById('bundlesEditor');
    container.innerHTML = '';
    
    bundles.forEach((bundle, index) => {
        container.innerHTML += `
            <div class="bundle-control">
                <input type="text" value="${bundle.name}" placeholder="Bundle Name" data-index="${index}" data-field="name">
                <input type="text" value="${bundle.price}" placeholder="Price" data-index="${index}" data-field="price">
                <input type="text" value="${bundle.speed}" placeholder="Speed" data-index="${index}" data-field="speed">
                <input type="text" value="${bundle.devices}" placeholder="Devices" data-index="${index}" data-field="devices">
                <button class="remove-bundle" onclick="removeBundle(${index})">Remove</button>
            </div>
        `;
    });
    
    // Add event listeners to all inputs
    document.querySelectorAll('.bundle-control input').forEach(input => {
        input.addEventListener('change', function() {
            const index = parseInt(this.dataset.index);
            const field = this.dataset.field;
            const value = this.value;
            
            bundles[index][field] = value;
        });
    });
}

function addBundle() {
    bundles.push({
        name: 'New Bundle',
        price: '$0',
        speed: '0Mbps',
        devices: '0'
    });
    loadBundles();
}

function removeBundle(index) {
    bundles.splice(index, 1);
    loadBundles();
}

function saveBundles() {
    localStorage.setItem('bundles', JSON.stringify(bundles));
    alert('Bundles saved successfully!');
}

// Contact Functions
function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || {};
    document.getElementById('telegramLink').value = contacts.telegram || '';
    document.getElementById('emailLink').value = contacts.email || '';
    document.getElementById('phoneLink').value = contacts.phone || '';
}

function saveContacts() {
    const contacts = {
        telegram: document.getElementById('telegramLink').value,
        email: document.getElementById('emailLink').value,
        phone: document.getElementById('phoneLink').value
    };
    
    localStorage.setItem('contacts', JSON.stringify(contacts));
    alert('Contact information saved!');
    
    // Update contacts on all pages
    if (window.opener) {
        window.opener.postMessage({ type: 'updateContacts', contacts }, '*');
    }
}