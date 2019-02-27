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

        usernameTitle: 'Username',
        emailTitle: 'Email',

        status: {
            online: 'online',
            lastSeen: 'last seen',
            momentsAgo: 'moments ago',
        },
    },

    Organization: {
        publicRooms: 'Rooms',
        privateRooms: 'Private rooms',

        createPublicRoom: 'Create room',
        createPrivateRoom: 'Create private room',

        addSocialLinks: 'Add social links',
        addAbout: 'Add a short description',
        addMembers: 'Invite people',

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
                    OWNER:
                        'Has full control over the organization account, can edit the profile, invite and confirm new members, assign and change roles.',
                    MEMBER: "Members can participate in the organization's internal chats.",
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
            NONE: 'Request invite',
            REQUESTED: 'Pending',
            LEFT: 'Request invite',
            KICKED: 'Request invite',
        },
    },
};
