document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/user');
        const data = await response.json();
        
        if (data.user) {
            const profileInfo = document.getElementById('profile-info');
            profileInfo.innerHTML = `
                <h1>Welcome, ${data.user.username}!</h1>
                <p>User ID: ${data.user.id}</p>
                ${data.user.email ? `<p>Email: ${data.user.email}</p>` : ''}
                <p>Authentication Provider: 42</p>
            `;
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
});