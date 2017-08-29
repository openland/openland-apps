import { gql, MutationFunc, graphql } from 'react-apollo';
import graphqlRouted from './graphqlRouted';

export interface DataSet {
    id: string;
    name: string;
    description: string;
    url: string;
    kind: string;
    group?: string;
}

export interface DataSetsResponse {
    datasets: [DataSet];
}

export interface DataSetCreate {
    createDataset: MutationFunc<{}>;
}

const DataSetsSegment = gql`
query {
   datasets {
     id
     name
     description
     kind
     url
     group
   }
}
`;

const DataSetsCreate = gql`
 mutation createDataset($name: String!, $url: String!, $kind: String!) {
   createDataset(name: $name, url: $url, kind: $kind, description: "No description") {
     id
     name
     description
     kind
     url
     group
   }
 }
`;

export const withDatasetsQuery = graphqlRouted<DataSetsResponse>(DataSetsSegment);
export const withDatasetsCreate = graphql<DataSetCreate>(DataSetsCreate);