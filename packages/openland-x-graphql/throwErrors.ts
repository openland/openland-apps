//

export const throwGraphQLErrors = (error: any) => {
    console.warn(error);
    const graphQLErrors = error.graphQLErrors;
    if (graphQLErrors && graphQLErrors.length) {
        const errorMessages = graphQLErrors.map(({ message }: { message: string }) => message);

        if (errorMessages.indexOf('You was kicked from this group') !== -1) {
            throw Error(
                'Unfortunately, you cannot join this group. Someone kicked you from this group, and now you can only join it if a group member adds you.',
            );
        }

        if (errorMessages.indexOf('Access Denied') !== -1) {
            throw error;
        }
    }
};
