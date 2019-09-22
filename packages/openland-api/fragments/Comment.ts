import gql from 'graphql-tag';
import { FullMessage } from './Message';

export const CommentEntryFragment = gql`
    fragment CommentEntryFragment on CommentEntry {
        id
        deleted
        comment: betaComment {
            ...FullMessage
            id
        }
        parentComment {
            comment: betaComment {
                id
                message
            }

            id
        }
        childComments {
            id
        }
    }

    ${FullMessage}
`;
