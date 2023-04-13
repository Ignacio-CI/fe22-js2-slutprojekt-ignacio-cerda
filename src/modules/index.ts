import { createUser } from "./signup";
import { loginUser } from "./login";
import { User } from "./types";
import { displayCurrentUser, displayUsers, logoutUser } from './logged'
import { createPost, getPosts } from './post'
import { displayUserProfile, displayUserPosts } from "./profile";
import { deleteAccount } from "./deleteAccount";


const signupUsername = document.getElementById("signup-username") as HTMLInputElement;
const signupEmail = document.getElementById("signup-email") as HTMLInputElement;
const signupPassword = document.getElementById("signup-password") as HTMLInputElement;
const avatarChoices = document.querySelectorAll(".avatar") as NodeListOf<HTMLInputElement>;
const signupButton = document.getElementById("signup-btn") as HTMLButtonElement;

const loginEmail = document.getElementById("login-email") as HTMLInputElement;
const loginPassword = document.getElementById("login-password") as HTMLInputElement;
const loginButton = document.getElementById("login-btn") as HTMLButtonElement;

const userPostContent = document.getElementById("new-status-update") as HTMLInputElement;
const postButton = document.getElementById("new-status-update-btn") as HTMLButtonElement;

const logoutButton = document.getElementById("logout-btn") as HTMLButtonElement;
const goToDeleteAccountButton = document.getElementById("delete-account-btn") as HTMLButtonElement;

const deleteAccountForm = document.getElementById('delete-account-page-form') as HTMLFormElement;
const deleteAccountEmail = document.getElementById('delete-account-page-email') as HTMLInputElement;
const deleteAccountPassword = document.getElementById('delete-account-page-password') as HTMLInputElement;

const userAvatarChoice: string[] = [];

avatarChoices.forEach((avatar) => {
  avatar.addEventListener("click", () => {
    userAvatarChoice.shift();
    userAvatarChoice.push(avatar.value);
  });
});

signupButton?.addEventListener("click", async (event) => {
  event.preventDefault();

  const user: User = {
    username: signupUsername.value,
    email: signupEmail.value,
    password: signupPassword.value,
    photoURL: userAvatarChoice[0],
  };

  createUser(user)
    .catch((error) => {
      console.log(error);
    })
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
  window.location.assign('./deleteAccount.html')
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