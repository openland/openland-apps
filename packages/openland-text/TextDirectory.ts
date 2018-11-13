export const TextDirectory = {
    sidebar: {
        title: 'Directory',
        channels: 'Channels',
        people: 'People',
        organizations: 'Organizations',
        communities: 'Communities',
    },

    create: {
        title: 'New',
        organization: 'New organization',
        channel: 'New channel',
        community: 'New community'
    },

    headerTitle: 'Organizations',
    headerText: 'Search for new partnership to looking their listings updates',

    headerButtonAddOrganization: 'Add an organization',

    searchInputPlaceholder: 'Search organization',
    searchConditionAll: 'All organizations',

    buttonSearch: 'Search',
    buttonReset: 'Clear',

    labelYourOrganization: 'Your organization',
    labelSendMessage: 'Message',

    buttonViewProfile: 'View profile',
    buttonEdit: 'Edit',
    buttonCreateChannel: 'Create channel',
    buttonSuperEdit : 'Super edit',
    buttonFollow: 'Follow',
    buttonFollowing: 'Following',

    counterOrganizations: function (value: number) {
        return value + ((value !== 1) ? ' results found' : ' result found');
    },

    emptyResults: 'Empty',

    locationPicker: 'Location',
    locationsTitle: 'Top locations',
    locationSearchPlaceholder: 'Enter a location',
    locationCities: 'Cities',
    locationMetropolitanAreas: 'Metropolitan areas',
    locationStates: 'States',
    locationMultiStateRegions: 'Multi-state regions',

    categoryPicker: 'Organization category',

    interestPicker: 'Channels',
    interestSearchPlaceholder: 'Enter an interest',
    interestTop: 'Top channels',
};