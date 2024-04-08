const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Replace with your own service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

// Define a route to fetch data from a specified collection in Firestore
app.post('/fetchData', async (req, res) => {
  const UserUID = req.body.UserUID;
  if (!UserUID) {
    return res.status(400).send('Enter the UserUID');
  }
  try {
    const querySnapshot = await db.collection(UserUID).get();
    const data = [];
    querySnapshot.forEach(doc => {
      data.push(doc.data());
    });
    console.log(data);
    res.status(200).json(data); 
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


app.post('/updateCompany', async (req, res) => {
    const parentCollectionName = req.body.parentCollectionName;
    const timestamp = req.body.timestamp;
    const newCompanyName = req.body.newCompanyName;
  
    if (!parentCollectionName || !timestamp || !newCompanyName) {
      return res.status(400).send('Parent collection name, timestamp, and new company name are required');
    }
  
    try {
      
      const parentDocRef = db.collection(parentCollectionName).doc(req.body.uid);
      console.log('Parent document path:', parentDocRef.path);
      const subCollectionRef = parentDocRef.collection(timestamp);
      console.log('Subcollection path:', subCollectionRef.path);
  

      const querySnapshot = await subCollectionRef.get();
  
      if (querySnapshot.empty) {
        return res.status(404).send('Subcollection with specified timestamp not found');
      }
  
      querySnapshot.forEach(async doc => {
        await doc.ref.update({ companyName: newCompanyName });
      });
  
      res.status(200).send('Company name updated successfully');
    } catch (error) {
      console.error('Error updating company name:', error);
      res.status(500).send('Error updating company name');
    }
  });
  