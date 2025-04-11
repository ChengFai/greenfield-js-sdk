declare const verifyBucketName: (bucketName?: string) => void;
declare const verifyObjectName: (objectName?: string) => void;
declare const verifyAddress: (address?: string) => void;
declare const verifyUrl: (url?: string) => false | undefined;
declare const trimString: (originString: string, deleteString: string) => string;
declare const generateUrlByBucketName: (endpoint: string | undefined, bucketName: string) => string;
declare const checkObjectName: (objectName: string) => void;
export { verifyBucketName, verifyObjectName, checkObjectName, verifyAddress, trimString, verifyUrl, generateUrlByBucketName, };
