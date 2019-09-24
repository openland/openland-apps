import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { getMessenger } from 'openland-mobile/utils/messenger';
import Alert from 'openland-mobile/components/AlertBlanket';
import { showReportForm } from 'openland-mobile/components/showReportForm';
import { DataSourceFeedPostItem } from 'openland-engines/feed/types';
import { MessageReactionType } from 'openland-api/Types';
import { NON_PRODUCTION } from 'openland-mobile/pages/Init';
import { trackEvent } from 'openland-mobile/analytics';
import { Share } from 'react-native';

class FeedHandlersClass {
    Open = (id: string) => {
        getMessenger().history.navigationManager.push('FeedItem', { feedItemId: id });
    }

    Like = (item: DataSourceFeedPostItem) => {
        const client = getClient();
        const { id, reactionsReduced } = item;
        const likes = reactionsReduced.filter(r => r.reaction === MessageReactionType.LIKE);
        const myLike = likes.length ? likes[0].my : false;

        if (myLike) {
            client.mutateFeedReactionRemove({ feedItemId: id, reaction: MessageReactionType.LIKE });
        } else {
            client.mutateFeedReactionAdd({ feedItemId: id, reaction: MessageReactionType.LIKE });
        }
    }

    Share = (id: string) => {
        const link = 'https://openland.com/feed/' + id;

        trackEvent('feed_post_share', { postId: id });

        Share.share({ message: link });
    }

    Manage = (id: string, canEdit: boolean, fromLongPress?: boolean) => {
        const client = getClient();
        const router = getMessenger().history.navigationManager;
        const builder = new ActionSheetBuilder();

        builder.action('Share', () => {
            this.Share(id);
        }, false, require('assets/ic-share-24.png'));

        if (canEdit) {
            if (NON_PRODUCTION) {
                builder.action('Edit', () => {
                    router.push('FeedEdit', { id });
                }, false, require('assets/ic-edit-24.png'));

                builder.action('Unpublish', () => {
                    console.warn('boom unpublish post');
                }, false, require('assets/ic-refresh-24.png'));
            }

            builder.action('Delete', async () => {
                Alert.builder()
                    .title('Delete post')
                    .message('Delete this post for everyone? This cannot be undone.')
                    .button('Cancel', 'cancel')
                    .action('Delete', 'destructive', async () => {
                        await client.mutateFeedDeletePost({ feedItemId: id });

                        if (!fromLongPress) {
                            router.pop();
                        }
                    }).show();
            }, false, require('assets/ic-delete-24.png'));
        } else {
            builder.action('Report', () => {
                showReportForm(id);
            }, false, require('assets/ic-report-24.png'));
        }

        builder.show(fromLongPress);
    }
}

export const FeedHandlers = new FeedHandlersClass();