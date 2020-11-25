export type pagesT =
    | 'loading'
    | 'askAuthCode'
    | 'askAuthData'
    | 'createNewAccount'
    | 'introduceYourself';

export const pages: { [K in pagesT]: pagesT } = {
    loading: 'loading',
    askAuthCode: 'askAuthCode',
    askAuthData: 'askAuthData',
    createNewAccount: 'createNewAccount',
    introduceYourself: 'introduceYourself',
};

export const pagesArr = ['createNewAccount', 'askAuthData', 'askAuthCode', 'introduceYourself'];
