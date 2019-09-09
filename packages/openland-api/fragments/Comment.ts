import gql from 'graphql-tag';
import { FullMessage } from './Message';

export const CommentEntryFragment = gql`
    fragment CommentEntryFragment on CommentEntry {
        id
        deleted
        comment {
            ...FullMessage
            id
        }
        parentComment {
            comment {
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
