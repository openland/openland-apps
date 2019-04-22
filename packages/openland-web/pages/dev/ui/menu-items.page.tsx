import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XCheckbox } from 'openland-x/XCheckbox';
import {
    XMenuItem,
    XMenuTitle,
    XMenuItemWrapper,
    XMenuItemSeparator,
    XMenuVertical,
} from 'openland-x/XMenuItem';
import { XVertical2 } from 'openland-x/XVertical2';

export default withApp('UI Framework - Menu Items', 'viewer', props => {
    return (
        <DevDocsScaffold title="Menu items">
            <XContent>
                <XVertical2 width={270}>
                    <XMenuVertical>
                        <XMenuTitle>Notifications</XMenuTitle>
                        <XMenuItem>default</XMenuItem>
                        <XMenuItem style="danger">danger</XMenuItem>
                        <XMenuItemSeparator />
                        <XMenuItem icon="chat">With icon</XMenuItem>
                        <XMenuItem iconRight="chevron_right">With right icon</XMenuItem>
                        <XMenuItem iconRight="x-right">With custom right icon</XMenuItem>
                        <XMenuItemSeparator />
                        <XMenuItem icon="chat" iconRight="chevron_right">
                            Very long title in XMenuItem
                        </XMenuItem>
                        <XMenuItem style="danger" icon="chat" iconRight="chevron_right">
                            Very long title in XMenuItem
                        </XMenuItem>
                        <XMenuItemSeparator />
                        <XMenuItemWrapper>
                            <XVertical2>
                                <XCheckbox label="Checkbox" checked={true} />
                            </XVertical2>
                        </XMenuItemWrapper>

                        <XMenuItemWrapper>
                            <XVertical2>
                                <XCheckbox label="Switcher" switcher={true} checked={true} />
                            </XVertical2>
                        </XMenuItemWrapper>
                    </XMenuVertical>
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
