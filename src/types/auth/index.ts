export interface SignupDataType {
    fullname: string;
    email: string;
    password: string;
}

export interface AuthState {
    user: AuthResponse | null;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    searchedUsers: AuthResponse[] | [];
    searchLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    searchedError: string | null;
}

export interface AuthResponse {
    _id: string;
    fullname: string;
    email: string;
    profilePic: string;
    createdAt: Date;
}

export interface LoginDataType {
    email: string,
    password: string
}