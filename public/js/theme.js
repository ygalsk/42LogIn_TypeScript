// public/js/theme.js
document.addEventListener('DOMContentLoaded', () => {
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
});

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle .icon');
    icon.className = `icon fas fa-${theme === 'dark' ? 'moon' : 'sun'}`;
}