import { gql } from 'react-apollo';
import graphqlRouted from './graphqlRouted';
import { User } from './User';

// Data structures

export interface Account {
  id: string;
  name: string;
}

export interface AccountResponse {
  account: Account;
  me?: User;
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
export const withDatasetsQuery = graphqlRouted<DataSetsResponse>(DataSetsSegment);