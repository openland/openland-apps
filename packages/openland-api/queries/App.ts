import gql from 'graphql-tag';
import { AppFull } from '../fragments/AppFull';

export const MyAppsQuery = gql`
    query MyApps {
        apps: myApps {
            ...AppFull
        }
    }
    ${AppFull}
`;

export const CreateAppMutation = gql`
    mutation CreateApp(
        $name: String!
        $shortname: String
        $photoRef: ImageRefInput
        $about: String
    ) {
        createApp(name: $name, shortname: $shortname, photoRef: $photoRef, about: $about) {
            ...AppFull
        }
    }
    ${AppFull}
`;

export const UpdateAppMutation = gql`
    mutation UpdateApp($appId: ID!, $input: AppProfileInput!) {
        updateAppProfile(appId: $appId, input: $input) {
            ...AppFull
        }
    }
    ${AppFull}
`;

export const RefreshAppTokenMutation = gql`
    mutation RefreshAppToken($appId: ID!) {
        refreshAppToken(appId: $appId) {
            ...AppFull
        }
    }
    ${AppFull}
`;
