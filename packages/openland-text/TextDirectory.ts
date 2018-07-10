export const TextDirectory = {
    headerTitle: 'Organizations',
    headerText: 'Search for new partnership to looking their listings updates',

    headerButtonAddOrganization: 'Add an organization',

    labelYourOrganization: 'Your organization',

    buttonViewProfile: 'View profile',
    buttonEdit: 'Edit',
    buttonFollow: 'Follow',
    buttonFollowing: 'Following',

    counterOrganizations: function (value: number) {
        return value + ((value !== 1) ? ' organizations' : ' organization');
    },

    emptyResults: 'Empty',
};