import * as React from 'react';
import { View, Image } from 'react-native';
import { ChatMentionSearch_mentions_items } from 'openland-api/spacex.types';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SuggestionsItemName } from '../Suggestions';
import { useText } from 'openland-mobile/text/useText';
import { capitalize } from 'openland-y-utils/capitalize';
import { LocalizedResources } from 'openland-mobile/text/schema';

export type MentionViewT = ChatMentionSearch_mentions_items | { __typename: 'AllMention' };

interface MentionViewProps {
    mention: MentionViewT;
    onPress: () => void;
    isChannel: boolean;
}

export const MentionView = React.memo((props: MentionViewProps) => {
    const theme = React.useContext(ThemeContext);
    const { t } = useText();
    const { mention, onPress, isChannel } = props;

    return (
        <ZListItemBase
            onPress={onPress}
            separator={false}
            height={40}
            underlayColor={theme.backgroundTertiaryTrans}
        >
            <View style={{ flexGrow: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View
                    style={{
                        paddingHorizontal: 15,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {mention.__typename === 'MentionSearchUser' && (
                        <ZAvatar photo={mention.user.photo} size="x-small" id={mention.user.id} />
                    )}
                    {mention.__typename === 'MentionSearchOrganization' && (
                        <ZAvatar
                            photo={mention.organization.photo}
                            size="x-small"
                            id={mention.organization.id}
                        />
                    )}
                    {mention.__typename === 'MentionSearchSharedRoom' && (
                        <ZAvatar photo={mention.room.photo} size="x-small" id={mention.room.id} />
                    )}
                    {mention.__typename === 'AllMention' && (
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 24,
                                height: 24,
                            }}
                        >
                            <Image
                                source={require('assets/ic-channel-24.png')}
                                style={{
                                    tintColor: theme.foregroundSecondary,
                                    width: 24,
                                    height: 24,
                                }}
                            />
                        </View>
                    )}
                </View>
                <View style={{ flexGrow: 1 }}>
                    {mention.__typename === 'MentionSearchUser' && (
                        <SuggestionsItemName
                            theme={theme}
                            name={mention.user.name}
                            description={mention.user.isBot ? 'Bot' : undefined}
                        />
                    )}
                    {mention.__typename === 'MentionSearchOrganization' && (
                        <SuggestionsItemName
                            theme={theme}
                            name={mention.organization.name}
                            featured={mention.organization.featured}
                            description={
                                mention.organization.isCommunity
                                    ? capitalize(t('community', 'community'))
                                    : capitalize(t('organization', 'organization'))
                            }
                        />
                    )}
                    {mention.__typename === 'MentionSearchSharedRoom' && (
                        <SuggestionsItemName
                            theme={theme}
                            name={mention.room.title}
                            featured={mention.room.featured}
                            description={
                                mention.room.isChannel
                                    ? capitalize(t('channel', 'channel'))
                                    : capitalize(t('group_0' as LocalizedResources, 'group'))
                            }
                        />
                    )}
                    {mention.__typename === 'AllMention' && (
                        <SuggestionsItemName
                            theme={theme}
                            name="@All"
                            description={isChannel ? t('notifyAllInThisChannel') : t('notifyAllInThisGroup')}
                        />
                    )}
                </View>
            </View>
        </ZListItemBase>
    );
});
