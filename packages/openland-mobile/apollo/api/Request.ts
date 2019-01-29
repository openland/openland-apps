export type RequestType = 'init' | 'query' | 'watch' | 'refetch' | 'mutate';

export type Request = {
    id: string;
} & (
        { type: 'init', token?: string } |
        { type: 'query', body: any, variables: any } |
        { type: 'read', body: any, variables: any } |
        { type: 'write', body: any, variables: any, data: any } |
        { type: 'refetch', body: any, variables: any } |
        { type: 'mutate', body: any, variables: any } |
        { type: 'watch', body: any, variables: any } |
        { type: 'subscribe', body: any, variables: any }
    );

export type ResponseType = 'result' | 'error';

export type Response = {
    id: string;
} & (
        { type: 'result', data: any } |
        { type: 'error', data: any }
    )