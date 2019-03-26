export const WHITE_LISTED_ERROR_NAME = 'WHITE_LISTED_ERROR_NAME';

export const throwGraphQLErrors = (error: any) => {
    console.warn(error);
    console.log(error.graphQLErrors);
    const graphQLErrors = error.graphQLErrors;
    if (graphQLErrors && graphQLErrors.length) {
        graphQLErrors.forEach(
            ({ message, error_code }: { message: string; error_code: string }) => {
                if (error_code === 'CANT_JOIN_GROUP' || error_code === 'CANT_JOIN_ORG') {
                    const e = Error(message);
                    e.name = WHITE_LISTED_ERROR_NAME;
                    throw e;
                }

                if (message === 'Access Denied') {
                    throw error;
                }
            },
        );
    }
};
