import { auth, createUserWithEmailAndPassword } from '../firebase.config.js';
import { updateProfile } from '../firebase.config.js'; 

const SignUp = async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value;
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: name,
    });

    console.log("User Created:", userCredential.user);
    alert("Sign up successful!");
  } catch (error) {
    console.error("Signup Error:", error.message);
  }
};

document.getElementById('signup-form').addEventListener("submit", SignUp);
