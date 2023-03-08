import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  getDoc,
  orderBy,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQy6vUzdzPwjlReRWKySz4XNyb3GqNihg",
  authDomain: "fir-test-app-c811e.firebaseapp.com",
  projectId: "fir-test-app-c811e",
  storageBucket: "fir-test-app-c811e.appspot.com",
  messagingSenderId: "138806305803",
  appId: "1:138806305803:web:796744c59fabb11b1e530e",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

const colRef = collection(db, "user_and_notifications");

getDocs(colRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.map((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });

    console.log("BOOKS GETBOOK", books);
  })
  .catch((error) => {
    console.log(error);
  });

const unsubBooksSnapshot = onSnapshot(colRef, (snapshot) => {
  let books = [];
  snapshot.docs.map((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });

  console.log("BOOKS ONSNAPSHOT", books);
});

const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});

const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});

// queries
const customQuery = query(
  colRef,
  //   where("author", "==", "patric rufus"),
  orderBy("createdAt", "asc")
);

const unsubQuery = onSnapshot(customQuery, (snapshot) => {
  let books = [];
  snapshot.docs.map((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });

  console.log("BOOKS ONSNAPSHOT", books);
});

const docRef = doc(db, "books", "2NpgZhPTkxq104AO2q2a");

// getDoc(docRef).then((doc) => {
//   console.log(doc.data(), doc.id);
// });

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

//updating a document

const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", updateForm.id.value);

  updateDoc(docRef, {
    title: "updated title",
    updatedAt: serverTimestamp(),
  });
});

//signing user up

const signupForm = document.querySelector(".signup");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signupForm.email.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((credentials) => {
      console.log("USER CREDENTIALS", credentials.user);
      signupForm.reset();
    })
    .catch((error) => {
      console.log(error.message);
    });
});

// logging out
const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("user logged out");
    })
    .catch((error) => {
      console.log(error);
    });
});

const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((credentials) => {
      console.log("LOGGED IN", credentials);
      loginForm.reset();
    })
    .catch((error) => {
      console.log(error);
    });
});

const unsubAuthChange = onAuthStateChanged(auth, (user) => {
  console.log("USER STATUS CHANGED", user);
});

//unsubscribe
const unsubscribeButton = document.querySelector(".unsub");
unsubscribeButton.addEventListener("click", () => {
  console.log("unsubscribing");
  unsubBooksSnapshot();
  unsubQuery();
  unsubAuthChange();
});
