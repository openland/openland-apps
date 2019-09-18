import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { getMessenger } from 'openland-mobile/utils/messenger';
import Alert from 'openland-mobile/components/AlertBlanket';
import { showReportForm } from 'openland-mobile/components/showReportForm';

class FeedHandlersClass {
    Open = (id: string) => {
        getMessenger().history.navigationManager.push('FeedItem', { feedItemId: id });
    }

    Like = (id: string) => {
        console.warn('Feed: Like post ' + id);
    }

    Share = (id: string) => {
        console.warn('Feed: Share post ' + id);
    }

    Manage = (id: string, canEdit: boolean, fromLongPress?: boolean) => {
        const client = getClient();
        const router = getMessenger().history.navigationManager;
        const builder = new ActionSheetBuilder();

        builder.action('Share', () => {
            this.Share(id);
        }, false, require('assets/ic-share-24.png'));

        if (canEdit) {
            builder.action('Edit', () => {
                console.warn('boom edit post');
            }, false, require('assets/ic-edit-24.png'));

            builder.action('Unpublish', () => {
                console.warn('boom unpublish post');
            }, false, require('assets/ic-refresh-24.png'));

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
            }, false, require('assets/ic-info-24.png'));
        }

        builder.show(fromLongPress);
    }
}

export const FeedHandlers = new FeedHandlersClass();