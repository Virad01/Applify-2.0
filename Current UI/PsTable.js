document.addEventListener("DOMContentLoaded", function() {
    // Fetch data from the API
    fetch('https://rjtdvr2b-3000.inc1.devtunnels.ms/fetchData', {
        method: 'POST',
        body: JSON.stringify({
            "UserUID": "vinayakrdikshit@gmail.com"
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        //Add the data to the table with the retrieved data
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
});