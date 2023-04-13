import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { User } from './types'
import { isInstanceOfError } from "./otherFunctions";

 export const createUser = async (user: User) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    const { uid } = userCredential.user;
    const userRef = ref(db, `users/${uid}`);

    await set(userRef, {
      username: user.username,
      email: user.email,
      photoURL: user.photoURL,
    });

    const snapshot = await get(userRef);
    const signedInUser = snapshot.val();
    localStorage.setItem('currentUser', JSON.stringify(signedInUser));
    window.location.assign("../html/logged.html");
    
  } catch (error: any) {
    alert(error.message);
  }
};


