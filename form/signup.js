import { auth, createUserWithEmailAndPassword } from '../firebase.config.js';
import { updateProfile } from '../firebase.config.js'; // ✅ updateProfile bhi import karo

const SignUp = async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value;
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // ✅ User ka name set karne ke liye
    await updateProfile(userCredential.user, {
      displayName: name,
    });

    console.log("User Created:", userCredential.user);
    alert("Sign up successful!");
    window.location.replace("./index.html");
  } catch (error) {
    console.error("Signup Error:", error.message);
    alert("Error: " + error.message);
  }
};

document.getElementById('signup-form').addEventListener("submit", SignUp);
