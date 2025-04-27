import { auth, signInWithEmailAndPassword } from './firebase.config.js';

const Login = async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User Logged In:", userCredential.user);
    alert("Login successful!");
    window.location.replace("index.html"); 
  } catch (error) {
    console.error("Login Error:", error.message);
    alert("Error: " + error.message);
  }
};

document.getElementById('login-form').addEventListener("submit", Login);
