export const TextProfiles = {
    backButton: 'Back',

    User: {
        message: 'Message',
        edit: 'Edit profile',

        aboutTitle: 'About',

        status: {
            online: 'Online',
            lastSeen: 'Last seen',
            momentsAgo: 'moments ago'
        }
    },

    Organization: {
        publicRooms: 'Public rooms',
        privateRooms: 'Private rooms',

        createPublicRoom: 'Create public room',
        createPrivateRoom: 'Create private room',

        addSocialLinks: 'Add social links',
        addAbout: 'Add a short description',
        addMembers: (isCommunity: boolean) => isCommunity ? 'Add admin' : 'Add members',

        edit: 'Edit',
        superEdit: 'Super edit',

        aboutTitle: 'About',
        membersTitle: (isCommunity: boolean) => isCommunity ? 'Admins' : 'Members',
        requestsTitle: 'Requests',

        members: {
            removeFromOrganization: 'Remove from organization',
            revokeAdminStatus: 'Revoke admin status',
            makeAdmin: 'Make admin',
            edit: 'Edit',

            changeRole: {
                title: (userName: string, orgName: string) => 'Change role of ' + userName + ' in ' + orgName,

                hints: {
                    OWNER: 'Has full control over the organization account, can edit the profile, invite and confirm new members, assign and change roles.',
                    MEMBER: 'Members can participate in the organization\'s internal chats.'
                }
            },

            remove: {
                title: (userName: string, orgName: string) => 'Remove ' + userName + ' from ' + orgName,
                text: (userName: string, orgName: string) => 'Are you sure you want to remove ' + userName + '? They will be removed from all internal chats at ' + orgName + '.',
                submit: 'Remove from organization',
            }
        },

        roles: {
            OWNER: 'Admin',
            MEMBER: 'Member'
        },

        inputs: {
            firstName: 'First name',
            lastName: 'Last name',
        }
    },

    Room: {

    }
};