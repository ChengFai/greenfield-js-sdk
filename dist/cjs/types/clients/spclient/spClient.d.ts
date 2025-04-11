import { OnProgress } from '@/types';
import { AuthType, ReqMeta } from '@/types/auth';
import { getGetObjectMetaInfo } from './spApis/getObject';
import { getPutObjectMetaInfo } from './spApis/putObject';
import { UploadFile } from '@/types/sp/Common';
export interface ISpClient {
    callApi(url: string, options: RequestInit, duration: number, customError?: {
        message: string;
        code: number;
    }): Promise<Response>;
    signHeaders(reqMeta: Partial<ReqMeta>, authType: AuthType): Promise<Headers>;
    /**
     *
     * ```
     * const { PUT_OBJECT: getPutObjectMetaInfo } = client.spClient.getMetaInfo(endpoint, payload);
     * const {reqMeta, url} = await getPutObjectMetaInfo(endpoint, params);
     *
     * axios.put(...)
     * ```
     *
     */
    getMetaInfo(): {
        PUT_OBJECT: typeof getPutObjectMetaInfo;
        GET_OBJECT: typeof getGetObjectMetaInfo;
    };
}
export declare class SpClient implements ISpClient {
    callApi(url: string, options: RequestInit, timeout?: number, customError?: {
        message: string;
        code: number;
    }): Promise<Response>;
    callApiV2(url: string, options: RequestInit, timeout?: number, customError?: {
        message: string;
        code: number;
    }): Promise<import("superagent/lib/node/response")>;
    /**
     * just use for uploading object:
     * because fetch can't support upload progress
     */
    upload(url: string, options: RequestInit, timeout: number, uploadFile: UploadFile, callback?: {
        onProgress?: OnProgress;
        customError?: {
            message: string;
            code: number;
        };
    }): Promise<import("superagent/lib/node/response")>;
    signHeaders(reqMeta: Partial<ReqMeta>, authType: AuthType): Promise<Headers>;
    getMetaInfo(): {
        PUT_OBJECT: (endpoint: string, params: {
            objectName: string;
            bucketName: string;
            contentType: string;
            body: UploadFile;
            txnHash?: string | undefined;
            delegatedOpts?: {
                visibility: import("@/types").VisibilityType;
                isUpdate?: boolean | undefined;
            } | undefined;
        }) => Promise<{
            url: string;
            optionsWithOutHeaders: Omit<RequestInit, "headers">;
            reqMeta: Partial<ReqMeta>;
            file: UploadFile;
        }>;
        GET_OBJECT: (endpoint: string, params: {
            objectName: string;
            bucketName: string;
        }) => Promise<{
            url: string;
            optionsWithOutHeaders: Omit<RequestInit, "headers">;
            reqMeta: Partial<ReqMeta>;
        }>;
    };
}
