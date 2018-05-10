import gql from 'graphql-tag';

export const ParcelID = gql`
  fragment ParcelID on ParcelNumber {
      borough
      boroughId
      block
      blockPadded
      lot
      lotPadded
      title
  }
`;