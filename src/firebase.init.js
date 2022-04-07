// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0OHVGCWKHTCT59GDRhiFK2bxKS3Vn39E",
    authDomain: "email-password-auth-practice.firebaseapp.com",
    projectId: "email-password-auth-practice",
    storageBucket: "email-password-auth-practice.appspot.com",
    messagingSenderId: "634277544722",
    appId: "1:634277544722:web:b7484dce4ad56d2f5429cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;