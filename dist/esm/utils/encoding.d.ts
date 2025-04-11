import { encodePath } from '../clients/spclient/auth';
declare const encodeToHex: (str?: string) => string;
declare const decodeFromHex: (hex?: string) => string;
declare const encodeObjectToHexString: (jsonObject: object) => string;
declare const encodeToHexString: (str?: string) => string;
declare const decodeObjectFromHexString: (hex?: string) => any;
export { encodeToHex, decodeFromHex, encodeObjectToHexString, decodeObjectFromHexString, encodeToHexString, encodePath, };
