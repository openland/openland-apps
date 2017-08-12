import { gql, QueryProps } from 'react-apollo';
import graphqlRouted from './graphqlRouted';
import { User } from './User';
// Data structures

export interface CityProps {
  id: string;
}

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

export interface SegmentProps {
  cityId: string;
  projectId: string;
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

export interface SegmentState extends SegmentProps {
  city: City;
}

export interface DataSetsState {
  id: string;
  city: string;
  data: QueryProps & { city: City };
}

// Queries

const QueryCity = gql`
   query city($city: ID!) {
     city(id: $city) {
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
   query project($city: ID!, $segment: ID!) {
     city(id: $city) {
       id
       project(id: $segment) {
         id
         name
       }
     }
   }
 `;

const DataSetsSegment = gql`
 query datasets($city: ID!, $segment: ID!) {
     city(id: $city) {
       id
       project(id: $segment) {
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