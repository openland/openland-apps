declare module 'rn-fetch-blob' {
    const instance: {
        fetch: (method: string, url: string, options: any, args: any[]) => any
        wrap: (src: any) => any
    };
    export default instance;
}