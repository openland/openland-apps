import { ApiError, InvalidField } from 'openland-api/ApiError';
import { GraphqlEngine, GraphqlError, RetryEngine } from '@openland/spacex';

export function createEngineRetry(engine: GraphqlEngine): GraphqlEngine {
    return new RetryEngine({
        engine: engine,
        minRetry: 1000,
        errorHandler: (src) => {

            console.warn('Handler: Received error', src);

            if (src instanceof GraphqlError) {

                // If retry required
                for (let e of src.errors) {
                    if (e.shouldRetry) {
                        let delay: number;
                        if (typeof e.retryDelay === 'number') {
                            delay = e.retryDelay;
                        } else {
                            delay = Math.floor(1000 + Math.random() * 8000);
                        }

                        console.warn('Unexpected error: asked to try again. Retrying in ' + delay + ' ms');
                        return { type: 'retry', delay };
                    }
                }

                if (src.errors.length > 0) {
                    let message = src.errors[0].message;
                    let invalidFields: InvalidField[] = [];
                    for (let e of src.errors) {
                        if ((e as any).invalidFields) {
                            for (let i of (e as any).invalidFields) {
                                let ex = invalidFields.find((v) => v.key === i.key);
                                if (ex) {
                                    ex.messages.push(i.message);
                                } else {
                                    invalidFields.push({ key: i.key, messages: [i.message] });
                                }
                            }
                        }
                    }
                    console.warn('API Error: ' + message, src.errors);
                    return { type: 'error', error: new ApiError(message, invalidFields) };
                }
            }

            console.warn('Unexpected error: try again.');
            return { type: 'unknown' };
        }
    });
}