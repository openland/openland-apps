export type pagesT =
    | 'loading'
    | 'acceptInvite'
    | 'askAuthCode'
    | 'askAuthData'
    | 'createNewAccount'
    | 'introduceYourself';

export const pages: { [K in pagesT]: pagesT } = {
    loading: 'loading',
    askAuthCode: 'askAuthCode',
    askAuthData: 'askAuthData',
    acceptInvite: 'acceptInvite',
    createNewAccount: 'createNewAccount',
    introduceYourself: 'introduceYourself',
};

export const pagesArr = ['acceptInvite', 'askAuthData', 'askAuthCode', 'createNewAccount', 'introduceYourself'];