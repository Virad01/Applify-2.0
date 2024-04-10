// Table Creation
var tbody = document.getElementById('tbody1');

function AddItemToTable(companyName, date, jobTitle, status){
    let trow = document.createElement('trow');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');

    td1.innerHTML = companyName;
    td2.innerHTML = date;
    td3.innerHTML = jobTitle;
    td4.innerHTML = status;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);

    tbody.appendChild(trow); 
}

function AddAllItemsToTable(TheUser){
   tbody.innerHTML = '';
   TheUser.forEach((element) => {
       AddItemToTable(element.companyName, element.date, element.jobTitle, element.status);
   });
}

//Imports and configuration

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
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
from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const db = getFirestore();

// Fetching all the data from the database
async function GetAllData(){
    const querySnapshot = await getDocs(collection(db, "vinayakrdikshit@gmail.com"));

    var user = [];

    querySnapshot.forEach((doc) => {
        user.push(doc.data());
    });

    AddAllItemsToTable(user);
}

// Fetching the data in realtime

async function RealTimeData(){
    const dbRef = collection(db, "vinayakrdikshit@gmail.com");

    onSnapshot(dbRef, (querySnapshot) => {
        var user = [];

        querySnapshot.forEach((doc) => {
            user.push(doc.data());
        });
        AddAllItemsToTable(user);
    })

}

window.onload = RealTimeData();
