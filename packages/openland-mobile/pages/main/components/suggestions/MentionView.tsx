import * as React from 'react';
import { View, Image } from 'react-native';
import { ChatMentionSearch_mentions_items } from 'openland-api/spacex.types';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SuggestionsItemName } from '../Suggestions';

export type MentionViewT = ChatMentionSearch_mentions_items | { __typename: 'AllMention' };

interface MentionViewProps {
    mention: MentionViewT;
    onPress: () => void;
    isChannel: boolean;
}

export const MentionView = React.memo((props: MentionViewProps) => {
    const theme = React.useContext(ThemeContext);
    const { mention, onPress, isChannel } = props;
    const chatType = isChannel ? 'channel' : 'group';

    return (
        <ZListItemBase
            onPress={onPress}
            separator={false}
            height={40}
            underlayColor={theme.backgroundTertiaryTrans}
        >
            <View style={{ flexGrow: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ paddingHorizontal: 15, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                    {mention.__typename === 'MentionSearchUser' && (
                        <ZAvatar
                            photo={mention.user.photo}
                            size="x-small"
                            id={mention.user.id}
                            title={mention.user.name}
                        />
                    )}
                    {mention.__typename === 'MentionSearchOrganization' && (
                        <ZAvatar
                            photo={mention.organization.photo}
                            size="x-small"
                            id={mention.organization.id}
                            title={mention.organization.name}
                        />
                    )}
                    {mention.__typename === 'MentionSearchSharedRoom' && (
                        <ZAvatar
                            photo={mention.room.photo}
                            size="x-small"
                            id={mention.room.id}
                            title={mention.room.title}
                        />
                    )}
                    {mention.__typename === 'AllMention' && (
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: 24, height: 24 }}>
                            <Image source={require('assets/ic-channel-24.png')} style={{ tintColor: theme.foregroundSecondary, width: 24, height: 24 }} />
                        </View>
                    )}
                </View>
                <View style={{ flexGrow: 1 }}>
                    {mention.__typename === 'MentionSearchUser' && (
                        <SuggestionsItemName
                            theme={theme}
                            name={mention.user.name}
                            description={mention.user.isBot ? 'Bot' : mention.user.primaryOrganization ? mention.user.primaryOrganization.name : undefined}
                        />
                    )}
                    {mention.__typename === 'MentionSearchOrganization' && (
                        <SuggestionsItemName
                            theme={theme}
                            name={mention.organization.name}
                            description={mention.organization.isCommunity ? 'Community' : 'Organization'}
                            featured={mention.organization.featured}
                        />
                    )}
                    {mention.__typename === 'MentionSearchSharedRoom' && (
                        <SuggestionsItemName
                            theme={theme}
                            name={mention.room.title}
                            description={mention.room.isChannel ? 'Channel' : 'Group'}
                            featured={mention.room.featured}
                        />
                    )}
                    {mention.__typename === 'AllMention' && (
                        <SuggestionsItemName
                            theme={theme}
                            name="@All"
                            description={`Notify everyone in this ${chatType}`}
                        />
                    )}
                </View>
            </View>
        </ZListItemBase>
    );
});