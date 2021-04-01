import Firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBzMwpXuEkpeVNSj0m0e8o-sCjVYZIB-GM",
    authDomain: "notes-app-59fe7.firebaseapp.com",
    databaseURL: "https://notes-app-59fe7-default-rtdb.firebaseio.com",
    projectId: "notes-app-59fe7",
    storageBucket: "notes-app-59fe7.appspot.com",
    messagingSenderId: "188654929503",
    appId: "1:188654929503:web:e219ea0a772cc1d5db3dea",
    measurementId: "G-04KH8B6FZ4"
  }

  const fire= Firebase.initializeApp(firebaseConfig)

  export default fire