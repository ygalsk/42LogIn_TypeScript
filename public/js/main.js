// main.js
document.addEventListener('DOMContentLoaded', () => {
    // Theme Management
    const themeToggle = document.querySelector('.theme-toggle');
    const icon = themeToggle.querySelector('.icon');
    
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Theme toggle handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animate icon
        icon.style.animation = 'rotate 0.5s ease';
        setTimeout(() => {
            updateThemeIcon(newTheme);
            icon.style.animation = '';
        }, 500);
    });

    // Profile Data Management
    let userData = null;
    const profileInfo = document.getElementById('profile-info');
    const statsContainer = document.getElementById('stats-container');
    const refreshBtn = document.getElementById('refresh-btn');
    const statsToggle = document.getElementById('stats-toggle');

    // Load user data
    async function loadUserData() {
        try {
            const response = await fetch('/api/user');
            const data = await response.json();
            
            if (data.user) {
                userData = data.user;
                renderProfile();
                renderStats();
            } else {
                throw new Error('User data not found');
            }
        } catch (error) {
            console.error('Error:', error);
            showError('Failed to load profile data');
        }
    }

    // Render profile information
    function renderProfile() {
        const lastLoginDate = userData.lastLogin 
            ? new Date(userData.lastLogin).toLocaleString()
            : 'N/A';
        
        const accountAge = Math.floor(
            (new Date() - new Date(userData.createdAt)) / (1000 * 60 * 60 * 24)
        );

        profileInfo.innerHTML = `
            <h1 class="slide-up">Welcome, ${userData.username}!</h1>
            <div class="user-info">
                <p class="slide-up" style="--delay: 0.1s">
                    <i class="fas fa-id-card"></i>
                    <strong>User ID:</strong>
                    <span>${userData.id}</span>
                </p>
                ${userData.email ? `
                    <p class="slide-up" style="--delay: 0.2s">
                        <i class="fas fa-envelope"></i>
                        <strong>Email:</strong>
                        <span>${userData.email}</span>
                    </p>
                ` : ''}
                <p class="slide-up" style="--delay: 0.3s">
                    <i class="fas fa-calendar-alt"></i>
                    <strong>Account Age:</strong>
                    <span>${accountAge} days</span>
                </p>
                <p class="slide-up" style="--delay: 0.4s">
                    <i class="fas fa-clock"></i>
                    <strong>Last Login:</strong>
                    <span>${lastLoginDate}</span>
                </p>
            </div>
        `;
    }

    // Render stats section
    function renderStats() {
        const statsGrid = document.querySelector('.stats-grid');
        statsGrid.innerHTML = `
            <div class="stat-card">
                <i class="fas fa-sign-in-alt"></i>
                <h3>Login Count</h3>
                <p>${userData.loginCount || 0}</p>
            </div>
            <div class="stat-card">
                <i class="fas fa-calendar-check"></i>
                <h3>Days Active</h3>
                <p>${Math.floor((new Date() - new Date(userData.createdAt)) / (1000 * 60 * 60 * 24))}</p>
            </div>
        `;
    }

    // Error handling
    function showError(message) {
        profileInfo.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <h2>Error</h2>
                <p>${message}</p>
                <button class="button primary" onclick="location.reload()">
                    <i class="fas fa-redo"></i>
                    Try Again
                </button>
            </div>
        `;
    }

    // Update theme icon
    function updateThemeIcon(theme) {
        icon.className = `icon fas fa-${theme === 'dark' ? 'moon' : 'sun'}`;
    }

    // Event Listeners
    refreshBtn.addEventListener('click', () => {
        refreshBtn.classList.add('rotating');
        loadUserData().finally(() => {
            setTimeout(() => refreshBtn.classList.remove('rotating'), 500);
        });
    });

    statsToggle.addEventListener('click', () => {
        const isHidden = statsContainer.style.display === 'none';
        statsContainer.style.display = isHidden ? 'block' : 'none';
        statsToggle.querySelector('i').className = `fas fa-chart-${isHidden ? 'bar' : 'line'}`;
    });

    // Initialize
    loadUserData();
});