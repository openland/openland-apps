import * as React from 'react';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { MessageTextComponent } from '../../../../components/messenger/components/view/content/MessageTextComponent';

export default () => (
    <DevDocsScaffold title="MessageTextComponent">
        <XContent>
            <XVertical>
                <MessageTextComponent
                    {...{
                        alphaMentions: [],
                        mentions: [],
                        message: '🌈 insane 🌈',
                        isService: false,
                        isEdited: false,
                    }}
                />
            </XVertical>
        </XContent>
    </DevDocsScaffold>
);
