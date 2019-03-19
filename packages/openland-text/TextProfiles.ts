export const TextProfiles = {
    backButton: 'Back',
    showMore: 'Show more',
    showLess: 'Show less',

    App: {
        edit: 'Edit app',
        addBotToChat: 'Add bot to chat',

        create: 'Create app',

        inputs: {
            name: 'Name',
            shortname: 'Shortname',
            photo: 'Photo',
            about: 'About',
        },
    },

    User: {
        you: 'You',
        message: 'Message',
        edit: 'Edit profile',

        aboutTitle: 'About',
        locationTitle: 'Location',

        usernameTitle: 'Username',
        emailTitle: 'Email',

        status: {
            online: 'online',
            lastSeen: 'last seen',
            momentsAgo: 'moments ago',
        },
    },

    Organization: {
        publicGroups: 'Groups',
        privateGroups: 'Private groups',

        createPublicGroup: 'Create group',
        createPrivateGroup: 'Create private group',

        addSocialLinks: 'Add social links',
        addAbout: 'Add a short description',
        addMembers: 'Add members',

        edit: 'Edit',
        superEdit: 'Super edit',

        aboutTitle: 'About',
        membersTitle: 'Members',
        requestsTitle: 'Requests',

        hideFromSearch: 'Hide from search',
        publish: 'Publish',

        youOrganization: 'Your organization',
        view: 'View',
        membersMore: (count: number) => (count > 1 ? ' +' + (count - 1) + ' more' : ''),
        membersLabel: (count: number) => count + (count === 1 ? ' member' : ' members'),

        members: {
            removeFromOrganization: 'Remove from organization',
            leaveFromOrganization: 'Leave organization',
            revokeAdminStatus: 'Revoke admin status',
            makeAdmin: 'Make admin',
            edit: 'Edit',

            changeRole: {
                title: (userName: string, orgName: string) =>
                    'Change role of ' + userName + ' in ' + orgName,

                hints: {
                    ADMIN:
                        'Admins can add and kick members, change organization info, and manage organization groups.',
                    MEMBER: "Members can add new members to organization, view, join, and create organization groups.",
                },
            },

            remove: {
                title: (userName: string, orgName: string) =>
                    'Remove ' + userName + ' from ' + orgName,
                text: (userName: string, orgName: string) =>
                    'Are you sure you want to remove ' +
                    userName +
                    '? They will be removed from all internal chats at ' +
                    orgName +
                    '.',
                submit: 'Remove from organization',
            },
        },

        roles: {
            ADMIN: 'Admin',
            OWNER: 'Owner',
            MEMBER: 'Member',
        },

        inputs: {
            firstName: 'First name',
            lastName: 'Last name',
        },
    },

    Room: {
        membersLabel: (count: number) => count + (count === 1 ? ' member' : ' members'),
        status: {
            MEMBER: 'Member',
            NONE: 'Join group',
            REQUESTED: 'Pending',
            LEFT: 'Join group',
            KICKED: 'Join group',
        },
    },
};
