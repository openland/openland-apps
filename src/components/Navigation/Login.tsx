import * as React from 'react';
import { withUserInfo } from '../Base/UserInfo';
import Glamorous from 'glamorous';
import { XButton } from '../X/XButton';

export const AuthenticationControlls = () => {
    return (
        <>
        <ProfileInfo />
        <SignInButton />
        </>
    );
};

const Container = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 0,
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 500
});

const Avatar = Glamorous.img({
    overflow: 'hidden',
    borderRadius: '36px',
    marginLeft: 16,
    marginRight: 16,
    width: '36px',
    height: '36px'
});

export const ProfileInfo = withUserInfo<{}>((props) => {
    if (props.user) {
        return <Container><Avatar src={props.user.picture} alt="" /><SignOutButton /></Container>;
    } else {
        return null;
    }
});

const SignInButtonElement = Glamorous.button({
    display: 'flex',
    alignSelf: 'center',

    textDecoration: 'none',
    color: '#ffffff !important',
    padding: '6px 14px',
    background: '#192743',
    border: '1px solid #ffffff',
    borderRadius: '4px',
    fontSize: '13px',
    lineHeight: '20px',
    fontWeight: 500,
    '&:hover': {
        background: '#303d56'
    }
})

export const SignInButton = withUserInfo<{}>((props) => {
    if (!props.user) {
        return <SignInButtonElement onClick={e => props.doLogin()}>Sign In</SignInButtonElement>;
        // return <XButton style="dark" bounce={true} path="/auth/login" alignSelf="center">Sign In</XButton>
    } else {
        return null;
    }
});

export const SignOutButton = withUserInfo<{}>((props) => {
    if (props.user) {
        return <SignInButtonElement onClick={e => props.doLogout()}>Sign Out</SignInButtonElement>;
    } else {
        return null;
    }
});