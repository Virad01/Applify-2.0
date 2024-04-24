// Select the table element from the HTML
const statusCountTable = document.getElementById('status-count-table');

// Function to update the status count table
function updateStatusCountTable() {
  // Get a reference to the Firestore collection
  const collectionRef = collection(db, "123@gmail.com");

  // Query the collection for all documents
  getDocs(collectionRef)
    .then((querySnapshot) => {
      // Initialize a variable to hold the status counts
      let statusCounts = {
        Open: 0,
        Closed: 0,
        Pending: 0,
        "Resume Selected": 0,
        "Online Assessment Cleared": 0,
        "HR Round Cleared": 0,
        "Technical Round Cleared": 0,
      };

      // Loop through the query snapshot and update the status counts
      querySnapshot.forEach((doc) => {
        const status = doc.data().status;
        statusCounts[status]++;
      });

      // Clear the existing table rows
      statusCountTable.innerHTML = "";

      // Add a header row to the table
      const headerRow = statusCountTable.insertRow();
      const entriesHeader = headerRow.insertCell();
      const countsHeader = headerRow.insertCell();
      entriesHeader.textContent = "Entries";
      countsHeader.textContent = "Counts";

      // Loop through the status counts and add a row to the table for each one
      for (const [status, count] of Object.entries(statusCounts)) {
        const row = statusCountTable.insertRow();
        const entriesCell = row.insertCell();
        const countsCell = row.insertCell();
        entriesCell.textContent = status;
        countsCell.textContent = count;
      }
    })
    .catch((error) => {
      console.error("Error getting documents: ", error);
    });
}

// Call the updateStatusCountTable function when the window loads
window.onload = updateStatusCountTable();