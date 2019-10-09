import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { getMessenger } from 'openland-mobile/utils/messenger';
import Alert from 'openland-mobile/components/AlertBlanket';
import { showReportForm } from 'openland-mobile/components/showReportForm';
import { DataSourceFeedPostItem } from 'openland-engines/feed/types';
import { MessageReactionType, FeedChannelFull, FeedChannelAdminRole } from 'openland-api/Types';
import { Share } from 'react-native';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';

class FeedHandlersClass {
    private getPostLink = (id: string) => 'https://openland.com/feed/' + id;

    Create = (channel?: FeedChannelFull) => {
        getMessenger().history.navigationManager.push('FeedCreate', { channel });
    }

    Open = (id: string) => {
        getMessenger().history.navigationManager.push('FeedItem', { feedItemId: id });
    }

    Like = async (item: DataSourceFeedPostItem) => {
        startLoader();

        const client = getClient();
        const { id, reactionsReduced } = item;
        const likes = reactionsReduced.filter(r => r.reaction === MessageReactionType.LIKE);
        const myLike = likes.length ? likes[0].my : false;

        if (myLike) {
            await client.mutateFeedReactionRemove({ feedItemId: id, reaction: MessageReactionType.LIKE });
        } else {
            await client.mutateFeedReactionAdd({ feedItemId: id, reaction: MessageReactionType.LIKE });
        }

        stopLoader();
    }

    Forward = (id: string) => {
        const router = getMessenger().history.navigationManager;
        const engine = getMessenger().engine;

        router.push('HomeDialogs', {
            title: 'Forward to',
            pressCallback: (dialogId: string, title: string) => {
                Alert.builder()
                    .title(`Forward to ${title}?`)
                    .button('Cancel', 'cancel')
                    .button('Forward', 'default', async () => {
                        engine.getConversation(dialogId).sendMessage(this.getPostLink(id), []);
                        router.pushAndRemove('Conversation', { id: dialogId });
                    })
                    .show();
            }
        });
    }

    Share = (id: string) => {
        Share.share({ message: this.getPostLink(id) });
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
                router.push('FeedEdit', { id });
            }, false, require('assets/ic-edit-24.png'));

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

    // ----- CHANNEL

    ChannelManage = async (channel: FeedChannelFull) => {
        const { id, myRole, subscribed } = channel;
        const router = getMessenger().history.navigationManager;
        const builder = new ActionSheetBuilder();

        if (myRole === FeedChannelAdminRole.Creator) {
            builder.action('Edit info', () => {
                router.push('FeedChannelEdit', { id });
            }, false, require('assets/ic-edit-24.png'));
        }

        if (subscribed) {
            builder.action('Unfollow', () => {
                this.ChannelUnsubscribe(id);
            }, false, require('assets/ic-follow-off-24.png'));
        } else {
            builder.action('Follow', () => {
                this.ChannelSubscribe(id);
            }, false, require('assets/ic-follow-24.png'));
        }

        builder.show();
    }

    ChannelSubscribe = async (channelId: string) => {
        const client = getClient();

        startLoader();

        await client.mutateFeedChannelSubscribe({ id: channelId });
        await client.refetchFeedChannel({ id: channelId });

        stopLoader();
    }

    ChannelUnsubscribe = async (channelId: string) => {
        const client = getClient();

        startLoader();

        await client.mutateFeedChannelUnsubscribe({ id: channelId });
        await client.refetchFeedChannel({ id: channelId });

        stopLoader();
    }

    ChannelAddEditor = async (channelId: string, userId: string) => {
        const client = getClient();

        startLoader();

        await client.mutateFeedChannelAddEditor({ id: channelId, userId });
        await client.refetchFeedChannelAdmins({ id: channelId, first: 3 });

        stopLoader();
    }

    ChannelRemoveEditor = async (channelId: string, userId: string) => {
        const client = getClient();

        startLoader();

        await client.mutateFeedChannelRemoveEditor({ id: channelId, userId });
        await client.refetchFeedChannelAdmins({ id: channelId, first: 3 });

        stopLoader();
    }
}

export const FeedHandlers = new FeedHandlersClass();