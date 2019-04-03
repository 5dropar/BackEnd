// Firebase starting template sem tengjir firestore bakendann við franmendann hjá okkur
var config = {
    apiKey: "AIzaSyByIb4TWrs3WcDKgr_aMgyCFVVaPq26iRc",
    authDomain: "dropar-e12fb.firebaseapp.com",
    databaseURL: "https://dropar-e12fb.firebaseio.com",
    projectId: "dropar-e12fb",
    storageBucket: "dropar-e12fb.appspot.com",
    messagingSenderId: "983460445073"
  };
  firebase.initializeApp(config);
  const db = firebase.firestore(); // Reference við firebase.firestore() þannig við þurfum ekki alltaf að segja firebase.firestore().eitthvadmethod heldur getum sagt db.eitthvadmethod

const button = document.getElementById("button");

button.onclick = ()=> {
    let currentTitle = document.getElementById("title").value;
    let currentUrl = document.getElementById("img-url").value;
    let currentRating = parseInt(document.getElementById("rating").value); 
    let currentDescription = document.getElementById("description").value;
    let currentDate = new Date()
    
    db.collection("images")
    .doc(currentDate.toString())
    .set({
        title: currentTitle,
        imgUrl: currentUrl,
        rating: currentRating,
        description: currentDescription,
        date: currentDate
    })
}

fetch("http://localhost:3000/api")
.then(results => results.json())
.then(json => {
    console.log(json)
})


