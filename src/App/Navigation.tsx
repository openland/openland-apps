import * as React from 'react';
import { Menu, Dropdown, Button } from 'semantic-ui-react';
import * as Auth from '../auth';

export default function () {
    return (
        <Menu attached="top" size="large" borderless={true}>
            {/* <Container> */}
                <Menu.Item header={true}>Statecraft</Menu.Item>
                <Dropdown item={true} simple={true} text="City: San Francisco">
                    <Dropdown.Menu>
                        <Dropdown.Item>San Francisco</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Request new city</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {!Auth.isAuthenticated() && (
                    <Menu.Menu position="right">
                        <Menu.Item><Button onClick={() => Auth.login()}>Log In</Button></Menu.Item>
                        <Menu.Item><Button primary={true} onClick={() => Auth.login()}>Sign Up</Button></Menu.Item>
                    </Menu.Menu>
                )}
                {Auth.isAuthenticated() && (
                    <Menu.Menu position="right">
                        <Menu.Item><Button onClick={() => Auth.logout()}>Log Out</Button></Menu.Item>
                    </Menu.Menu>
                )}
            {/* </Container> */}
        </Menu>
    );
}