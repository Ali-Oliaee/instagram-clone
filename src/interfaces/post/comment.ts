export interface CommentInterface {
    id: number;
    post: number;
    content: string;
    author: {
        photo: string;
        id: number;
        user:{
            username: string;
        }
    };
}

export interface Comments {
    comments: Comment[];
}
