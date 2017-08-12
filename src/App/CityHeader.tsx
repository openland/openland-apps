import * as React from 'react';
import { Menu, Dropdown, Button, Image } from 'semantic-ui-react';
import * as Auth from '../auth';
import { User } from './queries';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';

const AskButton = withRouter(function (props: RouteComponentProps<any>) {
    return (
        <Button
            positive={true}
            onClick={() => {
                props.history.push('/ask');
            }}
        >
            Ask
        </Button>
    );
});

export default function (props: { title: string, me?: User }) {
    return (
        <Menu attached={true} size="large" borderless={true}>
            <Menu.Item header={true}>Statecraft</Menu.Item>
            <Menu.Item>{props.title} Performance Portal</Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item><Route component={AskButton} /></Menu.Item>
                {!Auth.isAuthenticated() && (
                    <Menu.Item>
                        <Button.Group>
                            <Button onClick={() => Auth.login()}>Log In</Button>
                            <Button.Or />
                            <Button primary={true} onClick={() => Auth.login()}>Sign Up</Button>
                        </Button.Group>
                    </Menu.Item>
                )}
                {props.me != null && (
                    <Menu.Item><Image src={props.me.picture} avatar={true} />
                        <span style={{ paddingLeft: 8 }}>Hi, {props.me.firstName}!</span></Menu.Item>
                )}
                {props.me != null && (
                    <Menu.Item><Button onClick={() => Auth.logout()}>Log Out</Button></Menu.Item>
                )}
                <Dropdown item={true} simple={true} icon="ellipsis vertical">
                    <Dropdown.Menu>
                        <Dropdown.Item>Contacts</Dropdown.Item>
                        <Dropdown.Item>About</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
        </Menu>
    );
}