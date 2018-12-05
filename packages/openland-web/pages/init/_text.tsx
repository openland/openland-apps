import * as React from 'react';
import { XLink } from 'openland-x/XLink';
export const InitTexts = {
    rootPageTitle: 'Openland | An Open Marketplace for Land',
    socialPageTitle: 'Openland | An Open Marketplace for Land',
    optional: 'optional',

    auth: {
        signinPageTitle: 'Sign in',
        signinHint: 'Already have an account?',
        signin: 'Sign in',
        signinTitle: 'Sign in to Openland account',
        signinSubtitle:
            'Welcome back! Get your messages and explore what’s new',
        signinGoogle: 'Sign in with Google',
        signinEmail: 'Sign in with Email',
        signinEmailTitle: 'Sign up for Openland',
        signinEmailSubtitle: 'Creating an account is free and easy',

        signupPageTitle: 'Sign up',
        signupHint: "Don't have an Openland account?",
        signup: 'Sign up',
        signupTitle: 'Sign up for Openland',
        signupSubtitle: 'Get a free account and start exploring',
        signupGoogle: 'Sign up with Google',
        signupEmail: 'Sign up with Email',

        emailInvalid: 'Invalid email',
        emailPlaceholder: 'Your email',
        codeInvalid: 'Invalid activation code',
        codePlaceholder: 'XXXXXX',
        continue: 'Continue',
        complete: 'Continue',
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
        organizationPopup:
            'Enter your full name if you are registering as a private individual',
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
                <XLink href="mailto:support@openland.com">support</XLink> to
                request an account activation.
            </>
        ),
    },

    waitlist: {
        pageTitle: 'You have joined the waitlist',
        title: 'You have joined the waitlist',
        content: (
            <>
                <p>
                    We onboard new users in small groups and will let you know
                    when the system is ready for you.
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
                <XLink href="mailto:support@openland.com">support</XLink> to
                restore access to your account.
            </>
        ),
    },
};
