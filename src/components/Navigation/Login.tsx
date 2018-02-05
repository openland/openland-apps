import * as React from 'react';
import { withUserInfo } from '../Base/UserInfo';
import { Dropdown } from 'semantic-ui-react';

export const AuthenticationControlls = () => {
    return (
        <>
            <ProfileInfo/>
            <SignInButton/>
        </>
    );
};

export const ProfileInfo = withUserInfo<{}>((props) => {
    if (props.user) {
        let userInfo = <span className="x-header--drop-h"><img src={props.user.picture} alt=""/>{props.user.firstName} {' '} {props.user.lastName}</span>;

        return (
            <Dropdown trigger={userInfo} className="x-header--drop">
                <Dropdown.Menu>
                    <Dropdown.Item onClick={e => {
                        e.preventDefault();
                        props.doLogout();
                    }}>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    } else {
        return null;
    }
});

export const SignInButton = withUserInfo<{}>((props) => {
    if (!props.user) {
        return (
            <div className="x-header--signin">
                <button onClick={e => {
                    props.doLogin();
                }}>Sign In</button>
            </div>
        );
    } else {
        return null;
    }
});

export const SignUpButton = withUserInfo<{}>((props) => {
    if (!props.user) {
        return (
            <div className="x-header--signin">
                <a target="_blank" href="https://goo.gl/forms/YX8LSpH6jWLzbEj02">Join</a>
            </div>
        );
    } else {
        return null;
    }
});