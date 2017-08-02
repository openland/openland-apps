import { gql } from 'react-apollo';

export const QueryVote = gql`
   query Vote($id: ID!) {
     vote(id: $id) {
       id
       count
       own_set
     }
   }
 `;

export const MutationVote = gql`
  mutation vote($id: ID!) {
    vote(id: $id) {
      id
      count
      own_set
    }
  }
`;

export const MutationUnvote = gql`
  mutation unvote($id: ID!) {
    unvote(id: $id) {
      id
      count
      own_set
    }
  }
`;

export interface Vote {
  id: string;
  count: number;
  own_set: boolean;
}

export interface PropsVote {
  id: string;
}

export interface ResponseVote {
    vote: Vote;
}