import '../../../init';
import * as React from 'react';
import { XHeader } from 'openland-x/XHeader';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../../components/Scaffold';
import { Sidebar } from '../../../../components/Sidebar';

// const ContentView = Glamorous.div({
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     paddingLeft: '16px',
//     paddingRight: '16px'
// });

export function DevDocsScaffold(props: {
    title?: string;
    children?: any;
    bottomOffset?: boolean;
    hideSidebar?: boolean;
}) {
    return (
        <>
            {props.title !== undefined && <XDocumentHead title={props.title} />}

            <Scaffold>
                {props.hideSidebar !== true && (
                    <Scaffold.Menu>
                        <Sidebar title="Isolated features/units/components">
                            <Sidebar.Item path="/isolated/modals">Modals</Sidebar.Item>
                            <Sidebar.Item path="/isolated/forms">Forms</Sidebar.Item>
                        </Sidebar>
                    </Scaffold.Menu>
                )}
                <Scaffold.Content padding={false} bottomOffset={props.bottomOffset}>
                    {props.title !== undefined && <XHeader text={props.title} />}
                    {props.children}
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}
