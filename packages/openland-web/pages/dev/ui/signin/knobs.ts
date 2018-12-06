export const roomSignupKnob = {
    headerStyle: {
        type: 'select',
        value: ['signin', 'signup', 'profile', 'organization'],
        default: 'organization',
    },
};

export const signContainerKnob = {
    signin: {
        type: 'checkbox',
        default: true,
    },
    text: {
        type: 'input',
        default: 'Already have an account?',
    },
    linkText: {
        type: 'input',
        default: 'Sign in',
    },
};

export const authMechanismKnob = {
    signin: {
        type: 'checkbox',
        default: true,
    },
    loginWithGoogle: {
        type: 'callback',
        value: () => console.log('loginWithGoogle called'),
    },
    loginWithEmail: {
        type: 'callback',
        value: () => console.log('loginWithEmail called'),
    },
};

export const createWithEmail = {
    signin: {
        type: 'checkbox',
        default: true,
    },
    emailSending: {
        type: 'checkbox',
        default: false,
    },

    emailError: {
        type: 'input',
        default: '',
    },
    emailValue: {
        type: 'input',
        default: '',
    },
    emailChanged: {
        type: 'callback',
        value: ({ value, context }: any) =>
            context.setState({ emailValue: value }),
    },
    loginEmailStart: {
        type: 'callback',
        value: () => console.log('loginEmailStart called'),
    },
};

export const activationCodeKnob = {
    codeSending: {
        type: 'checkbox',
        default: false,
    },
    codeError: {
        type: 'input',
        default: '',
    },
    emailSendedTo: {
        type: 'input',
        default: 'demarco_kshlerin@yahoo.com',
    },
    codeValue: {
        type: 'input',
        default: '',
    },
    codeChanged: {
        type: 'callback',
        value: ({ value, context }: any) =>
            context.setState({ codeValue: value }),
    },
    loginCodeStart: {
        type: 'callback',
        value: () => console.log('loginCodeStart called'),
    },
};
