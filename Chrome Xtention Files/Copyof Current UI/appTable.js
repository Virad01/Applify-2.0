// Table Creation
var email
chrome.identity.getProfileUserInfo({'accountStatus': 'ANY'},function(info) {
    email=info.email
    console.log(email);
    if (email) {
      RealTimeData();
    } else {
      console.error('Email is empty or undefined.');
    }
});

var tbody = document.getElementById('tbody1');

function AddItemToTable(companyName, date, jobTitle, status, uid) {
  let trow = document.createElement('tr');
  let td1 = document.createElement('td');
  let td2 = document.createElement('td');
  let td3 = document.createElement('td');
  let td4 = document.createElement('td');
  let td5 = document.createElement('td'); //For Dropdown

  td1.innerHTML = companyName;
  td2.innerHTML = date;
  td3.innerHTML = jobTitle;
  td4.innerHTML = status;

  // Create Dropdown
  let dropdown = document.createElement('select');
  dropdown.innerHTML = `
      <option value="Open" ${status === 'Open'? 'selected' : ''}>Open</option>
      <option value="Closed" ${status === 'Closed'? 'selected' : ''}>Closed</option>
      <option value="Pending" ${status === 'Pending'? 'selected' : ''}>Pending</option>
      <option value="Resume Selected" ${status === 'Resume Selected'? 'selected' : ''}>Resume Selected</option>
      <option value="Online Assessment Cleared" ${status === 'Online Assessment Cleared'? 'selected' : ''}>Online Assessment Cleared</option>
      <option value="HR Round Cleared" ${status === 'HR Round Cleared'? 'selected' : ''}>HR Round Cleared</option>
      <option value="Technical Round Cleared" ${status === 'Technical Round Cleared'? 'selected' : ''}>Technical Round Cleared</option>
  `;

  dropdown.addEventListener('change', function() {
      const newStatus = this.value;
      updateStatus(uid, newStatus, td4); // Pass uid and td4 to updateStatus function
  });

  td5.appendChild(dropdown);
  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);
  trow.appendChild(td5);

  return trow; 
}

function AddAllItemsToTable(TheUser){
  tbody.innerHTML = '';
  TheUser.forEach((element) => {
      let row = AddItemToTable(element.companyName, element.date, element.jobTitle, element.status, element.uid);
      tbody.appendChild(row);
  });
}

//Imports and configuration

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_OG0ZWhO9r8Cv9Csm5QH700kCjGe5MWQ",
  authDomain: "applify-9f7a9.firebaseapp.com",
  projectId: "applify-9f7a9",
  storageBucket: "applify-9f7a9.appspot.com",
  messagingSenderId: "810543153664",
  appId: "1:810543153664:web:383acfa1494286ffa28ee5",
  measurementId: "G-62GSL4N3VZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import{
    getFirestore, doc, setDoc, collection, getDocs, onSnapshot
}
from 'firebase/firestore';

const db = getFirestore();

// var email
// chrome.identity.getProfileUserInfo({'accountStatus': 'ANY'}, function(info) {
//   email = info.email;
//   console.log(typeof(email));
// });
// Fetching all the data from the database
async function GetAllData(){
    const querySnapshot = await getDocs(collection(db, email));
    // const querySnapshot = await getDocs(collection(db, email))
    var user = [];

    querySnapshot.forEach((doc) => {
      user.push({ ...doc.data(), uid: doc.id }); // Include uid as id
    });

    AddAllItemsToTable(user);
}

// Fetching the data in realtime

async function RealTimeData(){
    try {
        const dbRef = collection(db, email);
        onSnapshot(dbRef, (querySnapshot) => {
          var user = [];
          querySnapshot.forEach((doc) => {
            user.push({ ...doc.data(), uid: doc.id }); // Include uid as id
          });
          AddAllItemsToTable(user);
        });
      } catch (error) {
        console.error('Error in RealTimeData:', error);
      }
}

async function updateStatus(uid, newStatus, statusCell, email) {
  try {
      const jobRef = doc(db, `${email}/${uid}`);
      await setDoc(jobRef, { status: newStatus }, { merge: true });
      statusCell.innerHTML = newStatus; // Update status in the same cell
      console.log('Status updated successfully');
  } catch (error) {
      console.error('Error updating status:', error);
  }
}

// window.onload = RealTimeData();
