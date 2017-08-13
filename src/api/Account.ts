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
  me: User;
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
  link: string;
}

// Queries

const QueryCity = gql`
   query account($domain: String!) {
     account(domain: $domain) {
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
     city(domain: $domain) {
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
 query datasets($cityId: ID!, $projectId: ID!) {
     city(id: $cityId) {
       id
       project(id: $projectId) {
         id
         name
         datasets {
           id
           name
           description
           link
         }
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

// Wrappers

export const withCityQuery = graphqlRouted<AccountResponse>(QueryCity);
export const withProjectQuery = graphqlRouted<AccountResponse>(QueryProject);
export const withDatasetsQuery = graphqlRouted<AccountResponse>(DataSetsSegment);