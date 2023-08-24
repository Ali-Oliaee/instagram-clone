export interface AddPost {
    title: string;
    file: string;
    caption: string;
    tags: string[];
    enableComments?: boolean;
}
export interface EditPost {
    title: string;
    caption:string;
    tags: string[];
    id:string;
    enableComments?: boolean;
}
