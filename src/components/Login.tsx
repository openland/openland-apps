import * as React from 'react';
import { withUserInfo } from './UserInfo';

export const AuthenticationControlls = (props: { className: string }) => {
    return (
        <>
            <ProfileInfo className={props.className}/>
            <SignOutButton className={props.className}/>
            <SignInButton className={props.className}/>
            <SignUpButton className={props.className}/>
        </>
    );
};

export const ProfileInfo = withUserInfo<{ className: string }>((props) => {
    if (props.user) {
        return (
            <li className={props.className}>
                <span><img src={props.user.picture} alt=""/>{props.user.firstName} {' '} {props.user.lastName}</span>
            </li>
        );
    } else {
        return null;
    }
});

export const SignOutButton = withUserInfo<{ className: string }>((props) => {
    if (props.user) {
        return (
            <li className={props.className + ' is-join'}>
                <button onClick={e => {
                    props.doLogout();
                }}>Sign Out
                </button>
            </li>
        );
    } else {
        return null;
    }
});

export const SignInButton = withUserInfo<{ className: string }>((props) => {
    if (!props.user) {
        return (
            <li className={props.className}>
                <button onClick={e => {
                    props.doLogin();
                }}>Sign In
                </button>
            </li>
        );
    } else {
        return null;
    }
});

export const SignUpButton = withUserInfo<{ className: string }>((props) => {
    if (!props.user) {
        return (
            <li className={props.className + ' is-join'}>
                <a target="_blank" href="https://goo.gl/forms/YX8LSpH6jWLzbEj02">Join</a>
            </li>
        );
    } else {
        return null;
    }
});