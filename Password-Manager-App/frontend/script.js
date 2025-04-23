const API_URL = 'https://hackathon-project-2885.onrender.com';


async function fetchPasswords() {
    try {
        const response = await fetch(`${API_URL}/passwords`);
        const passwords = await response.json();

        const resultDiv = document.getElementById('result');
    
        passwords.forEach((entry) => {
            const entryDiv = document.createElement('div');
            entryDiv.innerHTML = `
                <p><strong>Website:</strong> ${entry.website}</p>
                <p><strong>Password:</strong> ${entry.password}</p>
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


async function fetchbyWebsite() {
    const websiteInput = document.getElementById('website-url').value.trim();
    const resultDiv = document.getElementById('result'); // "Show All" results
    const createNewSection = document.getElementById('create-new-section'); // "Create New" section
    const searchResultDiv = document.getElementById('search-result'); // Search results

    // If the input is empty, clear the search results and reset the view
    if (!websiteInput) {
        searchResultDiv.style.display = 'none';
        searchResultDiv.innerHTML = '';
        resultDiv.style.display = 'none';
        resultDiv.innerHTML = '';
        createNewSection.style.display = 'none';
        return;
    }

    try {
        const res = await fetch(`${API_URL}/password/search?website=${encodeURIComponent(websiteInput)}`);
        const data = await res.json();

        // Hide other sections
        resultDiv.style.display = 'none';
        resultDiv.innerHTML = '';
        createNewSection.style.display = 'none';

        if (res.ok) {
            searchResultDiv.innerHTML = `
                <p><strong>Website:</strong> ${data.website}</p>
                <p><strong>Username:</strong> ${data.username}</p>
                <p><strong>Password:</strong> ${data.password}</p>
                <p><strong>Notes:</strong> ${data.notes || 'N/A'}</p>
            `;
        } else {
            searchResultDiv.innerHTML = `<p>${data.error}</p>`;
        }

        searchResultDiv.style.display = 'flex'; 
    } catch (error) {
        console.error('Error fetching entry:', error);
        searchResultDiv.innerHTML = `<p>Error fetching entry. Please try again later.</p>`;
        searchResultDiv.style.display = 'flex'; 
    }
}

        async function fetchAllPasswords() {
            const resultDiv = document.getElementById('result');
            if (resultDiv.style.display === 'block') {
                resultDiv.style.display = 'none'; 
                resultDiv.innerHTML = ''; 
                return;
            }
            try {
                const response = await fetch(`${API_URL}/passwords/all`);
                const passwords = await response.json();
        
                resultDiv.innerHTML = '<h3>All Passwords</h3>';
                passwords.forEach((entry) => {
                    const entryDiv = document.createElement('div');
                    entryDiv.innerHTML = `
                        <p><strong>Website:</strong> ${entry.website}</p>
                        <p><strong>Username:</strong> <span class="hidden-content">${entry.username}</span>
                        <button class="toggle-visibility" onclick="toggleVisibility(this)">👁️</button>
                         </p>
                        <p><strong>Password:</strong> <span class="hidden-content">${entry.password}</span>
                        <button class="toggle-visibility" onclick="toggleVisibility(this)">👁️</button>
                        </p>
                        <p><strong>Notes:</strong> ${entry.notes || 'N/A'}</p>
                        <hr>
                    `;
                    resultDiv.appendChild(entryDiv);
                });
                resultDiv.style.display = 'block';
            } catch (error) {
                console.error('Error fetching all passwords:', error);
            }
        }

        function toggleVisibility(button) {
            const contentSpan = button.previousElementSibling;
            if (contentSpan.classList.contains('hidden-content')) {
                contentSpan.classList.remove('hidden-content');
                button.textContent = '🙈'; 
            } else {
                contentSpan.classList.add('hidden-content');
                button.textContent = '👁️'; 
            }
        }

    function showForm() {
        const createNewSection = document.getElementById('create-new-section');
        const resultDiv = document.getElementById('result');
        const searchResultDiv = document.getElementById('search-result');
        createNewSection.style.display = 'block'; 


        resultDiv.style.display = 'none';
        resultDiv.innerHTML = '';
        searchResultDiv.style.display = 'none';
        searchResultDiv.innerHTML = '';

    }

    async function submitNewEntry(){
        const website = document.getElementById('new-website').value.trim();
        const username = document.getElementById('new-username').value.trim();
        const password = document.getElementById('new-password').value.trim();
        const notes = document.getElementById('new-notes').value.trim();


        const hasLetters = /[a-zA-Z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const passwordInput = document.getElementById('new-password');

        if(!hasLetters || !hasNumbers){
            passwordInput.style.borderColor = 'red';
            alert('Password must contain both letters and numbers.');
            return;
        } else {
            passwordInput.style.borderColor = ''; 
        }


        try{
            const checkRes = await fetch(`${API_URL}/password/search?website=${encodeURIComponent(website)}`);
            if (checkRes.ok) {
                const checkData = await checkRes.json();
                if (checkData) {
                    alert('Entry already exists! Please try again.');
                    return;
                }
            }

            const res = await fetch(`${API_URL}/passwords/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ website, username, password, notes }),
            });

            if (res.ok) {
                const data = await res.json();
                alert('Yay! Another one bits the dust!');
                document.getElementById('create-new-section').style.display = 'none'; 
                document.getElementById('new-website').value = '';
                document.getElementById('new-username').value = '';
                document.getElementById('new-password').value = '';
                document.getElementById('new-notes').value = '';


                fetchAllPasswords();
            } else {
                const errorData = await res.json();
                alert(`Error: ${errorData.error}`);
            }
        }
        catch (error) {
            console.error('Error creating new entry:', error);
            alert('An error occurred while creating the new entry.');
        }
    }