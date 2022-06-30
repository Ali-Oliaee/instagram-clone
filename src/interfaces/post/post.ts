export interface Post {
    account :{
        id: number
        bio: string
        count:{
            followers: number
            following: number
            posts: number
        }
        created_at: string
        language: string
        last_login: string
        photo: string
        updated_at: string
        user:{
            username: string
            email: string
        }
    };
    id: number;
    file: string;
    title: string;
    caption: string;
    tags: string[];
    account_likes: number[];
    account_archives: number[];
    created_at: number;
    updated_at: number;
    comment_status: boolean;
}

export interface Posts {
    posts: Post[];
}
