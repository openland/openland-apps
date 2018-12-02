import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XCheckbox } from 'openland-x/XCheckbox';
import {
    XMenuItem,
    XMenuTitle,
    XMenuItemWrapper,
    XMenuItemSeparator,
    XMenuVertical,
} from 'openland-x/XMenuItem';

export default withApp('UI Framework - Menu Items', 'viewer', props => {
    return (
        <DevDocsScaffold title="Menu items">
            <XContent>
                <XVertical>
                    <div style={{ width: 270 }}>
                        <XMenuVertical>
                            <XMenuTitle>Notifications</XMenuTitle>
                            <XMenuItem>default</XMenuItem>
                            <XMenuItem style="danger">danger</XMenuItem>
                            <XMenuItemSeparator />
                            <XMenuItem icon="chat">With icon</XMenuItem>
                            <XMenuItem iconRight="chevron_right">
                                With right icon
                            </XMenuItem>
                            <XMenuItem iconRight="x-right">
                                With custom right icon
                            </XMenuItem>
                            <XMenuItemSeparator />
                            <XMenuItem icon="chat" iconRight="chevron_right">
                                Very long title in XMenuItem
                            </XMenuItem>
                            <XMenuItem
                                style="danger"
                                icon="chat"
                                iconRight="chevron_right"
                            >
                                Very long title in XMenuItem
                            </XMenuItem>
                            <XMenuItemSeparator />
                            <XMenuItemWrapper>
                                <XVertical>
                                    <XCheckbox
                                        label="Checkbox"
                                        checked={true}
                                    />
                                </XVertical>
                            </XMenuItemWrapper>

                            <XMenuItemWrapper>
                                <XVertical>
                                    <XCheckbox
                                        label="Switcher"
                                        switcher={true}
                                        checked={true}
                                    />
                                </XVertical>
                            </XMenuItemWrapper>
                        </XMenuVertical>
                    </div>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});
