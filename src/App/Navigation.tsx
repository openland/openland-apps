import * as React from 'react';
import { Menu, Dropdown, Button, Input } from 'semantic-ui-react';
import * as Auth from '../auth';

export default function () {
    return (
        <Menu attached="top" size="large" borderless={true}>
            <Menu.Item header={true}>Statecraft</Menu.Item>
            <Dropdown item={true} simple={true} text="City: San Francisco">
                <Dropdown.Menu>
                    <Dropdown.Item>San Francisco</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>Request new city</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Menu.Item><Input className="icon" icon="search" placeholder="Search..." /></Menu.Item>
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
                {Auth.isAuthenticated() && (
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