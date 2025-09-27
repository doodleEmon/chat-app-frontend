export interface User {
    fullname: string;
    email: string;
    profilePic: string;
}

export interface AuthState {
    user: AuthResponse | null;
    loading: boolean;
    error: string | null;
}

export interface AuthResponse {
    _id: string;
    fullname: string;
    email: string;
    profilePic: string;
}