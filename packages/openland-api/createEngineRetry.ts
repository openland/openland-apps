import { ApiError, InvalidField } from 'openland-api/ApiError';
import { GraphqlEngine, GraphqlError, RetryEngine } from '@openland/spacex';

export function createEngineRetry(engine: GraphqlEngine): GraphqlEngine {
    return new RetryEngine({
        engine: engine,
        errorHandler: (src) => {

            if (src instanceof GraphqlError) {

                // If retry required
                for (let e of src.errors) {
                    if (e.shouldRetry) {
                        console.warn('Unexpected error: asked to try again.');
                        return null;
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
                    console.warn('API Error: ' + message);
                    return new ApiError(message, invalidFields);
                }
            }

            console.warn('Unexpected error: try again.');
            return null;
        }
    });
}