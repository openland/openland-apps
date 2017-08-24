import { gql } from 'react-apollo';
import graphqlRouted from './graphqlRouted';
import { User } from './User';
import { Project } from './Project';
// Data structures

export interface Account {
  id: string;
  name: string;
  city?: string;
}

export interface AccountResponse {
  account: Account;
  me?: User;
  projects: [Project];
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
       city
     }
     me {
       id
       name
       firstName
       lastName
       picture
     }
     projects {
      id
      name
      slug
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