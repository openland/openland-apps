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
        signinTitle: 'Sign in to your Openland account',
        signinSubtitle: 'Welcome back!',
        signinGoogle: 'Sign in with Google',
        signinEmail: 'Sign in with Email',

        signupPageTitle: 'Sign up',
        signupHint: 'Don\'t have an Openland account?',
        signup: 'Sign up',
        signupTitle: 'Sign up for Openland',
        signupSubtitle: 'Get a free account and start exploring',
        signupGoogle: 'Sign up with Google',
        signupEmail: 'Sign up with Email',

        emailInvalid: 'Invalid email',
        emailPlaceholder: 'Work email',
        codeInvalid: 'Invalid activation code',
        codePlaceholder: 'XXXXXX',

        reset: 'Reset',
        next: 'Next',
        complete: 'Continue'
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
        title: 'Invite',
        joinButton: 'Activate Organization',
        unableToFindInvite: 'Unable to find your invitation',
    },

    create_profile: {
        pageTitle: 'Create profile',
        title: 'Set up a user account',
        firstName: 'First Name',
        firstNamePlaceholder: 'Jane',
        lastName: 'Last Name',
        lastNamePlaceholder: 'Doe',
        phone: 'Phone',
        photo: 'Photo',
        continue: 'Continue'
    },

    create_organization: {
        pageTitle: 'Add your organization',
        title: 'Add your organization',
        name: 'Organization name',
        namePlaceholder: 'Acme Corparation',
        website: 'Website',
        websitePlaceholder: 'http://acme.com/',
        photo: 'Logo',
        cancel: 'Cancel',
        skip: 'Skip for now',
        continue: 'Continue'
    },

    pick_organization: {
        pageTitle: 'Select your organization',
        title: 'Please, select your organization'
    },

    need_info: {
        pageTitle: 'Activation needed',
        title: 'Activation needed',
        content: <>We onboard new members in small groups. Contact <XLink href="mailto:support@openland.com">support</XLink> to request an account activation.</>
    },

    waitlist: {
        pageTitle: 'You have joined waitlist',
        title: 'You have joined waitlist',
        content: (
            <>
                <p>Openland is currently in closed beta.</p>
                <p>We onboard new users in small groups and will let you know when the system is ready for you.</p>
            </>)
    },

    suspended: {
        pageTitle: 'Account suspended',
        title: 'Account suspended',
        content: <>This account has been suspended. Please, contact <XLink href="mailto:support@openland.com">support</XLink> to restore access to your account.</>
    }
};