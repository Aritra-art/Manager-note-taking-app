import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBKMujQTowD9NzgaQj8WVmedStCuopXu-U",
  authDomain: "manager-63dbc.firebaseapp.com",
  projectId: "manager-63dbc",
  storageBucket: "manager-63dbc.appspot.com",
  messagingSenderId: "837171873938",
  appId: "1:837171873938:web:96f5e2e5966f9229aa7e4b",
  measurementId: "G-C3RBXKXWHF",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase();
export const storage = getStorage();
