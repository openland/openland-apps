import { GraphQLError } from 'graphql';
import { ApiError, InvalidField, UnknownError } from 'openland-graphql/GraphqlClient';

export function convertError(errors: GraphQLError[]) {
    if (Array.isArray(errors) && errors.length > 0) {
        let message = errors[0].message;
        let invalidFields: InvalidField[] = [];
        for (let e of errors) {
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
        return new ApiError(message, invalidFields);
    } else {
        return new UnknownError()
    }
}