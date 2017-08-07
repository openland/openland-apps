import * as React from 'react';
import { Menu, Dropdown, Button } from 'semantic-ui-react';
import * as Auth from '../auth';
import { User } from '../queries';

export default function (props: { title: string, me?: User }) {
    return (
        <Menu attached="top" size="large" borderless={true}>
            <Menu.Item header={true}>Statecraft</Menu.Item>
            <Menu.Item>{props.title} Performance Portal</Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item><Button positive={true}>Ask</Button></Menu.Item>
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
                    <Menu.Item><Button onClick={() => Auth.logout()}>Log Out, {props.me.name}</Button></Menu.Item>
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