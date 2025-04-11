import { ResourceType } from '@bnb-chain/greenfield-cosmos-types/greenfield/resource/types';
export interface IGRN {
    resType: ResourceType;
    groupOwner: string;
    /**
     * can be bucketName, bucketName/objectName, groupName
     */
    name: string;
}
export declare const newBucketGRN: (bucketName: string) => IGRN;
export declare const newObjectGRN: (bucketName: string, objectName: string) => IGRN;
export declare const newGroupGRN: (owner: string, groupName: string) => IGRN;
export declare const GRNToString: (grn: IGRN) => string;
