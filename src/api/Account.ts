import { gql } from 'react-apollo';
import graphqlRouted from './graphqlRouted';
import { User } from './User';

// Data structures

export interface Account {
  id: string;
  name: string;
  project?: Segment;
}

export interface AccountResponse {
  account: Account;
  me?: User;
}

export interface Segment {
  id: string;
  name: string;
  datasets: [DataSet];
}

export interface DataSet {
  id: string;
  name: string;
  description: string;
  url: string;
  kind: string;
}

export interface DataSetsResponse {
  datasets: [DataSet];
}

// Queries

const QueryCity = gql`
   query {
     account {
       id
       name
       projects {
         id
         name
       }
     }
     me {
       id
       name
       firstName
       lastName
       picture
     }
   }
 `;

const QueryProject = gql`
   query project($domain: String!, $projectId: ID!) {
     account(domain: $domain) {
       id
       project(id: $projectId) {
         id
         name
       }
     }
    me {
       id
       name
       firstName
       lastName
       picture
     }
   }
 `;

const DataSetsSegment = gql`
 query {
    datasets {
      id
      name
      description
      kind
      url
    }
 }
 `;

// Wrappers

export const withCityQuery = graphqlRouted<AccountResponse>(QueryCity);
export const withProjectQuery = graphqlRouted<AccountResponse>(QueryProject);
export const withDatasetsQuery = graphqlRouted<DataSetsResponse>(DataSetsSegment);