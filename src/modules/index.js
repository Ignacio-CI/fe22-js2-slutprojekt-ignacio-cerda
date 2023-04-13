import { createUser } from "./signup";
import { loginUser } from "./login";
import { displayCurrentUser, displayUsers, logoutUser } from './logged';
import { createPost, getPosts } from './post';
import { displayUserProfile, displayUserPosts } from "./profile";
import { deleteAccount } from "./deleteAccount";
const signupUsername = document.getElementById("signup-username");
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
const avatarChoices = document.querySelectorAll(".avatar");
const signupButton = document.getElementById("signup-btn");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginButton = document.getElementById("login-btn");
const userPostContent = document.getElementById("new-status-update");
const postButton = document.getElementById("new-status-update-btn");
const logoutButton = document.getElementById("logout-btn");
const goToDeleteAccountButton = document.getElementById("delete-account-btn");
const deleteAccountForm = document.getElementById('delete-account-page-form');
const deleteAccountEmail = document.getElementById('delete-account-page-email');
const deleteAccountPassword = document.getElementById('delete-account-page-password');
const userAvatarChoice = [];
avatarChoices.forEach((avatar) => {
    avatar.addEventListener("click", () => {
        userAvatarChoice.shift();
        userAvatarChoice.push(avatar.value);
    });
});
signupButton?.addEventListener("click", async (event) => {
    event.preventDefault();
    const user = {
        username: signupUsername.value,
        email: signupEmail.value,
        password: signupPassword.value,
        photoURL: userAvatarChoice[0],
    };
    createUser(user)
        .catch((error) => {
        console.log(error);
    });
});
loginButton?.addEventListener("click", async (event) => {
    event.preventDefault();
    loginUser(loginEmail.value, loginPassword.value)
        .catch((error) => {
        alert(error);
    });
});
postButton?.addEventListener("click", async (event) => {
    event.preventDefault();
    createPost(userPostContent.value);
    userPostContent.value = '';
});
logoutButton?.addEventListener("click", (event) => {
    event.preventDefault();
    logoutUser();
});
goToDeleteAccountButton?.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.assign('./deleteAccount.html');
});
deleteAccountForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await deleteAccount(deleteAccountEmail.value, deleteAccountPassword.value);
});
if (window.location.pathname.endsWith('/logged.html')) {
    displayCurrentUser();
    displayUsers();
    getPosts();
}
else if (window.location.pathname.endsWith('/profile.html')) {
    displayUserProfile();
    displayUserPosts();
}
//# sourceMappingURL=index.js.map