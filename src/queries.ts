import * as React from 'react';
import { gql, graphql, compose, QueryProps, MutationFunc } from 'react-apollo';

// Data structures

export interface User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export interface Vote {
  id: string;
  count: number;
  own_set: boolean;
}

export interface VoteProps {
  id: string;
}

export interface VoteState {
  id: string;
  vote: QueryProps & { vote: Vote };
  doVote: MutationFunc<{}>;
  doUnvote: MutationFunc<{}>;
}

export interface CityProps {
  id: string;
}

export interface City {
  id: string;
  name: string;
  segment?: Segment;
}

export interface CityState {
  id: string;
  data: QueryProps & { city: City, me: User };
}

export interface SegmentProps {
  city: string;
  id: string;
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
  id: string;
  city: string;
  data: QueryProps & { city: City };
}

export interface DataSetsState {
  id: string;
  city: string;
  data: QueryProps & { city: City };
}

// Queries

const QueryVote = gql`
   query Vote($id: ID!) {
     vote(id: $id) {
       id
       count
       own_set
     }
   }
 `;

const MutationVote = gql`
  mutation vote($id: ID!) {
    vote(id: $id) {
      id
      count
      own_set
    }
  }
`;

const MutationUnvote = gql`
  mutation unvote($id: ID!) {
    unvote(id: $id) {
      id
      count
      own_set
    }
  }
`;

const QueryCity = gql`
   query city($id: ID!) {
     city(id: $id) {
       id
       name
       segments {
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

const QuerySegment = gql`
   query segment($city: ID!, $id: ID!) {
     city(id: $city) {
       id
       segment(id: $id) {
         id
         name
       }
     }
   }
 `;

const DataSetsSegment = gql`
 query datasets($city: ID!, $id: ID!) {
     city(id: $city) {
       id
       segment(id: $id) {
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

const withVoteQuery = graphql(QueryVote, {
  name: 'vote',
  options: (args: VoteProps) => ({
    variables: { id: args.id }
  })
});

const withVoteAction = graphql(MutationVote, {
  name: 'doVote',
  options: (args: VoteProps) => ({
    variables: { id: args.id }
  })
});

const withUnvoteAction = graphql(MutationUnvote, {
  name: 'doUnvote',
  options: (args: VoteProps) => ({
    variables: { id: args.id }
  })
});

export const withVote = compose<React.ComponentClass<VoteProps>>(
  withVoteQuery,
  withVoteAction,
  withUnvoteAction
);

export const withCityQuery = graphql(QueryCity, {
  options: (args: CityProps) => ({
    variables: { id: args.id }
  })
});

export const withSegmentQuery = graphql(QuerySegment, {
  options: (args: SegmentProps) => ({
    variables: { id: args.id, city: args.city }
  })
});

export const withDatasetsQuery = graphql(DataSetsSegment, {
  options: (args: SegmentProps) => ({
    variables: { id: args.id, city: args.city }
  })
});