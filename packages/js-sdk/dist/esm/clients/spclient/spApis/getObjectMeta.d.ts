import { GetObjectMetaRequest, GetObjectMetaResponse } from '@/types/sp/GetObjectMeta';
import type { SPMetaInfo } from './metaInfos';
export declare const getObjectMetaInfo: (endpoint: string, params: GetObjectMetaRequest) => Pick<SPMetaInfo, 'url'>;
export declare const parseGetObjectMetaResponse: (data: string) => Promise<GetObjectMetaResponse>;
