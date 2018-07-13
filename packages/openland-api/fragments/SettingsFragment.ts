import gql from 'graphql-tag';

export const SettingsFull = gql`
    fragment SettingsFull on Settings {
        id
        primaryEmail
        emailFrequency
        desktopNotifications
    }
`;