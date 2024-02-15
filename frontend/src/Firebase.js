import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCG8Jh895gULpR237RzBXKNyp6F2IkzGAs",
    authDomain: "stepfinal-626dd.firebaseapp.com",
    projectId: "stepfinal-626dd",
    storageBucket: "stepfinal-626dd.appspot.com",
    messagingSenderId: "488044529372",
    appId: "1:488044529372:web:bdc71bb6be7ef9f2a31619"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };


