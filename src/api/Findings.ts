import { gql } from 'react-apollo';
import graphqlRouted from './graphqlRouted';
import graphqlCompose from './graphqlCompose';

export interface Findings {
    id: string;
    title: string;
    intro: string;
}

export interface FindingsResponse {
    findings?: Findings;
}

const FindingsQuery = gql`
    query {
        findings {
            id
            title
            intro
        }
    }
`;

const FindingsCreate = gql`
    mutation createFindings($title: String!, $intro: String!) {
        createFindings(title: $title, intro: $intro) {
            id
            title
            intro
        }
    }
`;

const FindingsAlter = gql`
mutation alterFindings($title: String!, $intro: String!) {
    alterFindings(title: $title, intro: $intro) {
        id
        title
        intro
    }
}
`;

export const withFindingsQuery = graphqlRouted<FindingsResponse>(FindingsQuery);
export const withFindingsCreate = graphqlRouted<FindingsResponse>(FindingsCreate);
export const withFindingsEdit = graphqlCompose<FindingsResponse>(withFindingsQuery, graphqlRouted<FindingsResponse>(FindingsAlter));