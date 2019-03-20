import { OperationParameters } from 'openland-graphql/GraphqlClient';

export type WorkerRequestType = 'init' | 'query' | 'watch' | 'refetch' | 'mutate';

export type WorkerRequest = {
    id: string;
} & (
        { type: 'query', body: any, variables: any, params?: OperationParameters } |
        { type: 'read', body: any, variables: any } |
        { type: 'write', body: any, variables: any, data: any } |
        { type: 'mutate', body: any, variables: any } |
        
        { type: 'watch', body: any, variables: any, params?: OperationParameters } |
        { type: 'watch-destroy' } |
        
        { type: 'subscribe', body: any, variables: any } |
        { type: 'subscribe-update', variables: any } |
        { type: 'subscribe-destroy' }
    );

export type WorkerResponseType = 'result' | 'error';

export type WorkerResponse = {
    id: string;
} & (
        { type: 'result', data: any } |
        { type: 'error', data: any }
    )