import * as React from 'react';
import { withApp } from '../../components/withApp';
import { FeedManagePost } from 'openland-mobile/feed/manage/FeedManagePost';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SlideInputLocal } from 'openland-engines/feed/types';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { getMessenger } from 'openland-mobile/utils/messenger';
import Toast from 'openland-mobile/components/Toast';
import { SHeader } from 'react-native-s/SHeader';
import { convertSlidesToLocalInput } from 'openland-engines/feed/convert';

const FeedEditComponent = React.memo((props: PageProps) => {
    const client = getClient();
    const engine = getMessenger().engine.feed;
    const id = props.router.params.id;

    const item = client.useFeedItem({ id }, { fetchPolicy: 'network-only' }).item;

    if (!item) {
        return null;
    }

    const initial = convertSlidesToLocalInput(item.slides);
    const handleSent = React.useCallback(async (slides: SlideInputLocal[]) => {
        startLoader();

        if (await engine.editPost(id, slides)) {
            props.router.back();
        } else {
            Toast.failure({ duration: 1000, text: 'Post can\'t be empty' }).show();
        }

        stopLoader();
    }, []);

    return (
        <>
            <SHeader title="Edit post" />
            <FeedManagePost
                initial={initial}
                onSent={handleSent}
                action="Save"
            />
        </>
    );
});

export const FeedEdit = withApp(FeedEditComponent, { navigationAppearance: 'small' });
