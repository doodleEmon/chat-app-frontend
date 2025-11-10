export interface SignupDataType {
    fullname: string;
    email: string;
    password: string;
}

export interface AuthState {
    user: AuthResponse | null;
    searchedUsers: AuthResponse[];
    signupLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
    loginLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
    checkAuthLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
    updateProfileLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
    logoutLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
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