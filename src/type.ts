export interface User {
    fullname: string,
    email: string,
    password: string
}

export interface AuthState {
    user: AuthResponse | null;
    loading: boolean;
    error: string | null;
}

export interface AuthResponse {
    _id: string;
    name: string;
    email: string;
}