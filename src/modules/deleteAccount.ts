import { reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { ref, remove } from "firebase/database";


const reauthenticateUser = async (email: string, password: string) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const credential = EmailAuthProvider.credential(email, password);
        await reauthenticateWithCredential(currentUser, credential);
        console.log("User reauthenticated successfully");
        return true;
      } else {
        console.log("No user currently signed in");
        return false;
      }
    } catch (error) {
      console.log("Error reauthenticating user:", error);
      return false;
    }
};

const deleteAccount = async (email: string, password: string) => {
    try {
      const isReauthenticated = await reauthenticateUser(email, password);
  
      if (isReauthenticated) {
        const currentUser = auth.currentUser;
  
        if (currentUser) {
          const userRef = ref(db, `/users/${currentUser.uid}`);
  
          await remove(userRef);
          await deleteUser(currentUser);
          localStorage.removeItem("currentUser");
  
          window.location.assign("../index.html");
        }
      } else {
        console.log("Failed to reauthenticate user");
      }
    } catch (error) {
      console.log("Error deleting account and database entry:", error);
    }
};

export { reauthenticateUser, deleteAccount }