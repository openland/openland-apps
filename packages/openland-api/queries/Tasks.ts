import gql from 'graphql-tag';

export const RefreshTaskQuery = gql`
    query RefreshTask($id: ID!) {
        task: alphaRefreshTask(id: $id) {
            id
            status
            result
        }
    }
`;

export const SampleTaskMutation = gql`
    mutation SampleTask {
        task: superMultiplyValue(value: 10) {
            id
            status
            result
        }
    }
`;