import * as React from 'react';
import { XView } from 'react-mental';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XButton } from 'openland-x/XButton';
import { showModalBox } from 'openland-x/showModalBox';
import { DeleteMessageButton } from './DeleteMessageButton';

export function ShowDeleteMessageModal(msgId: string) {
    showModalBox({}, ctx => (
        <XView borderRadius={8} overflow="hidden">
            <XView paddingHorizontal={24}>
                <XView
                    fontSize={18}
                    fontWeight="600"
                    color="rgba(0, 0, 0, 0.9)"
                    height={64}
                    alignItems="center"
                    flexDirection="row"
                    flexShrink={0}
                >
                    Delete message
                </XView>
                <XView paddingTop={6} paddingBottom={24}>
                    Delete selected messages for everyone? This cannot be undone.
                </XView>
            </XView>
            <XView height={1} flexShrink={0} backgroundColor="rgb(236, 236, 236)" />
            <XView
                paddingHorizontal={24}
                backgroundColor="rgb(249, 249, 249)"
                height={64}
                flexShrink={0}
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
            >
                <XHorizontal separator={6}>
                    <DeleteMessageButton msgId={msgId} onSuccess={ctx.hide} />
                    <XButton text="Cancel" style="ghost" onClick={ctx.hide} />
                </XHorizontal>
            </XView>
        </XView>
    ));
}
