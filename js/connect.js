 // Initialize Firebase
 const config = {
    apiKey: "AIzaSyDZHo0YgNC_X4dQUuu9n4HDS47hsmKc14A",
    authDomain: "my-project-100-2410c.firebaseapp.com",
    databaseURL: "https://my-project-100-2410c.firebaseio.com",
    projectId: "my-project-100-2410c",
    storageBucket: "my-project-100-2410c.appspot.com",
    messagingSenderId: "976338762330"
  };
 
firebase.initializeApp(config);

const db = firebase.firestore();

//const settings = {/* your settings... */ timestampsInSnapshots: true};
 // db.settings(settings);


  const settings = {/* your settings... */ timestampsInSnapshots: true};
  db.settings(settings);