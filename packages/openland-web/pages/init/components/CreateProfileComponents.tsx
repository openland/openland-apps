import * as React from 'react';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XInput } from 'openland-x/XInput';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import glamorous from 'glamorous';

export const RootContainer = glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    position: 'relative',
    backgroundColor: '#fff',
    minWidth: 600,
});

export const Logo = glamorous.div({
    width: 145,
    height: 42,
    backgroundImage: "url('/static/logo.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    position: 'absolute',
    top: 19,
    left: 32,
});

export const XAvatarUploadWrapper = glamorous(XAvatarUpload)({
    marginBottom: 26,
});

export const XFormSubmitWrapper = glamorous(XFormSubmit)({
    marginTop: 50,
});

export const Title = glamorous.div({
    fontFamily: 'SFProText-Semibold',
    fontSize: 32,
    color: '#000',
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 24,
});

export const SubTitle = glamorous.div({
    fontFamily: 'SFProText-Regular',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.5,
    color: '#000',
    marginTop: 0,
    letterSpacing: -0.1,
    marginBottom: 32,
});

export const XInputWrapper = glamorous(XInput)({
    minWidth: 330,
});

export const ContentWrapper = glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    marginTop: 55,
});

export const Footer = glamorous.div({
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 16,
    margin: 'auto',
});

export const FooterText = glamorous.div({
    fontSize: 14,
    lineHeight: 1.71,
    letterSpacing: -0.4,
    fontWeight: 500,
    textAlign: 'center',
    color: '#334562',
    opacity: 0.4,
    '&:first-child': {
        marginBottom: 6,
    },
});
