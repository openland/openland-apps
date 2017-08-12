import {
  gql, graphql, compose, QueryProps, MutationFunc
} from 'react-apollo';

// Types

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

//
// Vote Queries and Mutations
//

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

//
// Result Wrapper
//

export const withVote = compose<React.ComponentClass<VoteProps>>(
  withVoteQuery,
  withVoteAction,
  withUnvoteAction
);