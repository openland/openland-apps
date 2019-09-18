import gql from 'graphql-tag';

export const ReportContentMutation = gql`
    mutation ReportContent($contentId: ID!, $type: String!, $message: String) {
        reportContent(contentId: $contentId, type: $type, message: $message)
    }
`;