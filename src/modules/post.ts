import { auth, db } from "./firebaseConfig";
import { ref, onValue, push } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { Post } from "./types";
import { colorPalette } from "./otherFunctions";

const createPost = async (postContent: string): Promise<void> => {
    const currentUserString = localStorage.getItem('currentUser');
    const currentUserObj = currentUserString ? JSON.parse(currentUserString) : null;

    onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        const getCurrentDateTime = new Date();
        const setCurrentDateTime = formatDateTime(getCurrentDateTime)

        const post: Post = {
            username: currentUserObj.username,
            content: postContent,
            userID: uid,
            likes: 0,
            date: setCurrentDateTime
        };

        const userRef = ref(db, `posts/`);

        push(userRef, post);

    } else {
        console.log("Not signed in");
    }
  });
};

const getPosts = () => {
    const usersPostRef = ref(db, '/posts');

    onValue(usersPostRef, (snapshot) => {
        const data = snapshot.val();
        const postsArray = Object.values(data) as Post[];
        
        const postContainer = document.getElementById('my-status-updates') as HTMLUListElement;
        postContainer.innerHTML = '';

        postsArray.forEach(post => {
            const displayPost = document.createElement('li');
            displayPost.style.backgroundColor = colorPalette();
            displayPost.innerText = `${post.username}: ${post.content}, likes: ${post.likes}, date: ${post.date}`
            postContainer?.append(displayPost);
        });        
    })

};

function formatDateTime(dateTime: Date) {

    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = String(dateTime.getSeconds()).padStart(2, '0');
  
    const formatedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    return formatedDateTime;
}

export { createPost, getPosts };
