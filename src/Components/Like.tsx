import * as React from 'react';
import { graphql, QueryProps, MutationFunc, compose } from 'react-apollo';
import { PropsVote, QueryVote, MutationVote, MutationUnvote, ResponseVote } from '../queries';
import * as auth from '../auth';
const withVoteQuery = graphql<ResponseVote, PropsVote>(QueryVote, {
  name: 'vote',
  options: (args: PropsVote) => ({
    variables: { id: args.id }
  })
});

const withVoteAction = graphql<ResponseVote, PropsVote>(MutationVote, {
  name: 'doVote',
  options: (args: PropsVote) => ({
    variables: { id: args.id }
  })
});

const withUnvoteAction = graphql<ResponseVote, PropsVote>(MutationUnvote, {
  name: 'doUnvote',
  options: (args: PropsVote) => ({
    variables: { id: args.id }
  })
});

const withVote = compose(
  withVoteQuery,
  withVoteAction,
  withUnvoteAction
);

function VoteComponent(props: {
  id: string, vote: QueryProps & ResponseVote,
  doVote: MutationFunc<{}>,
  doUnvote: MutationFunc<{}>
}) {

  function like() {

    if (!auth.isAuthenticated()) {
      auth.login();
      return;
    }

    if (!props.vote!!.vote.own_set) {
      props.doVote({
        variables: {
          id: props.id
        },
        optimisticResponse: {
          vote : {
            __typename: 'Vote',
            id: props.id,
            count: props.vote.vote.count + 1,
            own_set: true
          }
        }
      });
    } else {
      props.doUnvote({
        variables: {
          id: props.id
        },
        optimisticResponse: {
          unvote : {
            __typename: 'Vote',
            id: props.id,
            count: props.vote.vote.count - 1,
            own_set: false
          }
        }
      });
    }
  }
  var style = 'like';
  if (props.vote.loading) {
    return <button className={style}>Like ...</button>;
  }
  if (props.vote.vote.own_set) {
    style = 'like-active';
  }
  return <button className={style} onClick={like}>Like {props.vote.vote.count}</button>;
}

export default withVote(VoteComponent);