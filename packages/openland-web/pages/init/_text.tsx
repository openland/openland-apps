import * as React from 'react';
import { XLink } from 'openland-x/XLink';

export const InitTexts = {
    rootPageTitle: 'Openland',
    socialPageTitle: 'Openland',

    auth: {
        signin: 'Sign in',
        signup: 'Sign up',
        resend: 'Resend.',
        haveNotReceiveCode: "Haven’t received?",
        emailInvalid:
            'Incorrect email.\nPlease check it and try again',
        emailPlaceholder: 'Email',
        wrongCodeLength:
            'Incorrect code.\nPlease check it and try again',
        next: 'Next',
        done: 'Done',
    },

    suspended: {
        pageTitle: 'Account suspended',
        title: 'Account suspended',
        content: (
            <>
                This account has been suspended. Please, contact{' '}
                <XLink href="mailto:support@openland.com">support</XLink> to restore access to your
                account.
            </>
        ),
    },
};
