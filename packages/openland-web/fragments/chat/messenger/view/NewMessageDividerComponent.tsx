import * as React from 'react';
import { DataSourceDateItem } from 'openland-engines/messenger/ConversationEngine';
import { XView } from 'react-mental';
import { ScrollTo } from './DataSourceRender';
import { IsActivePoliteContext } from 'openland-web/pages/main/mail/components/CacheComponent';
import { delay } from 'openland-y-utils/timer';

export const NewMessageDividerComponent = (props: { dividerKey: string } & ScrollTo) => {
    const ref = React.useRef<any | null>(null);
    let isChatActive = React.useContext(IsActivePoliteContext);

    React.useEffect(
        () => {
            return isChatActive.listen(async active => {
                await delay(0);
                if (ref.current && props.scrollTo && active) {
                    ref.current.scrollIntoView();
                    props.scrollTo.key = undefined;
                }
            });
        },
        [ref.current, props.scrollTo],
    );
    return (
        <div key={props.dividerKey} ref={ref}>
            <XView
                justifyContent="center"
                alignItems="center"
                zIndex={1}
                marginTop={24}
                marginBottom={0}
            >
                <XView
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor="#ffffff"
                    borderRadius={50}
                    paddingLeft={10}
                    paddingRight={10}
                    paddingTop={2}
                    paddingBottom={2}
                >
                    <XView fontSize={13} color="rgba(0, 0, 0, 0.4)">
                        New messages
                    </XView>
                </XView>
            </XView>
        </div>
    );
};