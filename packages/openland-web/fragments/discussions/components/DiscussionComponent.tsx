import * as React from 'react';
import { XView } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { PostSimple } from 'openland-api/spacex.types';
import { ParagraphComponent } from './ParagraphComponent';

export const DiscussionComponent = React.memo((props: { data: PostSimple }) => {
    // let client = useClient();
    // let account = client.useAccount();
    return (
        <XView flexDirection="column" paddingBottom={48}>
            <XView {...TextStyles.Subhead} opacity={0.7} paddingBottom={4}>
                {props.data.channel!.title.toUpperCase()}
            </XView>
            <XView flexDirection="row">
                <XView {...TextStyles.Title1} paddingBottom={16} fontSize={38} fontWeight="400">
                    {props.data.title}
                </XView>
            </XView>
            {/* <XView flexDirection="row" paddingTop={16} alignItems="center">
                <UAvatar
                    title={account.me!.name}
                    photo={account.me!.photo}
                    id={account.me!.id}
                    size="small"
                />
                <XView flexDirection="column">
                    <XView {...TextStyles.Body} paddingLeft={6}>
                        Steve Kite
                    </XView>
                    <XView {...TextStyles.Subhead} paddingLeft={6}>
                        22 May
                    </XView>
                </XView>
            </XView> */}
            <XView {...TextStyles.Body}>
                {props.data.content.map((v, i) => <ParagraphComponent data={v} key={'span-' + i} />)}
            </XView>
        </XView>
    );
});