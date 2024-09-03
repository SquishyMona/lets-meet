import { initializeApp } from "firebase/app";

const config = {
  apiKey: "AIzaSyBGefhKciSjLoHBuHPuv1bybxS7zpsKYsw",
  authDomain: "lets-meet-web--lets-meet-fbproject.us-central1.hosted.app",
  projectId: "lets-meet-fbproject",
  storageBucket: "lets-meet-fbproject.appspot.com",
  messagingSenderId: "995943991927",
  appId: "1:995943991927:web:11ce36d44bf71fb173d472"
};

export const firebaseApp = initializeApp(config);