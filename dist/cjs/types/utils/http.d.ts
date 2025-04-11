export declare function delayMs(duration: number): Promise<unknown>;
declare const fetchWithTimeout: (fetchUrl?: string, fetchOptions?: any, duration?: number) => Promise<Response>;
export { fetchWithTimeout };
