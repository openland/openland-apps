export type pagesT =
    | 'loading'
    | 'acceptInvite'
    | 'askActivationCode'
    | 'askPhoneCode'
    | 'askEmail'
    | 'askPhone'
    | 'createNewAccount'
    | 'enterYourOrganization'
    | 'introduceYourself';

export const pages: { [K in pagesT]: pagesT } = {
    loading: 'loading',
    acceptInvite: 'acceptInvite',
    askActivationCode: 'askActivationCode',
    askPhoneCode: 'askPhoneCode',
    askEmail: 'askEmail',
    askPhone: 'askPhone',
    createNewAccount: 'createNewAccount',
    enterYourOrganization: 'enterYourOrganization',
    introduceYourself: 'introduceYourself',
};

export const pagesArr = ['acceptInvite', 'createNewAccount', 'askEmail', 'askPhone', 'askActivationCode', 'askPhoneCode', 'introduceYourself', 'enterYourOrganization'];