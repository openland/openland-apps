export const TextInvites = {
    // NAVBAR
    inviteButton: 'Invite members',
    inviteGlobalButton: 'Invite other organization',

    // MODALS

    modalTitle: 'Invite your colleagues',
    modalAction: 'Send Invitations',

    modalGlobalTitle: 'Invite colleagues from other organization',
    modalGloabalAction: 'Send Invitations',

    // MODALS COMMON

    // EMAIL
    emailInputTitle: 'Email Adress',
    firstNameInputTitle: 'First Name',
    lastNameInputTitle: 'Last Name',
    roleInputTitle: 'Role',

    emailInputPlaceholder: 'Email Adress',
    firstNamePlaceholder: 'First Name',
    lastNamePlaceholder: 'Last Name',

    addEmail: ' + Add another',

    customMessageTitle: 'Custom Message',

    // LINK
    getLinkButtonLinkExists: 'Share invite link',
    getLinkButtonNoLink: 'Get an invite link to share',
    deleteLink: 'Delete link',
    linkExpirationOption1: 'expires in 1 day',
    linkExpirationOption7: 'expires in 7 days',
    linkExpirationOption30: 'expires in 30 days',

    // Invites Histoty
    showHistory: 'See pending and accepted invitations',
    
    backToEmailInvites: 'Send email invites',

    membersMgmt: {
        inviteButton: 'Invite new members',

        removeTitle: (orgName: string) => 'Imagine ' + orgName + ' without',
        removeSubmit: 'Remove from organization',

        cancelInviteTitle: 'Cancel invite for',
        cancelInviteSubmit: 'Cancel invite',

        changeRoleTitle: (userName: string, orgName: string) => 'Imagine ' + userName + ' as ' + orgName + '\'s',

        changeRoleOwnerHint: 'Owner can do everything',
        changeRoleMemberHint: 'Members only watches',

        tableChangeRole: 'Manage Permissions',

        menuChangeRole: 'Manage Permissions',
        menuRemoveMember: 'Remove from organization',
        menuCancelInvite: 'Cancel invite',

        statusJoined: 'joined ',
        statusNotJoined: 'invited',
        statusJoinedFix: 'always been here',

    }
};

// title=|>|text=|placeholder=