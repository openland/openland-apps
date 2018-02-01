import gql from 'graphql-tag';

export const ChartFull = gql`
   fragment ChartFull on Chart {
        labels
        datasets {
            label
            values
        }
   }
`;