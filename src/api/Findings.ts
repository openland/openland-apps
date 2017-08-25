import { gql } from 'react-apollo';
import graphqlRouted from './graphqlRouted';

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

export const withFindingsQuery = graphqlRouted<FindingsResponse>(FindingsQuery);