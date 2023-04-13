interface User {
  username: string;
  email: string;
  password: string;
  photoURL: string;
}

interface Post {
  username: string;
  content: string;
  userID: string;
  likes: number;
  date: string;
}



export { User, Post };