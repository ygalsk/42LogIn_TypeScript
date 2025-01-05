document.addEventListener('DOMContentLoaded', async () => {
    const loadingOverlay = document.getElementById('loading-overlay');
    
    try {
        // Fetch all user data in parallel
        const [
            userData,
            projectsData,
            achievementsData,
            coalitionData,
            campusData
        ] = await Promise.all([
            fetch('/api/user').then(res => res.json()),
            fetch('/api/user-projects').then(res => res.json()),
            fetch('/api/user-achievements').then(res => res.json()),
            fetch('/api/user-coalitions').then(res => res.json()),
            fetch('/api/user-campus').then(res => res.json())
        ]);

        // Update profile section
        updateProfile(userData);
        
        // Update projects section
        updateProjects(projectsData);
        
        // Update achievements section
        updateAchievements(achievementsData);
        
        // Update coalition section
        updateCoalition(coalitionData);
        
        // Update campus stats section
        updateCampusStats(campusData);

    } catch (error) {
        console.error('Error fetching user data:', error);
        showError('Failed to load user data');
    } finally {
        loadingOverlay.style.display = 'none';
    }
});

function updateProfile(userData) {
    document.getElementById('user-image').src = userData.image_url;
    document.getElementById('user-name').textContent = userData.displayname;
    document.getElementById('user-email').textContent = userData.email;
    document.getElementById('user-level').textContent = 
        userData.cursus_users[0]?.level.toFixed(2) || '0';
}

function updateProjects(projects) {
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = projects.map(project => `
        <div class="project-card">
            <h3>${project.project.name}</h3>
            <p>Status: ${project.status}</p>
            <p>Final Mark: ${project.final_mark || 'Not graded'}</p>
            ${project.validated ? 
                '<span class="badge success">Validated</span>' : 
                '<span class="badge error">Not Validated</span>'
            }
        </div>
    `).join('');
}

function updateAchievements(achievements) {
    const achievementsList = document.getElementById('achievements-list');
    document.getElementById('achievement-count').textContent = achievements.length;
    
    achievementsList.innerHTML = achievements.map(achievement => `
        <div class="achievement-card">
            <img src="${achievement.image}" alt="${achievement.name}">
            <h3>${achievement.name}</h3>
            <p>${achievement.description}</p>
        </div>
    `).join('');
}

function updateCoalition(coalitionData) {
    const coalitionInfo = document.getElementById('coalition-info');
    if (coalitionData.length > 0) {
        const coalition = coalitionData[0];
        coalitionInfo.innerHTML = `
            <div class="coalition-card" style="border-color: ${coalition.color}">
                <img src="${coalition.image_url}" alt="${coalition.name}">
                <h3>${coalition.name}</h3>
                <p>Score: ${coalition.score}</p>
            </div>
        `;
    }
}

function updateCampusStats(campusData) {
    const campusStats = document.getElementById('campus-stats');
    // Add your campus statistics visualization here
    // You might want to use Chart.js for this
}

// function showError(message) {
//     const container = document.querySelector('.container');
//     container.innerHTML = `
//         <div class="error-card">
//             <i class="fas fa-exclamation-circle"></i>
//             <h2>Error</h2>
//             <p>${message}</p>
//             <button onclick="location.reload()" class="retry-button">
//                 <i class="fas fa-redo"></i> Retry
//             </button>
//         </div>
//     `;
// }