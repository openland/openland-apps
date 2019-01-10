import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { HotKeys } from 'react-hotkeys';

export default withApp('UI Framework - Shortcuts', 'viewer', () => {
    return (
        <DevDocsScaffold title="Shortcuts">
            <XContent>
                <XVertical>
                    <HotKeys
                        keyMap={{
                            moveUp: 'up',
                        }}
                    >
                        <HotKeys
                            handlers={{
                                moveUp: (event: any) => console.log('Move up hotkey called!'),
                            }}
                        >
                            <input />
                        </HotKeys>
                    </HotKeys>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});
