import type { RequestNonceRequest } from '@/types';
export declare const getNonce: ({ spEndpoint, spName, spAddress, address, domain, }: RequestNonceRequest) => Promise<{
    code: number;
    nonce: null;
    endpoint?: undefined;
    address?: undefined;
    name?: undefined;
} | {
    endpoint: string;
    address: string;
    name: string | undefined;
    nonce: number;
    code?: undefined;
}>;
