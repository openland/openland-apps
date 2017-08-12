import * as React from 'react';
import { VoteState, withVote } from '../queries';
import * as auth from '../../auth';

function VoteComponent(props: VoteState) {

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
          vote: {
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
          unvote: {
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

export const Vote = withVote(VoteComponent);