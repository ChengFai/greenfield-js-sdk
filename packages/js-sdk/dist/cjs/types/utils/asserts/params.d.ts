import { NodeFile, UploadFile } from '@/types/sp/Common';
import { AuthType } from '../..';
export declare const assertStringRequire: (s: string, errMsg: string) => void;
export declare const assertPrivateKey: (privateKey: string) => void;
export declare const assertAuthType: (authType: AuthType) => void;
export declare function assertFileType(file: UploadFile): file is NodeFile;
export declare function assertHttpMethod(method?: string): asserts method is 'GET' | 'POST' | 'PUT';
