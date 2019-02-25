import * as React from 'react';
import { XLink } from 'openland-x/XLink';

export const InitTexts = {
    rootPageTitle: 'Openland',
    socialPageTitle: 'Openland',
    optional: 'optional',

    auth: {
        signinPageTitle: 'Sign in',
        signinHint: 'Already have an account?',
        signin: 'Sign in',
        signinTitle: 'Sign in to Openland account',
        signinSubtitle: 'Welcome back! Get your messages and explore what’s new',
        signinGoogle: 'Sign in with Google',
        signinEmail: 'Sign in with Email',
        signupEmail: 'Sign up with Email',
        signupPageTitle: 'Sign up',
        signupHint: "Don't have an Openland account?",
        signup: 'Sign up',
        creatingAnAccountFree: 'Creating an account is free and easy',
        signupGoogle: 'Sign up with Google',
        signupWebSignUpEmail: 'Sign up for Openland',
        signinRoomSignUpEmail: 'Sign in and join the conversation',
        signupRoomSignUpEmail: 'Sign up and join the conversation',
        enterActivationCode: 'Enter activation code',
        resend: 'Resend.',
        haveNotReceiveCode: "Haven't received our email?",
        noEmail: 'Please enter your email address',
        emailInvalid: 'It looks like this email is incorrect.\nPlease check your email address and try again.',
        emailPlaceholder: 'Your email',
        codeInvalid: 'Invalid activation code',
        noCode: 'Please enter the 6-digit code we\'ve just sent to your email',
        wrongCodeLength: 'The code you entered is incorrect.\nPlease check the code in the email and try again.',
        codePlaceholder: 'Code from email',
        continue: 'Continue',
        back: 'Back',
        complete: 'Continue',
        organizationIsEmptyError: `Organization field is required. To register as
        an individual, simply enter your name.`,
        firstNameIsEmptyError: "First name can't be empty",
        lastNameIsEmptyError: "Last name can't be empty",
    },

    join: {
        pageTitle: 'Join',
        title: 'Join',
        joinButton: 'Join Organization',
        goButton: 'Go to organization',
        unableToFindInvite: 'Unable to find your invitation',
    },

    invite: {
        pageTitle: 'Invite',
        title: 'Invite from',
        joinButton: 'Activate Organization',
        unableToFindInvite: 'Unable to find your invitation',
    },

    create_profile: {
        pageTitle: 'Create profile',
        title: 'Introduce yourself',
        subTitle: 'Add your name and photo so others can recognize you',
        firstName: 'First Name',
        firstNamePlaceholder: 'First name',
        lastName: 'Last Name',
        lastNamePlaceholder: 'Last name',
        phone: 'Phone',
        photo: 'Photo',
        organizationName: 'Organization Name',
        organizationPopup: 'To register as an individual, simply enter your name',
        continue: 'Continue',
    },

    create_organization: {
        pageTitle: 'Add your organization',
        title: 'Add your organization',
        subTitle: 'Find your organization or create a new one',
        name: 'Organization name',
        namePlaceholder: 'Acme Corporation',
        website: 'Website',
        websitePlaceholder: 'http://acme.com/',
        photo: 'Logo',
        cancel: 'Cancel',
        skip: 'Skip for now',
        createAndContinue: 'Create and continue',
        continue: 'Continue',
    },

    create_organization_popper: {
        title: 'Create organization',
        namePlaceholder: 'Organization name',
        descriptionPlaceholder: 'Short description (optional)',
        submit: 'Create',
        addPhoto: (
            <>
                <p>Add photo</p> <p>(optional)</p>
            </>
        ),
        changePhoto: 'Change photo',
    },

    create_community_popper: {
        title: 'Create community',
        namePlaceholder: 'Community name',
        descriptionPlaceholder: 'Short description (optional)',
        submit: 'Create',
        addPhoto: (
            <>
                <p>Add photo</p> <p>(optional)</p>
            </>
        ),
        changePhoto: 'Change photo',
    },

    pick_organization: {
        pageTitle: 'Select your organization',
        title: 'Please, select your organization',
    },

    need_info: {
        pageTitle: 'Activation needed',
        title: 'Activation needed',
        content: (
            <>
                We onboard new members in small groups. Contact{' '}
                <XLink href="mailto:support@openland.com">support</XLink> to request an account
                activation.
            </>
        ),
    },

    waitlist: {
        pageTitle: 'You have joined the waitlist',
        title: 'You have joined the waitlist',
        content: (
            <>
                <p>
                    We onboard new users in small groups and will let you know when the system is
                    ready for you.
                </p>
            </>
        ),
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
