import * as React from 'react';
import { withApp } from '../../components/withApp';
import { FeedManagePost } from 'openland-mobile/feed/manage/FeedManagePost';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SlideInputLocal } from 'openland-engines/feed/types';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { getMessenger } from 'openland-mobile/utils/messenger';
import Toast from 'openland-mobile/components/Toast';
import { SHeader } from 'react-native-s/SHeader';

const FeedCreateComponent = React.memo((props: PageProps) => {
    const engine = getMessenger().engine.feed;
    const handleSent = React.useCallback(async (slides: SlideInputLocal[]) => {
        startLoader();

        if (await engine.createPost('QwnbK6nA4dsWp5p7YkRdCqeDd1', slides)) {
            props.router.back();
        } else {
            Toast.failure({ duration: 1000, text: 'Post can\'t be empty' }).show();
        }

        stopLoader();
    }, []);

    return (
        <>
            <SHeader title="New post" />
            <FeedManagePost
                onSent={handleSent}
                action="Post"
            />
        </>
    );
});

export const FeedCreate = withApp(FeedCreateComponent, { navigationAppearance: 'small' });
