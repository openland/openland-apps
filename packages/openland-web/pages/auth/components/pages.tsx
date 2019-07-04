export type pagesT =
    | 'loading'
    | 'acceptInvite'
    | 'askActivationCode'
    | 'askEmail'
    | 'createNewAccount'
    | 'enterYourOrganization'
    | 'introduceYourself';

export const pages: { [K in pagesT]: pagesT } = {
    loading: 'loading',
    acceptInvite: 'acceptInvite',
    askActivationCode: 'askActivationCode',
    askEmail: 'askEmail',
    createNewAccount: 'createNewAccount',
    enterYourOrganization: 'enterYourOrganization',
    introduceYourself: 'introduceYourself',
};
