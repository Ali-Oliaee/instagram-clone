export interface Post {
    id: number;
    file: string;
    title: string;
    caption: string;
    // todo: fix this
    account: any;
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
