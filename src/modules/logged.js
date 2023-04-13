import { db, auth } from "./firebaseConfig";
import { ref, onValue } from "firebase/database";
import { signOut } from "firebase/auth";
const allUsers = ref(db, "/users");
const getUsers = () => {
    return new Promise((resolve, reject) => {
        onValue(allUsers, (snapshot) => {
            const data = snapshot.val();
            const usersArray = Object.values(data);
            resolve(usersArray);
        }, (error) => {
            console.log(error);
            reject(error);
        });
    });
};
const displayCurrentUser = () => {
    const currentUserElement = document.getElementById("current-user");
    const currentUserImgContainer = document.getElementById("current-user-img-container");
    const currentUserImg = document.createElement("img");
    currentUserImg.setAttribute("class", "current-user-img");
    currentUserImgContainer.append(currentUserImg);
    const currentUserString = localStorage.getItem("currentUser");
    const currentUserObj = currentUserString
        ? JSON.parse(currentUserString)
        : null;
    if (currentUserObj && currentUserElement && currentUserImg) {
        console.log(currentUserObj);
        currentUserElement.innerText = currentUserObj.username;
        currentUserImg.src = currentUserObj.photoURL;
    }
    else {
        console.log("No currentUser data found in localStorage");
    }
};
async function displayUsers() {
    try {
        const currentUserString = localStorage.getItem("currentUser");
        const currentUserObj = currentUserString ? JSON.parse(currentUserString) : null;
        const usersArray = (await getUsers());
        const usersArrayWithoutCurrentUser = usersArray.filter(user => user.username !== currentUserObj.username);
        usersArrayWithoutCurrentUser.forEach((user) => {
            const otherUsersContainer = document.getElementById("other-users");
            const otherUserButton = document.createElement("div");
            otherUserButton.setAttribute("class", "other-user-btn");
            const usersListItems = document.createElement("p");
            usersListItems.innerText = user.username;
            const otherUsersImg = document.createElement("img");
            otherUsersImg.setAttribute("class", "other-users-img");
            const imageUrl = new URL(user.photoURL, import.meta.url);
            otherUsersImg.src = imageUrl.href;
            otherUserButton.appendChild(otherUsersImg);
            otherUserButton.appendChild(usersListItems);
            otherUserButton.addEventListener("click", () => {
                localStorage.setItem("clickedUser", JSON.stringify(user));
                window.location.assign("./profile.html");
            });
            otherUsersContainer.appendChild(otherUserButton);
        });
    }
    catch (error) {
        console.log(error);
    }
}
const logoutUser = async () => {
    try {
        await signOut(auth);
        localStorage.removeItem("currentUser");
        console.log("User signed out successfully");
        window.location.assign("../index.html");
    }
    catch (error) {
        console.log("Error signing out:", error);
    }
};
export { getUsers, displayCurrentUser, displayUsers, logoutUser };
//# sourceMappingURL=logged.js.map