export interface UserSuggestionProps {
    id: number;
    user:{
        email: string;
        username : string;
    }
    bio: string;
    photo: string;
}
