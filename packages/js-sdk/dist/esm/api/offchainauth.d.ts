import { SpResponse } from '..';
import { IGenOffChainAuthKeyPairAndUpload, IReturnOffChainAuthKeyPairAndUpload } from '../types/storage';
export interface IOffChainAuth {
    /**
     * generate off-chain auth key pair and upload the public key to meta service, return the seedString for signing message when user need to get approval from sp.
     */
    genOffChainAuthKeyPairAndUpload(params: IGenOffChainAuthKeyPairAndUpload, provider: any): Promise<SpResponse<IReturnOffChainAuthKeyPairAndUpload>>;
}
export declare class OffChainAuth implements IOffChainAuth {
    genOffChainAuthKeyPairAndUpload({ sps, address, domain, expirationMs, chainId }: IGenOffChainAuthKeyPairAndUpload, provider: any): Promise<{
        code: number;
        body: {
            seedString: string;
            keypairs: {
                privateKey: string;
                publicKey: string;
            };
            expirationTime: number;
            spAddresses: string[];
            failedSpAddresses: any[];
        };
        message: string;
        statusCode?: undefined;
    } | {
        code: number;
        message: any;
        statusCode: any;
        body?: undefined;
    }>;
    private generateKeys;
}
