import * as React from 'react';
import { FullMessage_GeneralMessage_reactions, UserShort } from 'openland-api/Types';
import { ActionSheetBuilder } from '../ActionSheet';
import { ZModalController } from '../ZModal';
import { View, Image, Text, TextStyle, Platform, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import { reactionsImagesMap } from 'openland-mobile/messenger/components/AsyncMessageReactionsView';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZAvatar } from '../ZAvatar';
import { getMessenger } from 'openland-mobile/utils/messenger';

export const showReactionsList = (reactions: FullMessage_GeneralMessage_reactions[]) => {
    if (reactions.length === 0) {
        return;
    }

    let builder = new ActionSheetBuilder();

    builder.flat();

    let reactionList: { [key: string]: UserShort[]; } = {};

    reactions.map((r) => {
        if (!reactionList[r.reaction]) {
            reactionList[r.reaction] = [r.user];
        } else {
            reactionList[r.reaction] = [...reactionList[r.reaction], r.user];
        }
    });

    builder.view((ctx: ZModalController) => (
        <View flexGrow={1} paddingHorizontal={16} paddingTop={5}>
            {Object.keys(reactionList).map((r, i) => {
                let users = reactionList[r];

                return (
                    <View key={'reaction-' + i} borderTopColor="#e0e3e7" borderTopWidth={i > 0 ? 1 : undefined} paddingTop={15} paddingBottom={14}>
                        <View marginBottom={9} alignItems="center" flexDirection="row">
                            <Image source={reactionsImagesMap[r]} style={{ width: 20, height: 20 }} />

                            <View flexGrow={1} flexShrink={1} paddingLeft={8}>
                                <Text style={{ color: '#000000', fontWeight: TextStyles.weight.medium } as TextStyle}>
                                    {users.length > 1 ? (users.length + ' people') : '1 person'} reacted with :{r.toLowerCase()}:
                                </Text>
                            </View>
                        </View>

                        {users.map((u) => (
                            <View marginHorizontal={-16}>
                                {Platform.OS === 'android' && (
                                    <TouchableNativeFeedback onPress={() => { ctx.hide(); getMessenger().handleAvatarClick(u.id); }}>
                                        <View paddingHorizontal={16} paddingVertical={6} flexDirection="row" alignItems="center">
                                            <ZAvatar size={28} src={u.photo} placeholderTitle={u.name} placeholderKey={u.id} />
                                            <View flexGrow={1} flexShrink={1} paddingLeft={12}>
                                                <Text style={{ color: '#000000', fontWeight: TextStyles.weight.medium } as TextStyle}>{u.name}</Text>
                                            </View>
                                        </View>
                                    </TouchableNativeFeedback>
                                )}
                                {Platform.OS === 'ios' && (
                                    <TouchableWithoutFeedback onPress={() => { ctx.hide(); getMessenger().handleAvatarClick(u.id); }}>
                                        <View paddingHorizontal={16} paddingVertical={6} flexDirection="row" alignItems="center">
                                            <ZAvatar size={28} src={u.photo} placeholderTitle={u.name} placeholderKey={u.id} />
                                            <View flexGrow={1} flexShrink={1} paddingLeft={12}>
                                                <Text style={{ color: '#000000', fontWeight: TextStyles.weight.medium } as TextStyle}>{u.name}</Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )}
                            </View>
                        ))}
                    </View>
                );
            })}
        </View>
    ));

    builder.show();
}