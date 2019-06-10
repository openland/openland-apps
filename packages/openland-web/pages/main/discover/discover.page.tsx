import * as React from 'react';
import { XImage, XView } from 'react-mental';
import { DiscoverNavigation } from './components/DiscoverNavigation';
import { withApp } from 'openland-web/components/withApp';
import { useClient } from 'openland-web/utils/useClient';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XRoomCard } from 'openland-x/cards/XRoomCard';

const EmptyComponent = () => (
    <XView height="calc(100vh - 118px)" alignItems="center" justifyContent="center">
        <XView
            width="100%"
            height={600}
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
        >
            <img
                src="/static/X/discover/empty-discover.pngs"
                srcSet="/static/X/discover/empty-discover.png, /static/X/discover/empty-discover@2x.png 2x, /static/X/discover/empty-discover@3x.png 3x"
            />
            <XView fontSize={24} fontWeight="600" marginBottom={8} marginTop={32}>
                Chats for you
            </XView>
            <XView fontSize={14} lineHeight="24px" color="rgba(0, 0, 0, 0.8)">
                Install a mobile app to get your recommendations
            </XView>
            <XView flexDirection="row" marginTop={32}>
                <XView
                    as="a"
                    href="https://oplnd.com/ios"
                    target="_blank"
                    marginRight={12}
                    opacity={1}
                    hoverOpacity={0.8}
                    hoverTextDecoration="none"
                >
                    <XImage width={124} height={40} src="/static/X/settings/appstore@2x.png" />
                </XView>
                <XView
                    as="a"
                    href="https://oplnd.com/android"
                    target="_blank"
                    marginLeft={12}
                    opacity={1}
                    hoverOpacity={0.8}
                    hoverTextDecoration="none"
                >
                    <XImage width={124} height={40} src="/static/X/settings/googleplay@2x.png" />
                </XView>
            </XView>
        </XView>
    </XView>
);

export default withApp('Discover', 'viewer', () => {
    const client = useClient();
    const data = client.useSuggestedRooms();

    return (
        <DiscoverNavigation>
            {!data.isDiscoverDone && <EmptyComponent />}
            {data.isDiscoverDone && (
                <XContentWrapper withPaddingBottom={true}>
                    <XView fontSize={16} marginTop={32} marginBottom={27}>
                        Chats for you
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
                </XContentWrapper>
            )}
        </DiscoverNavigation>
    );
});
