import * as React from 'react';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { MessageTextComponent } from 'openland-web/components/messenger/message/content/MessageTextComponent';
import { XVertical2 } from 'openland-x/XVertical2';

export default () => (
    <DevDocsScaffold title="MessageTextComponent">
        <XContent>
            <XVertical2>
                <MessageTextComponent
                    {...{
                        alphaMentions: [],
                        mentions: [],
                        message: '🌈 insane 🌈',
                        isService: false,
                        isEdited: false,
                    }}
                />
            </XVertical2>
        </XContent>
    </DevDocsScaffold>
);
