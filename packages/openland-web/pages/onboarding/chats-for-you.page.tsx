import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from './components/TopBar';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { css } from 'linaria';
import { BackSkipLogo } from './components/BackSkipLogo';
import { getPercentageOfOnboarding } from './utils';
import { useClient } from 'openland-web/utils/useClient';
import { XRoomCard } from 'openland-x/cards/XRoomCard';

const backgroundClassName = css`
    background: white;
    width: 100%;
`;

export const ChatsForYou = () => {
    const client = useClient();
    const data = client.useSuggestedRooms();

    return (
        <div className={backgroundClassName}>
            <XDocumentHead title="Choose role" />
            <TopBar progressInPercents={getPercentageOfOnboarding(10)} />
            <XView marginBottom={12} marginTop={34}>
                <BackSkipLogo noLogo />
            </XView>

            <XView flexDirection="row" justifyContent="center" paddingBottom={76}>
                <XView flexDirection="column" alignSelf="center">
                    <XView alignItems="center">
                        <XView fontSize={24} marginBottom={12}>
                            Chats for you
                        </XView>
                        <XView fontSize={16} marginBottom={40}>
                            Recommendations based on your answers
                        </XView>
                    </XView>

                    <XView flexDirection="row" justifyContent="space-between" marginBottom={18}>
                        <XView fontWeight={'600'} fontSize={17} color={'rgba(0, 0, 0, 0.5)'}>{`${
                            data.suggestedRooms.length
                        } chats`}</XView>
                        <XButton text={`Select all`} style="light" size="default" />
                    </XView>

                    {data.suggestedRooms.map((room, key) => {
                        if (room.__typename === 'SharedRoom') {
                            return (
                                <XRoomCard
                                    key={key}
                                    room={room as any}
                                    path={'/directory/p/' + room.id}
                                    customMenu={null}
                                />
                            );
                        }
                        return null;
                    })}

                    <XView marginTop={40} flexShrink={1} alignSelf="center">
                        <XButton
                            text={`Join ${data.suggestedRooms.length} chats`}
                            style="primary"
                            size="default"
                        />
                    </XView>
                </XView>
            </XView>
        </div>
    );
};

export default withApp('Home', 'viewer', () => {
    return <ChatsForYou />;
});
