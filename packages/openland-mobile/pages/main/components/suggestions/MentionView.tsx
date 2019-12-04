import * as React from 'react';
import { View, Image } from 'react-native';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { MentionToSend } from 'openland-engines/messenger/MessageSender';
import { SuggestionsItemName } from '../Suggestions';

interface MentionViewProps {
    mention: MentionToSend;
    onPress: () => void;
}

export const MentionView = React.memo((props: MentionViewProps) => {
    const theme = React.useContext(ThemeContext);
    const { mention, onPress } = props;

    return (
        <ZListItemBase
            onPress={onPress}
            separator={false}
            height={40}
            underlayColor={theme.backgroundTertiaryTrans}
        >
            <View style={{ flexGrow: 1, flexDirection: 'row' }} alignItems="center">
                <View paddingHorizontal={16} height={40} alignItems="center" justifyContent="center">
                    {(mention.__typename === 'User' || mention.__typename === 'Organization') && (
                        <ZAvatar
                            src={mention.photo}
                            size="x-small"
                            placeholderKey={mention.id}
                            placeholderTitle={mention.name}
                        />
                    )}
                    {mention.__typename === 'SharedRoom' && (
                        <ZAvatar
                            src={mention.roomPhoto}
                            size="x-small"
                            placeholderKey={mention.id}
                            placeholderTitle={mention.title}
                        />
                    )}
                    {mention.__typename === 'AllMention' && (
                        <View alignItems="center" justifyContent="center" width={24} height={24}>
                            <Image source={require('assets/ic-channel-24.png')} style={{ tintColor: theme.foregroundSecondary, width: 24, height: 24 }} />
                        </View>
                    )}
                </View>
                <View flexGrow={1}>
                    {mention.__typename === 'User' && (
                        <SuggestionsItemName
                            theme={theme}
                            name={mention.name}
                            description={mention.isBot ? 'Bot' : mention.primaryOrganization ? mention.primaryOrganization.name : undefined}
                        />
                    )}
                    {mention.__typename === 'Organization' && (
                        <SuggestionsItemName
                            theme={theme}
                            name={mention.name}
                            description={mention.isCommunity ? 'Community' : 'Organization'}
                        />
                    )}
                    {mention.__typename === 'SharedRoom' && (
                        <SuggestionsItemName
                            theme={theme}
                            name={mention.title}
                            description="Group"
                        />
                    )}
                    {mention.__typename === 'AllMention' && (
                        <SuggestionsItemName
                            theme={theme}
                            name="@All"
                            description="Notify everyone in this chat"
                        />
                    )}
                </View>
            </View>
        </ZListItemBase>
    );
});