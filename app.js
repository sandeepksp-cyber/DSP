// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('product-canvas'),
    antialias: true
});

// Set renderer size and background
renderer.setSize(document.getElementById('product-canvas').offsetWidth, 500);
renderer.setClearColor(0xffffff);

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

// Create a sample 3D product (shoe)
const geometry = new THREE.BoxGeometry(2, 1, 3);
const material = new THREE.MeshPhongMaterial({ color: 0x2ecc71 });
const product = new THREE.Mesh(geometry, material);
scene.add(product);

// Position camera
camera.position.z = 5;

// Animation variables
let rotationSpeed = 0;
const ROTATION_AMOUNT = 0.02;
let zoomLevel = 5;

// Controls
document.getElementById('rotate-left').addEventListener('click', () => {
    rotationSpeed = -ROTATION_AMOUNT;
});

document.getElementById('rotate-right').addEventListener('click', () => {
    rotationSpeed = ROTATION_AMOUNT;
});

document.getElementById('zoom-in').addEventListener('click', () => {
    if (zoomLevel > 3) {
        zoomLevel -= 0.5;
        camera.position.z = zoomLevel;
    }
});

document.getElementById('zoom-out').addEventListener('click', () => {
    if (zoomLevel < 7) {
        zoomLevel += 0.5;
        camera.position.z = zoomLevel;
    }
});

// Cart functionality
let cartCount = 0;
document.getElementById('add-to-cart').addEventListener('click', () => {
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Apply rotation
    product.rotation.y += rotationSpeed;
    
    // Slow down rotation
    rotationSpeed *= 0.95;
    
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(document.getElementById('product-canvas').offsetWidth, 500);
    camera.aspect = document.getElementById('product-canvas').offsetWidth / 500;
    camera.updateProjectionMatrix();
});

// Start animation
animate();

// Update time in the header
function updateTime() {
    const timeElement = document.querySelector('.time');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}`;
}

// Update time every minute
setInterval(updateTime, 60000);
updateTime();

// Simulate battery level
document.querySelector('.battery').textContent = '80%';

// Add click handlers for buttons
document.querySelectorAll('.details-btn').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.investment-card');
        const planName = card.querySelector('h2').textContent;
        alert(`Details for ${planName}\nThis is a demo investment platform created for educational purposes only.`);
    });
});

document.querySelectorAll('.invest-btn').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.investment-card');
        const planName = card.querySelector('h2').textContent;
        const amount = card.querySelector('.investment-amount').textContent;
        alert(`Investment Demo for ${planName}\nAmount: ${amount}\n\nNote: This is a demo platform for educational purposes only. No real investments are being made.`);
    });
});

// Add active state to bottom navigation
document.querySelectorAll('.bottom-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.bottom-nav a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Show demo message
        const section = this.textContent.trim();
        alert(`${section} section clicked.\nThis is a demo platform for educational purposes only.`);
    });
});

// Add hover effects to cards
document.querySelectorAll('.investment-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.transition = 'transform 0.3s ease';
        this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Navigation handling
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        // Remove active class from all sections and nav items
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        
        // Add active class to clicked nav item
        item.classList.add('active');
        
        // Show corresponding section
        const targetId = item.getAttribute('href').substring(1);
        document.getElementById(targetId).classList.add('active');
    });
});

// Load user profile
function loadUserProfile() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.isLoggedIn) {
        document.getElementById('username').textContent = user.username;
        document.getElementById('profileName').textContent = user.fullname || 'Not set';
        document.getElementById('profileEmail').textContent = user.email || 'Not set';
        document.getElementById('profileUsername').textContent = user.username;
        document.getElementById('memberSince').textContent = new Date().toLocaleDateString();
    }
}

// Handle logout
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Copy referral code
function copyRefCode() {
    const refCode = document.getElementById('refCode').textContent;
    navigator.clipboard.writeText(refCode).then(() => {
        alert('Referral code copied to clipboard!');
    });
}

// Share buttons functionality
document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const refCode = document.getElementById('refCode').textContent;
        const text = `Join me on DSP Investment Education Platform! Use my referral code: ${refCode}`;
        if (btn.classList.contains('whatsapp')) {
            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
        } else if (btn.classList.contains('telegram')) {
            window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(text)}`);
        }
    });
});

// Generate investment cards
function generateInvestmentCards() {
    const container = document.querySelector('.investment-cards');
    container.innerHTML = ''; // Clear existing cards
    
    const plans = [
        { name: 'DSP-1000', investment: 1000, daily: 20, total: 3000, days: 150, ratio: "2%" },
        { name: 'DSP-3000', investment: 3000, daily: 60, total: 9000, days: 150, ratio: "2%" },
        { name: 'DSP-5000', investment: 5000, daily: 100, total: 15000, days: 150, ratio: "2%" },
        { name: 'DSP-10000', investment: 10000, daily: 200, total: 30000, days: 150, ratio: "2%" },
        { name: 'DSP-20000', investment: 20000, daily: 400, total: 60000, days: 150, ratio: "2%" },
        { name: 'DSP-30000', investment: 30000, daily: 600, total: 90000, days: 150, ratio: "2%" },
        { name: 'DSP-50000', investment: 50000, daily: 1000, total: 150000, days: 150, ratio: "2%" },
        { name: 'DSP-80000', investment: 80000, daily: 1600, total: 240000, days: 150, ratio: "2%" },
        { name: 'DSP-100000', investment: 100000, daily: 2000, total: 300000, days: 150, ratio: "2%" },
        { name: 'DSP-150000', investment: 150000, daily: 3000, total: 450000, days: 150, ratio: "2%" }
    ];
    
    plans.forEach((plan, i) => {
        const card = document.createElement('div');
        card.className = 'investment-card';
        card.innerHTML = `
            <div class="card-header">
                <h3>${plan.name}</h3>
                <span class="offer-tag">Offer ${i + 1}</span>
            </div>
            <div class="card-content">
                <div class="investment-details">
                    <p>Daily Income: <span>₹${plan.daily}</span></p>
                    <p>Total Income: <span>₹${plan.total}</span></p>
                    <p>Daily Profit Ratio: <span>${plan.ratio}</span></p>
                    <p>Cycle: <span>${plan.days} Days</span></p>
                </div>
                <div class="investment-amount">₹${plan.investment.toLocaleString()}</div>
                <div class="action-buttons">
                    <button class="details-btn" onclick="showDetails(${i})">Details</button>
                    <button class="invest-btn" onclick="showInvestment(${i})">Investment</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function showDetails(planIndex) {
    const plans = [
        { name: 'DSP-1000', investment: 1000, daily: 20, total: 3000, days: 150, ratio: "2%" },
        { name: 'DSP-3000', investment: 3000, daily: 60, total: 9000, days: 150, ratio: "2%" },
        { name: 'DSP-5000', investment: 5000, daily: 100, total: 15000, days: 150, ratio: "2%" },
        { name: 'DSP-10000', investment: 10000, daily: 200, total: 30000, days: 150, ratio: "2%" },
        { name: 'DSP-20000', investment: 20000, daily: 400, total: 60000, days: 150, ratio: "2%" },
        { name: 'DSP-30000', investment: 30000, daily: 600, total: 90000, days: 150, ratio: "2%" },
        { name: 'DSP-50000', investment: 50000, daily: 1000, total: 150000, days: 150, ratio: "2%" },
        { name: 'DSP-80000', investment: 80000, daily: 1600, total: 240000, days: 150, ratio: "2%" },
        { name: 'DSP-100000', investment: 100000, daily: 2000, total: 300000, days: 150, ratio: "2%" },
        { name: 'DSP-150000', investment: 150000, daily: 3000, total: 450000, days: 150, ratio: "2%" }
    ];

    const plan = plans[planIndex];
    alert(`Plan Details:
Name: ${plan.name}
Investment Amount: ₹${plan.investment}
Daily Income: ₹${plan.daily}
Total Income: ₹${plan.total}
Daily Profit Ratio: ${plan.ratio}
Cycle: ${plan.days} Days

*This is for educational purposes only
    `);
}

function showInvestment(planIndex) {
    const plans = [
        { name: 'DSP-1000', investment: 1000, daily: 20, total: 3000, days: 150, ratio: "2%" },
        { name: 'DSP-3000', investment: 3000, daily: 60, total: 9000, days: 150, ratio: "2%" },
        { name: 'DSP-5000', investment: 5000, daily: 100, total: 15000, days: 150, ratio: "2%" },
        { name: 'DSP-10000', investment: 10000, daily: 200, total: 30000, days: 150, ratio: "2%" },
        { name: 'DSP-20000', investment: 20000, daily: 400, total: 60000, days: 150, ratio: "2%" },
        { name: 'DSP-30000', investment: 30000, daily: 600, total: 90000, days: 150, ratio: "2%" },
        { name: 'DSP-50000', investment: 50000, daily: 1000, total: 150000, days: 150, ratio: "2%" },
        { name: 'DSP-80000', investment: 80000, daily: 1600, total: 240000, days: 150, ratio: "2%" },
        { name: 'DSP-100000', investment: 100000, daily: 2000, total: 300000, days: 150, ratio: "2%" },
        { name: 'DSP-150000', investment: 150000, daily: 3000, total: 450000, days: 150, ratio: "2%" }
    ];

    const plan = plans[planIndex];
    alert(`Investment Plan:
Name: ${plan.name}
Amount to Invest: ₹${plan.investment}
Expected Daily Income: ₹${plan.daily}
Expected Total Income: ₹${plan.total}
Investment Period: ${plan.days} Days

*This is for educational purposes only
    `);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadUserProfile();
    generateInvestmentCards();
});
