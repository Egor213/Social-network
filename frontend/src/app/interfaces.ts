export interface User {
    id: number,
    name: string,
    date: string,
    friends: number[],
    role: string,
    status: string,
    email: string,
    img: string,
    password: string
}

export interface registerUser {
    username: string;
    email: string;
    password: string;
    date: string;
  }

export interface PostUser {
    id: number,
    post: string,
    name: string,
    img: string,
    email: string,
    photo?: string
}


export interface SendPost {
    id: number,
    post: string,
    email: string,
    photo?: string
}