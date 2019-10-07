import * as React from 'react';
import { withApp } from '../../components/withApp';
import { FeedManagePost } from 'openland-mobile/feed/manage/FeedManagePost';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SlideInputLocal } from 'openland-engines/feed/types';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { getMessenger } from 'openland-mobile/utils/messenger';
import Toast from 'openland-mobile/components/Toast';
import { SHeader } from 'react-native-s/SHeader';
import { convertToSlideInput } from 'openland-engines/feed/convert';

const FeedCreateComponent = React.memo((props: PageProps) => {
    const { router } = props;
    const { channel } = router.params;
    const engine = getMessenger().engine.feed;

    const handleSent = React.useCallback(async (input: SlideInputLocal[]) => {
        const slides = convertToSlideInput(input);

        if (slides.length <= 0) {
            Toast.failure({ duration: 1000, text: 'Post can\'t be empty' }).show();

            return;
        }

        router.push('FeedPublishTo', {
            channel,
            action: async (selectedId: string) => {
                startLoader();

                await engine.createPost(selectedId, slides);

                router.pushAndResetRoot('Home');

                stopLoader();
            }
        });
    }, []);

    return (
        <>
            <SHeader title="New post" />
            <FeedManagePost
                onSent={handleSent}
                action="Next"
            />
        </>
    );
});

export const FeedCreate = withApp(FeedCreateComponent, { navigationAppearance: 'small' });
