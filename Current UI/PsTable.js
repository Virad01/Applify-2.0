document.addEventListener("DOMContentLoaded", function() {
    const userEmails = ["vinayakrdikshit@gmail.com"];
    // Function to fetch data for a single user and populate the table
    function fetchData(userEmail) {
        fetch('https://rjtdvr2b-3000.inc1.devtunnels.ms/fetchData', {
            // mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify({
                "UserUID": userEmail
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Populate the table with the retrieved data
            const tableBody = document.getElementById('postmanResults');
            const row = tableBody.insertRow();
            
            const companyNameCell = row.insertCell(0);
            companyNameCell.textContent = data.companyName;
            
            const dateCell = row.insertCell(1);
            dateCell.textContent = data.date;
            
            const jobTitleCell = row.insertCell(2);
            jobTitleCell.textContent = data.jobTitle;
            
            const statusCell = row.insertCell(3);
            statusCell.textContent = data.status;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    // Loop through each user and fetch data for them
    userEmails.forEach(userEmail => {
        fetchData(userEmail);
    });
});