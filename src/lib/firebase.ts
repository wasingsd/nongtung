// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCScIIzkPsBblB3a9gXif2-LNfcTxQJI80",
    authDomain: "nongtung-platform.firebaseapp.com",
    projectId: "nongtung-platform",
    storageBucket: "nongtung-platform.firebasestorage.app",
    messagingSenderId: "568276841852",
    appId: "1:568276841852:web:462543f3ef2d26cab3a0f9",
    measurementId: "G-B7MJ6ZFQ6S"
};

// Initialize Firebase
// Use getApps() to prevent re-initialization errors during hot-reload in Next.js
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let analytics;

// Initialize Analytics only on the client side
if (typeof window !== 'undefined') {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, analytics, auth, db };
