import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from '../X/XVertical';

let Container = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch',
    flexGrow: 1,
    paddingTop: '56px',
    paddingLeft: '32px',
    paddingRight: '32px',
    paddingBottom: '32px',
})

export class AppContent extends React.Component {
    render() {
        return (
            <Container>
                <XVertical>
                    {this.props.children}
                </XVertical>
            </Container>
        );
    }
}