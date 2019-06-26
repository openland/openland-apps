export type pagesT =
    | 'acceptInvite'
    | 'askActivationCode'
    | 'askEmail'
    | 'createNewAccount'
    | 'enterYourOrganization'
    | 'introduceYourself';

export const pages: { [K in pagesT]: pagesT } = {
    acceptInvite: 'acceptInvite',
    askActivationCode: 'askActivationCode',
    askEmail: 'askEmail',
    createNewAccount: 'createNewAccount',
    enterYourOrganization: 'enterYourOrganization',
    introduceYourself: 'introduceYourself',
};
