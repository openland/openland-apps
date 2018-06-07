import * as React from 'react';
import { XLink } from 'openland-x/retired/XLink';
export const InitTexts = {

    rootPageTitle: 'Openland',
    socialPageTitle: 'Openland - land acquisition platfom',
    optional: 'optional',

    auth: {
        signinPageTitle: 'Sign in',
        signinHint: 'Already have an Openland account?',
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
        emailPlaceholder: 'Your work email',
        codeInvalid: 'Invalid activation code',
        codePlaceholder: 'XXXXXX',

        reset: 'Reset',
        next: 'Next',
        complete: 'Complete'
    },

    join: {
        pageTitle: 'Join',
        title: 'Join',
        joinButton: 'Join Organization',
        goButton: 'Go to organization',
        unableToFindInvite: 'Unable to find invite',
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
        pageTitle: 'Create organization',
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
        pageTitle: 'Organization?',
        title: 'Please, pick organization'
    },

    need_info: {
        pageTitle: 'Need Info',
        title: 'We need more info',
        content: 'To continue working with system we need more information from you'
    },

    suspended: {
        pageTitle: 'Account suspended',
        title: 'Account suspended',
        content: <>This account has been suspended. Please, contact <XLink href="mailto:support@openland.com">support</XLink> to restore access to your account.</>
    }
};