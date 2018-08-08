import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XContent } from 'openland-x-layout/XContent';
import { XCheckbox } from 'openland-x/XCheckbox';
import { XMenuItem, XMenuItemWrapper } from '../../../components/Incubator/XOverflow';

export default withApp('UI Framework - Menu Items', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Menu items">
            <XContent>
                <XVertical>
                    <div style={{ width: 250, borderRadius: 6, boxShadow: '0 0 0 1px rgba(136, 152, 170, .1), 0 15px 35px 0 rgba(49, 49, 93, .1), 0 5px 15px 0 rgba(0, 0, 0, .08)', paddingTop: 8, paddingBottom: 8 }}>
                        <XMenuItem>Default</XMenuItem>
                        <XMenuItem style="danger">Danger</XMenuItem>
                        <XMenuItem icon="chat">With icon</XMenuItem>
                        <XMenuItem iconRight="chevron_right">With right icon</XMenuItem>
                        <XMenuItem icon="chat" iconRight="chevron_right">With two icons</XMenuItem>
                        <XMenuItem style="danger" icon="chat" iconRight="chevron_right">Very long title in XMenuItem</XMenuItem>

                        <XMenuItemWrapper>
                            <XVertical>
                                <XCheckbox label="Checkbox" checked={true} />
                            </XVertical>
                        </XMenuItemWrapper>

                        <XMenuItemWrapper>
                            <XVertical>
                                <XCheckbox label="Switcher" switcher={true} checked={true} />
                            </XVertical>
                        </XMenuItemWrapper>
                    </div>    
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});