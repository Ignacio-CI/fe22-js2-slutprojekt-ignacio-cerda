import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db } from './firebaseConfig';
import { ref, get } from "firebase/database";
export const loginUser = async (email, password) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const { uid } = userCredentials.user;
        const userRef = ref(db, `users/${uid}`);
        const snapshot = await get(userRef);
        const user = snapshot.val();
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log(user);
        window.location.assign("../html/logged.html");
        return userCredentials;
    }
    catch (error) {
        alert('Invalid email/password. Try again.');
        return null;
    }
};
//# sourceMappingURL=login.js.map