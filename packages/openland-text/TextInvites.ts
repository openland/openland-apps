export const TextInvites = {
    // NAVBAR
    inviteButton: 'Invite members',
    inviteGlobalButton: 'Invite other organization',

    // MODALS

    modalTitle: 'Invite members of your organization',
    modalAction: 'Send Invitations',

    modalGlobalTitle: 'Invite people to Openland',
    modalGloabalAction: 'Send Invitations',

    // MODALS COMMON

    // EMAIL
    emailInputTitle: 'Email',
    firstNameInputTitle: 'First Name',
    lastNameInputTitle: 'Last Name',
    roleInputTitle: 'Role',

    emailInputPlaceholder: 'Email',
    firstNamePlaceholder: 'First Name',
    lastNamePlaceholder: 'Last Name',

    addEmail: 'Add another',

    customMessageTitle: 'Custom Message',
    customMessageButton: 'Add a custom message to make your invitation more personal', 

    // LINK
    getLinkButtonLinkExists: 'Invite with a link',
    getLinkButtonNoLink: 'Get an invite link to share',
    deleteLink: 'Delete link',
    linkExpirationOption1: 'expires in 1 day',
    linkExpirationOption7: 'expires in 7 days',
    linkExpirationOption30: 'expires in 30 days',

    // Invites Histoty
    showHistory: 'See pending and accepted invitations',
    
    backToEmailInvites: 'Invite by email',

    sent: 'Invitations sent!',
    copied: 'Copied',
    
    membersMgmt: {
        inviteButton: 'Invite new members',

        removeTitle: (userName: string, orgName: string) => 'Remove ' + userName + ' from ' + orgName,
        removeText: (userName: string, orgName: string) => 'Are you sure you want to remove ' + userName + '? They will be removed from all internal chats at ' + orgName + '.',
        removeSubmit: 'Remove from organization',

        cancelInviteTitle: 'Cancel invite for',
        cancelInviteSubmit: 'Cancel invite',

        changeRoleTitle: (userName: string, orgName: string) => 'Change role of ' + userName + ' in ' + orgName,

        changeRoleOwnerHint: 'Has full control over the organization account, can edit the profile, invite and confirm new members, assign and change roles.',
        changeRoleMemberHint: 'Members can participate in the organization\'s internal chats.',

        tableChangeRole: 'Manage',

        menuChangeRole: 'Manage permissions',
        menuRemoveMember: 'Remove from organization',
        menuCancelInvite: 'Cancel invite',

        statusJoined: 'joined ',
        statusNotJoined: 'invited',
        statusJoinedFix: 'always been here',

    }
};

// title=|>|text=|placeholder=