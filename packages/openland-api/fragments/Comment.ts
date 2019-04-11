import gql from 'graphql-tag';

export const CommentEntryFragment = gql`
    fragment CommentEntryFragment on CommentEntry {
        id
        deleted
        comment {
            ...FullMessage
            id
        }
        parentComment {
            id
        }
        childComments {
            id
        }
    }
`;
