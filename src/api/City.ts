import { gql } from 'react-apollo';
import graphqlRouted from './graphqlRouted';
import { User } from './User';
// Data structures

export interface City {
  id: string;
  name: string;
  project?: Segment;
}

export interface CityState {
  id: string;
  city: City;
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

export interface SegmentState {
  city: City;
}

// Queries

const QueryCity = gql`
   query city($cityId: ID!) {
     city(id: $cityId) {
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
   query project($cityId: ID!, $projectId: ID!) {
     city(id: $cityId) {
       id
       project(id: $projectId) {
         id
         name
       }
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
   }
 `;

// Wrappers

export const withCityQuery = graphqlRouted<CityState>(QueryCity);
export const withProjectQuery = graphqlRouted<SegmentState>(QueryProject);
export const withDatasetsQuery = graphqlRouted<SegmentState>(DataSetsSegment);