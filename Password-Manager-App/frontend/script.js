const API_URL = 'http://localhost:3000';
async function fetchPasswords() {
    try {
        const response = await fetch(`${API_URL}/passwords`);
        const passwords = await response.json();

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '<h3>Show All Passwords</h3>';
        passwords.forEach((entry) => {
            const entryDiv = document.createElement('div');
            entryDiv.innerHTML = `
                <p><strong>Website:</strong> ${entry.website}</p>
                <p><strong>Username:</strong> ${entry.username}</p>
                <p><strong>Password:</strong> ${entry.password}</p>
                <p><strong>Notes:</strong> ${entry.notes}</p>
                <hr>
            `;
            resultDiv.appendChild(entryDiv);
        });
    } catch (error) {
        console.error('Error fetching passwords:', error);
    }
}



async function fetchUsernames() {
    const websiteInput = document.getElementById('websiteInput').value;
    try {
        const response = await fetch(`${API_URL}/usernames?website=${encodeURIComponent(websiteInput)}`);
        const usernameData = await response.json();

        const resultDiv = document.getElementById('result');
        if (usernameData.error) {
            resultDiv.innerHTML = `<p>${usernameData.error}</p>`;
        } else {
            resultDiv.innerHTML = '<h3>Username</h3>';
            const entryDiv = document.createElement('div');
            entryDiv.innerHTML = `
                <p><strong>Website:</strong> ${websiteInput}</p>
                <p><strong>Username:</strong> ${usernameData.username}</p>
            `;
            resultDiv.appendChild(entryDiv);
        }
    } catch (error) {
        console.error('Error fetching username:', error);
    }
}


        async function showList() {
            const websiteInput = document.getElementById('websiteInput').value;
            try {
                const response = await fetch(`${API_URL}/password/search?website=${encodeURIComponent(websiteInput)}`);
                const password = await response.json();
        
                const resultDiv = document.getElementById('result');
                if (password.error) {
                    resultDiv.innerHTML = `<p>${password.error}</p>`;
                } else {
                    resultDiv.innerHTML = '<h3>Search by Website</h3>';
                    const entryDiv = document.createElement('div');
                    entryDiv.innerHTML = `
                        <p><strong>Website:</strong> ${password.website}</p>
                        <p><strong>Username:</strong> ${password.username}</p>
                        <p><strong>Password:</strong> ${password.password}</p>
                        <p><strong>Notes:</strong> ${password.notes}</p>
                    `;
                    resultDiv.appendChild(entryDiv); // Append the entryDiv to the resultDiv
                }
            } catch (error) {
                console.error('Error fetching website:', error);
            }
        }
