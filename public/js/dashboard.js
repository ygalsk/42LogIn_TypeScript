// public/js/dashboard.js
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/user');
        const data = await response.json();
        
        if (data.user) {
            // Update profile information
            document.getElementById('username').textContent = data.user.username;
            document.getElementById('email').textContent = data.user.email || 'No email provided';
            
            // Set profile image (assuming you have an image URL in the user data)
            const profileImage = document.getElementById('profile-image');
            profileImage.src = data.user.imageUrl || 'https://42.fr/wp-content/uploads/2021/05/42-Final-sigle-seul.svg';
            profileImage.onerror = () => {
                profileImage.src = 'https://42.fr/wp-content/uploads/2021/05/42-Final-sigle-seul.svg';
            };

            // Update last login
            const lastLogin = new Date(data.user.lastLogin || data.user.createdAt);
            document.getElementById('last-login').textContent = lastLogin.toLocaleDateString();

            // Calculate account age
            const createdAt = new Date(data.user.createdAt);
            const days = Math.floor((new Date() - createdAt) / (1000 * 60 * 60 * 24));
            document.getElementById('account-age').textContent = `${days} days`;

        } else {
            throw new Error('User data not found');
        }
    } catch (error) {
        console.error('Error loading dashboard:', error);
        // Handle error (redirect to login or show error message)
    }
});