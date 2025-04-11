import { ListGroupsResponse, ListGroupsResquest } from '@/types';
import { SPMetaInfo } from './metaInfos';
export declare const getListGroupMetaInfo: (endpoint: string, params: ListGroupsResquest) => Pick<SPMetaInfo, 'url'>;
export declare const parseListGroupsResponse: (data: string) => Promise<ListGroupsResponse>;
