export const TextDirectory = {
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

export const TextDirectoryData = {
    locationPicker: {
        MultiStateRegions: [
            'West Coast',
            'East Coast',
            'Northeast',
            'Southeast',
            'Southwest',
            'Mideast',
            'Midwest',
            'New England',
            'Great Lakes',
            'Plains',
            'Rocky Mountains'
        ],

        States: [
            'California',
            'Texas',
            'Florida',
            'New York',
            'Pennsylvania',
            'Illinois',
            'Ohio',
            'Georgia',
            'North Carolina',
            'Michigan',
            'New Jersey',
            'Virginia',
            'Washington',
            'Arizona',
            'Massachusetts',
            'Tennessee',
            'Indiana',
            'Missouri',
            'Maryland',
            'Wisconsin',
            'Colorado',
            'Minnesota',
            'South Carolina',
            'Alabama',
            'Louisiana',
            'Kentucky',
            'Oregon',
            'Oklahoma',
            'Connecticut',
            'Iowa',
            'Utah',
            'Nevada',
            'Arkansas',
            'Mississippi',
            'Kansas',
            'New Mexico',
            'Nebraska',
            'West Virginia',
            'Idaho',
            'Hawaii',
            'New Hampshire',
            'Maine',
            'Montana',
            'Rhode Island',
            'Delaware',
            'South Dakota',
            'North Dakota',
            'Alaska',
            'District of Columbia',
            'Vermont',
        ],

        MetropolitanAreas: [
            'New York Metro Area',
            'Greater Los Angeles',
            'Chicagoland',
            'Dallas–Fort Worth',
            'Greater Houston',
            'Washington Metro Area',
            'Miami Metro Area',
            'Delaware Valley',
            'Atlanta Metro',
            'Greater Boston',
            'Phoenix Metro Area',
            'San Francisco Bay Area',
            'Inland Empire',
            'Metro Detroit',
            'Seattle Metro Area',
            'Twin Cities',
            'San Diego County',
            'Tampa Bay Area',
            'Denver Metro Area',
            'Baltimore Metro area',
            'Greater St. Louis',
            'Charlotte Metro',
            'Greater Orlando',
            'Greater San Antonio',
            'Greater Portland',
        ],

        Cities: [
            'New York City',
            'Los Angeles',
            'Chicago',
            'Houston',
            'Phoenix',
            'Philadelphia',
            'San Antonio',
            'San Diego',
            'Dallas',
            'San Jose',
            'Austin',
            'Jacksonville',
            'Fort Worth',
            'San Francisco',
            'Columbus',
            'Charlotte',
            'Indianapolis',
            'Seattle',
            'Denver',
            'Washington, D.C.',
            'El Paso',
            'Boston',
            'Nashville',
            'Detroit',
            'Portland',
            'Oklahoma City',
            'Las Vegas',
            'Memphis',
            'Louisville',
            'Baltimore',
            'Milwaukee',
            'Albuquerque',
            'Tucson',
            'Fresno',
            'Sacramento',
            'Mesa',
            'Kansas City',
            'Atlanta',
            'Colorado Springs',
            'Miami',
            'Raleigh',
            'Long Beach',
            'Virginia Beach',
            'Omaha',
            'Oakland',
            'Minneapolis',
            'Tulsa',
            'Arlington',
            'New Orleans',
            'Tampa',
            'Wichita',
            'Bakersfield',
            'Cleveland',
            'Aurora',
            'Anaheim',
            'Honolulu',
            'Santa Ana',
            'Riverside',
            'Corpus Christi',
            'Lexington Fayette',
            'Stockton',
            'Henderson',
            'St. Paul',
            'St. Louis',
            'Pittsburgh',
            'Cincinnati',
            'Anchorage',
            'Plano',
            'Orlando',
            'Greensboro',
            'Lincoln',
            'Irvine',
            'Newark',
            'Toledo',
            'Durham',
            'Chula Vista',
            'St. Petersburg',
            'Fort Wayne',
            'Jersey City',
            'Laredo',
            'Madison',
            'Scottsdale',
            'Lubbock',
            'Chandler',
            'Reno',
            'Buffalo',
            'Glendale',
            'North Las Vegas',
            'Gilbert',
            'Winston Salem',
            'Norfolk',
            'Chesapeake',
            'Irving',
            'Fremont',
            'Hialeah',
            'Garland',
            'Richmond',
            'Boise City',
            'Baton Rouge',
            'Spokane',
        ],
    },

    categoryPicker: {
        categories: [
            { label: 'Automotive', value: 'Automotive' },
            { label: '• Gas station', value: 'Gas station' },
            { label: '• Parking', value: 'Parking' },
            { label: '• Car wash', value: 'Car wash' },

            { label: 'Retail', value: 'Retail' },
            { label: '• Big box retail', value: 'Big box retail' },
            { label: '• Medium retail', value: ' Medium retail' },
            { label: '• Mall', value: 'Mall' },
            { label: '• Strip mall', value: 'Strip mall' },
            { label: '• Self storage', value: 'Self storage' },
            { label: '• Convenience store', value: 'Convenience store' },

            { label: 'Transportation', value: 'Transportation' },
            { label: '• Railway', value: 'Railway' },
            { label: '• Subway', value: 'Subway' },
            { label: '• Highway system', value: 'Highway system' },
            { label: '• Airport', value: 'Airport' },
            { label: '• Port authorities', value: 'Port authorities' },
            { label: '• Logistics company', value: 'Logistics company' },

            { label: '• Real estate', value: 'Real estate' },
            { label: 'Real estate developer', value: 'Real estate developer' },
            { label: 'Property manager', value: 'Property manager' },
            { label: 'REIT', value: 'REIT' },
            { label: 'Brokerage', value: 'Brokerage' },

            { label: 'Healthcare', value: 'Healthcare' },
            { label: '• Health system', value: 'Health system' },
            { label: '• Hospital', value: 'Hospital' },

            { label: 'Education', value: 'Education' },
            { label: '• School', value: 'School' },
            { label: '• College', value: 'College' },

            { label: 'Energy and utilities', value: 'Energy and utilities' },
            { label: '• Coal plant', value: 'Coal plant' },
            { label: '• Utility', value: 'Utility' },

            { label: 'Finance', value: 'Finance' },
            { label: '• Bank', value: 'Bank' },
            { label: '• Family offices', value: 'Family offices' },

            { label: 'Government', value: 'Government' },
            { label: '• State government', value: 'State government' },
            { label: '• County governmen', value: 'County governmen' },
            { label: '• City government', value: 'City government' },
            { label: '• Regional government', value: 'Regional government' },
            { label: '• Housing authority', value: 'Housing authority' },
            { label: '• Port authority', value: 'Port authority' },
            { label: '• Stadium authority', value: 'Stadium authority' },

            { label: 'Military', value: 'Military' },
            { label: '• Army', value: 'Army' },
            { label: '• Navy', value: 'Navy' },
            { label: '• Airforce', value: 'Airforce' },

            { label: 'Other', value: 'Other' },
            { label: '• Warehouse', value: 'Warehouse' },
            { label: '• Individuals', value: 'Individuals' },
        ],

        catalog: [
            {
                label: 'Automotive',
                value: 'Automotive',
                options: [
                    { label: 'Gas station', value: 'Gas station' },
                    { label: 'Parking', value: 'Parking' },
                    { label: 'Car wash', value: 'Car wash' },
                ]
            },
            {
                label: 'Retail',
                value: 'Retail',
                options: [
                    { label: 'Big box retail', value: 'Big box retail' },
                    { label: 'Medium retail', value: ' Medium retail' },
                    { label: 'Mall', value: 'Mall' },
                    { label: 'Strip mall', value: 'Strip mall' },
                    { label: 'Self storage', value: 'Self storage' },
                    { label: 'Convenience store', value: 'Convenience store' },
                ]
            },
            {
                label: 'Transportation',
                value: 'Transportation',
                options: [
                    { label: 'Railway', value: 'Railway' },
                    { label: 'Subway', value: 'Subway' },
                    { label: 'Highway system', value: 'Highway system' },
                    { label: 'Airport', value: 'Airport' },
                    { label: 'Port authorities', value: 'Port authorities' },
                    { label: 'Logistics company', value: 'Logistics company' },
                ]
            },
            {
                label: 'Real estate',
                value: 'Real estate',
                options: [
                    { label: 'Real estate developer', value: 'Real estate developer' },
                    { label: 'Property manager', value: 'Property manager' },
                    { label: 'REIT', value: 'REIT' },
                    { label: 'Brokerage', value: 'Brokerage' },
                ]
            },
            {
                label: 'Healthcare',
                value: 'Healthcare',
                options: [
                    { label: 'Health system', value: 'Health system' },
                    { label: 'Hospital', value: 'Hospital' },
                ]
            },
            {
                label: 'Education',
                value: 'Education',
                options: [
                    { label: 'School', value: 'School' },
                    { label: 'College', value: 'College' },
                ]
            },
            {
                label: 'Energy and utilities',
                value: 'Energy and utilities',
                options: [
                    { label: 'Coal plant', value: 'Coal plant' },
                    { label: 'Utility', value: 'Utility' },
                ]
            },
            {
                label: 'Finance',
                value: 'Finance',
                options: [
                    { label: 'Bank', value: 'Bank' },
                    { label: 'Family offices', value: 'Family offices' },
                ]
            },
            {
                label: 'Government',
                value: 'Government',
                options: [
                    { label: 'State government', value: 'State government' },
                    { label: 'County governmen', value: 'County governmen' },
                    { label: 'City government', value: 'City government' },
                    { label: 'Regional government', value: 'Regional government' },
                    { label: 'Housing authority', value: 'Housing authority' },
                    { label: 'Port authority', value: 'Port authority' },
                    { label: 'Stadium authority', value: 'Stadium authority' },
                ]
            },
            {
                label: 'Military',
                value: 'Military',
                options: [
                    { label: 'Army', value: 'Army' },
                    { label: 'Navy', value: 'Navy' },
                    { label: 'Airforce', value: 'Airforce' },
                ]
            },
            {
                label: 'Other',
                value: 'Other',
                options: [
                    { label: 'Warehouse', value: 'Warehouse' },
                    { label: 'Individuals', value: 'Individuals' },
                ]
            },
        ],
    },

    interestPicker: [
        { label: 'Dispositions', value: 'Dispositions' },
        { label: 'Acquisitions', value: 'Acquisitions' },
        { label: 'Joint ventures', value: 'Joint ventures' },
        { label: 'Leasing', value: 'Leasing' },
        { label: 'Offering a lease', value: 'Offering a lease' },
        { label: 'Option-to-buy', value: 'Option-to-buy' },
        { label: 'Development', value: 'Development' },
        { label: 'Redevelopment', value: 'Redevelopment' },
        { label: 'Investing', value: 'Investing' },
        { label: 'Retail redevelopment', value: 'Retail redevelopment' },
    ],
};