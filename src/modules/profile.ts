import { db } from "./firebaseConfig";
import { ref, onValue, update, get } from "firebase/database";
import { Post } from "./types";
import { colorPalette } from "./otherFunctions";


const displayUserProfile = () => {
    const userInfoContainer = document.getElementById('other-user-profile-info');

    const visitedUserString = localStorage.getItem('clickedUser');
    const visitedUserObject = visitedUserString ? JSON.parse(visitedUserString) : null;

    const userPhoto = document.createElement('img');
    userPhoto.setAttribute('id', 'visited-user-img');
    const photoURL = new URL(visitedUserObject.photoURL, import.meta.url);
    userPhoto.src = photoURL.href;

    const userName = document.createElement('h2');
    userName.setAttribute('id', 'visited-user-name');
    userName.innerText = visitedUserObject.username;

    const userContact = document.createElement('p');
    userContact.setAttribute('id', 'visited-user-contact');
    userContact.innerText = visitedUserObject.email;

    userInfoContainer?.append(userPhoto);
    userInfoContainer?.append(userName);
    userInfoContainer?.append(userContact);
};

const displayUserPosts = () => {
    const visitedUserString = localStorage.getItem('clickedUser');
    const visitedUserObject = visitedUserString ? JSON.parse(visitedUserString) : null;
    const { username } = visitedUserObject;

    const visitedUserPostContainer = document.getElementById('other-user-profile-posts');

    const postsRef = ref(db, 'posts');

    onValue(postsRef, snapshot => {
        const data = snapshot.val();
        const posts: [string, Post][] = Object.entries(data)

        const visitedUserPosts = posts.filter(post => post[1].username === username);
        
        if (visitedUserPostContainer) {
            visitedUserPostContainer.innerHTML = '';
        }

        visitedUserPosts.forEach( post => {
            const postId = post[0];
            const postObj = post[1];
            
            const postContainer = document.createElement('div');
            postContainer.setAttribute('id', 'visited-post-container')
            postContainer.style.backgroundColor = colorPalette()

            const postContent = document.createElement('h3');
            postContent.innerText = postObj.content;

            const postDate = document.createElement('p');
            postDate.innerText = postObj.date;

            const postLikes = document.createElement('button');
            postLikes.setAttribute('id', 'visited-post-like-btn');
            postLikes.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> ${postObj.likes}`;

            postLikes.addEventListener('click', () => {
                likePost(postId);
            })

            postContainer.append(postContent);
            postContainer.append(postDate);
            postContainer.append(postLikes);

            visitedUserPostContainer?.append(postContainer)
        })
    })
};

const likePost = async (postId: string): Promise<void> => {
    const postRef = ref(db, `posts/${postId}`);

    try {
        const snapshot = await get(postRef);
        const post = snapshot.val();
        const updatedLikes = post.likes + 1;
    
        update(postRef, { likes: updatedLikes });
    }
    catch (error) {
        console.log("Error al obtener o actualizar los 'me gusta' del post:", error)
    }
}

export { displayUserProfile, displayUserPosts };