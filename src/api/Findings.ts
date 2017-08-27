import { gql } from 'react-apollo';
import graphqlRouted from './graphqlRouted';
import graphqlCompose from './graphqlCompose';

export interface Findings {
    id: string;
    title: string;
    intro: string;
    description?: string;
    recomendations?: string;
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
            description
            recomendations
        }
    }
`;

const FindingsCreate = gql`
    mutation createFindings($title: String!, $intro: String!) {
        createFindings(title: $title, intro: $intro) {
            id
            title
            intro
            description
            recomendations
        }
    }
`;

const FindingsAlter = gql`
mutation alterFindings($title: String!, $intro: String!, $description: String, $recomendations: String) {
    alterFindings(title: $title, intro: $intro, description: $description, recomendations: $recomendations) {
        id
        title
        intro
        description
        recomendations
    }
}
`;

export const withFindingsQuery = graphqlRouted<FindingsResponse>(FindingsQuery);
export const withFindingsCreate = graphqlRouted<FindingsResponse>(FindingsCreate);
export const withFindingsEdit = graphqlCompose<FindingsResponse>(withFindingsQuery, graphqlRouted<FindingsResponse>(FindingsAlter));