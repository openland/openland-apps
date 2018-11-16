export const TextProfiles = {
    backButton: 'Back',
    showMore: 'Show more',
    showLess: 'Show less',

    User: {
        you: 'You',
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
        addMembers: (isCommunity: boolean) => isCommunity ? 'Add admin' : 'Invite people',

        edit: 'Edit',
        superEdit: 'Super edit',

        aboutTitle: 'About',
        membersTitle: (isCommunity: boolean) => isCommunity ? 'Admins' : 'Members',
        requestsTitle: 'Requests',

        hideFromSearch: 'Hide from search',
        publish: 'Publish',

        youOrganization: 'Your organization',
        view: 'View',
        membersMore: (count: number) => count > 1 ? ' +' + (count - 1) + ' more' : '',
        roomsLabel: (count: number) => count + (count === 1 ? ' room' : ' rooms'),

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
        membersLabel: (count: number) => count + (count === 1 ? ' member' : ' members'),
        status: {
            invited: 'Invited',
            member: 'Member',
            none: 'Request invite',
            requested: 'Pending',
        }
    }
};