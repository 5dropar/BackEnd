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
let userId; // Global variable til þess að geta náð í userid utan auth, breyta seinna
button.onclick = e => {
  e.preventDefault();
  let currentTitle = document.getElementById("title").value;
  let currentUrl = document.getElementById("img-url").value;
  let currentRating = parseInt(document.getElementById("rating").value);
  let currentDescription = document.getElementById("description").value;
  let currentDate = new Date();

  getInfo(currentUrl).then(description => {
    db.collection("images")
      .doc(currentDate.toString())
      .set({
        title: currentTitle,
        imgUrl: currentUrl,
        rating: currentRating,
        description: currentDescription,
        date: currentDate,
        imgInfo: description.tags,
        microDescription: description.captions[0],
        userId: userId, // Get the user id of whoever is upploading the image for later reference
        imageId: randomId() // Allar myndir eru með unique id þannig að auðveldara er að ná í eina mynd til þess að vinna með seinna
      })
      .then(() => {
        alert("You have successfully added an image!");
        document.querySelector(".form").reset();
      });
  });
};

// Function sem ég fann á netinu sem gefur random unique id
randomId = () => {
  var S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

getInfo = url => {
  return fetch("http://localhost:3000/api?img=" + url)
    .then(results => results.json())
    .then(json => {
      if (json.description) {
        return json.description;
      } else {
        alert("Error: " + json.message);
      }
    });
};

// Auth stuff

const auth = firebase.auth(); // Reference í firebase.auth() þannig við getum notað methods úr því með að skrifa bara auth.method()

const signUpButton = document.getElementById("signup-button");
signUpButton.onclick = () => {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  // firebase function sem að býr til nýjann user
  auth.createUserWithEmailAndPassword(email, password).then(credentials => {
    console.log("Thanks for signing up");
  });
};

const logInButton = document.getElementById("login-button");
logInButton.onclick = () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  //fire base function sem að loggar inn notenda ef að hann slær inn rétt password og email. Kemur annars villa í console
  auth.signInWithEmailAndPassword(email, password).then(credentials => {
    console.log("Log in succesful");
  });
};

const logOutButton = document.getElementById("logout-button");
logOutButton.onclick = () => {
  auth.signOut(); // firebase function til að logga út notenda
};

//Birtum mismunandi content eftir hvort að notandinn er loggaður inn eða ekki

const logInLinks = document.querySelectorAll(".logged-out"); // Ná í alla links sem á að sýna þegar notandinn er loggaðurr inn
const logOutLinks = document.querySelectorAll(".logged-in"); // Ná í alla links sem á að sýna þegar notandinn er ekki loggaðurr inn

const btnHolder = document.querySelector("#account-btns"); // ná í account buttons til að fela þá þegar user er logged in

// Þetta function runner alltaf þegar að það er auth change t.d þegar user loggar sig inn eða út eða þegar siða er fyrst oppnuð
auth.onAuthStateChanged(user => {
  const form = document.querySelector(".form");

  if (user) {
    userId = user.uid;
    btnHolder.style.display = "none";
    form.style.display = "block";
    logInLinks.forEach(logInLink => {
      logInLink.style.display = "none";
    });
    logOutLinks.forEach(logOutLink => {
      logOutLink.style.display = "block";
    });
  } else {
    btnHolder.style.display = "block";
    form.style.display = "none";
    logOutLinks.forEach(logOutLink => {
      logOutLink.style.display = "none";
    });
    logInLinks.forEach(logInLink => {
      logInLink.style.display = "block";
    });
  }
});
