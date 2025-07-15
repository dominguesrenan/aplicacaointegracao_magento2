import axios from 'axios';
import { LoginResponse } from '@/types';

const API_URL = '/rest/all/V1';

export const magentoService = {
    async login(username: string, password: string): Promise<LoginResponse> {
        try {
            const response = await axios.post(`${API_URL}/integration/admin/token`, {
                username,
                password,
            });
            return { success: true, token: response.data };
        } catch (error) {
            const axiosError = error as { response?: { data?: { message?: string } } };
            return {
                success: false,
                error: axiosError.response?.data?.message || 'Erro ao fazer login',
            };
        }
    },
};

export interface Order {
    entity_id: string;
    increment_id: string;
    created_at: string;
    status: string;
    grand_total: number;
    customer_email: string;
    customer_firstname: string;
    customer_lastname: string;
}

export interface OrdersResponse {
    items: Order[];
    total_count: number;
    search_criteria: {
        page_size: number;
        current_page: number;
    };
}

export interface OrderSearchParams {
    page?: number;
    pageSize?: number;
    sortField?: string;
    sortDirection?: 'ASC' | 'DESC';
    status?: string;
}

export const getOrders = async (params: OrderSearchParams = {}) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authentication token found');
    }

    const searchParams = new URLSearchParams();

    // Configuração básica de paginação
    searchParams.append('searchCriteria[pageSize]', String(params.pageSize || 200));
    searchParams.append('searchCriteria[currentPage]', String(params.page || 1));

    // Configuração de ordenação
    if (params.sortField) {
        searchParams.append('searchCriteria[sortOrders][0][field]', params.sortField);
        searchParams.append(
            'searchCriteria[sortOrders][0][direction]',
            params.sortDirection || 'DESC'
        );
    }

    // Filtro por status
    if (params.status && params.status !== 'all') {
        searchParams.append('searchCriteria[filterGroups][0][filters][0][field]', 'status');
        searchParams.append('searchCriteria[filterGroups][0][filters][0][conditionType]', 'eq');
        searchParams.append('searchCriteria[filterGroups][0][filters][0][value]', params.status);
    }

    const url = `/rest/V1/orders?${searchParams.toString()}`;
    console.log('Fetching orders from:', url);

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText,
            });
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('Invalid response type:', contentType, 'Response:', text);
            throw new Error('Invalid response type from API');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export interface Customer {
    id: number;
    group_id: number;
    default_billing: string;
    default_shipping: string;
    created_at: string;
    updated_at: string;
    email: string;
    firstname: string;
    lastname: string;
    store_id: number;
    website_id: number;
    addresses: CustomerAddress[];
}

export interface CustomerAddress {
    id: number;
    customer_id: number;
    region: {
        region_code: string;
        region: string;
        region_id: number;
    };
    region_id: number;
    country_id: string;
    street: string[];
    telephone: string;
    postcode: string;
    city: string;
    firstname: string;
    lastname: string;
}

export interface CustomersResponse {
    items: Customer[];
    total_count: number;
    search_criteria: {
        page_size: number;
        current_page: number;
    };
}

export interface CustomerSearchParams {
    page?: number;
    pageSize?: number;
    sortField?: string;
    sortDirection?: 'ASC' | 'DESC';
    email?: string;
    name?: string;
}

export const getCustomers = async (params: CustomerSearchParams = {}) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authentication token found');
    }

    const searchParams = new URLSearchParams();

    // Configuração básica de paginação
    searchParams.append('searchCriteria[pageSize]', String(params.pageSize || 200));
    searchParams.append('searchCriteria[currentPage]', String(params.page || 1));

    // Configuração de ordenação
    if (params.sortField) {
        searchParams.append('searchCriteria[sortOrders][0][field]', params.sortField);
        searchParams.append(
            'searchCriteria[sortOrders][0][direction]',
            params.sortDirection || 'DESC'
        );
    }

    // Filtro por email
    if (params.email) {
        searchParams.append('searchCriteria[filterGroups][0][filters][0][field]', 'email');
        searchParams.append('searchCriteria[filterGroups][0][filters][0][conditionType]', 'like');
        searchParams.append(
            'searchCriteria[filterGroups][0][filters][0][value]',
            `%${params.email}%`
        );
    }

    // Filtro por nome
    if (params.name) {
        searchParams.append('searchCriteria[filterGroups][1][filters][0][field]', 'firstname');
        searchParams.append('searchCriteria[filterGroups][1][filters][0][conditionType]', 'like');
        searchParams.append(
            'searchCriteria[filterGroups][1][filters][0][value]',
            `%${params.name}%`
        );
    }

    const url = `/rest/V1/customers/search?${searchParams.toString()}`;
    console.log('Fetching customers from:', url);

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText,
            });
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('Invalid response type:', contentType, 'Response:', text);
            throw new Error('Invalid response type from API');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
};
