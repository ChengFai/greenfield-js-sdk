import { IUpdateOneSpPubKeyParams } from '@/types';
export declare const updateUserAccountKey: ({ address, domain, sp, pubKey, expireDate, authorization, }: IUpdateOneSpPubKeyParams) => Promise<{
    code: number;
    data: {
        address: string;
    };
    message: string;
} | {
    code: number;
    data: {
        address: string;
        endpoint: string;
        name?: string | undefined;
        nonce?: number | undefined;
    };
    message?: undefined;
}>;
