import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { getMessenger } from 'openland-mobile/utils/messenger';
import Alert from 'openland-mobile/components/AlertBlanket';

class FeedHandlersClass {
    handlePress = (id: string) => {
        getMessenger().history.navigationManager.push('FeedItem', { id });
    }

    handleLongPress = (id: string, canEdit: boolean, backAfterDelete?: boolean) => {
        const client = getClient();
        const router = getMessenger().history.navigationManager;
        const builder = new ActionSheetBuilder();

        builder.action('Share', () => {
            this.handleShare(id);
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

                        if (!!backAfterDelete) {
                            router.pop();
                        }
                    }).show();
            }, false, require('assets/ic-delete-24.png'));
        } else {
            builder.action('Report', () => {
                console.warn('boom report post');
            }, false, require('assets/ic-info-24.png'));
        }

        builder.show(true);
    }

    handleManagePress = (id: string, canEdit: boolean) => {
        this.handleLongPress(id, canEdit, true);
    }

    handleLike = (id: string) => {
        console.warn('Feed: Like post ' + id);
    }

    handleShare = (id: string) => {
        console.warn('Feed: Share post ' + id);
    }
}

export const FeedHandlers = new FeedHandlersClass();