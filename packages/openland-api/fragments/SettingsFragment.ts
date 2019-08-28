import gql from 'graphql-tag';

export const PlatformNotificationSettingsFull = gql`
    fragment PlatformNotificationSettingsFull on PlatformNotificationSettings {
        direct {
            showNotification
            sound
        }
        secretChat {
            showNotification
            sound
        }
        organizationChat {
            showNotification
            sound
        }
        communityChat {
            showNotification
            sound
        }
        comments {
            showNotification
            sound
        }
        notificationPreview
    }
`;

export const SettingsFull = gql`
    fragment SettingsFull on Settings {
        id
        primaryEmail
        emailFrequency
        excludeMutedChats
        countUnreadChats

        desktop {
            ...PlatformNotificationSettingsFull
        }

        mobile {
            ...PlatformNotificationSettingsFull
        }
    }
    ${PlatformNotificationSettingsFull}
`;