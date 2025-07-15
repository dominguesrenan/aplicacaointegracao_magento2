export interface CustomerInfo {
    email: string;
    [key: string]: any;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface StoreState {
    token: string | null;
    username: string | null;
    customerInfo: CustomerInfo | null;
    loading: boolean;
    error: string | null;
}

export interface MagentoResponse {
    success: boolean;
    data?: any;
    error?: string;
}

export interface LoginResponse {
    success: boolean;
    token?: string;
    error?: string;
}

export interface UserChoice {
    outcome: 'accepted' | 'dismissed';
}
