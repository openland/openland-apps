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
    mutation SampleTask($value: Int!) {
        task: superMultiplyValue(value: $value) {
            id
            status
            result
        }
    }
`;

export const FolderExportTaskMutation = gql`
    mutation FolderExportTask($folderId: ID!) {
        task: alphaExportFolder(folderId: $folderId) {
            id
            status
            result
        }
    }
`;