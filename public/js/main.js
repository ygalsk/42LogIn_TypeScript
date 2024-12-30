document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/user');
        const data = await response.json();
        
        if (data.user) {
            const profileInfo = document.getElementById('profile-info');
            profileInfo.innerHTML = `
                <h1>Welcome, ${data.user.username}!</h1>
                <div class="user-info">
                    <p><strong>User ID:</strong> ${data.user.id}</p>
                    ${data.user.email ? `<p><strong>Email:</strong> ${data.user.email}</p>` : ''}
                    <p><strong>Account Created:</strong> ${new Date(data.user.createdAt).toLocaleString()}</p>
                    <p><strong>Last Login:</strong> ${data.user.lastLogin ? new Date(data.user.lastLogin).toLocaleString() : 'N/A'}</p>
                </div>
            `;
        } else {
            throw new Error('User data not found');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        const profileInfo = document.getElementById('profile-info');
        profileInfo.innerHTML = `
            <div class="error-message">
                <h2>Error Loading Profile</h2>
                <p>There was a problem loading your profile information.</p>
            </div>
        `;
    }
});